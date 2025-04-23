import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EquipeModal from "./EquipeModal.tsx";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import UpdateEquipe from "./UpdateEquipe.tsx";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
// Interfaces
interface EntAdjoints {
  entadj1: string;
  entadj2: string;
}

interface Medecins {
  medc1: string;
  medc2: string;
}

interface Administration {
  president: string;
  vicepresident: string;
}

interface Recruteurs {
  recr1: string;
  recr2: string;
}

interface Staf {
  entprincipal: string;
  entadjoints: EntAdjoints;
  manager: string;
  entgardien: string;
  prepphysique: string;
  analystedonnes: string;
  kine: string;
  kineadjoint: string;
  medecins: Medecins;
  administration: Administration;
  recruteurs: Recruteurs;
}

interface FormData {
  id: string;
  name: string;
  code: string;
  country: string;
  city: string;
  founded: string;
  logo: string;
  group: string;
  createdAt: string;
  staf: Staf;
}

const HeaderMatch = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1%;
`;

const Equipe: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [, setSelectedIndex] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [teams, setTeams] = useState<FormData[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
// *******************************

  useEffect(() => {
    fetch("http://localhost:5000/api/teams")
      .then((res) => res.json())
      .then((data) => setTeams(data.teams));
  }, []);

  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    code: "",
    country: "",
    city: "",
    founded: "",
    logo: "",
    group: "",
    createdAt: "",
    staf: {
      entprincipal: "",
      entadjoints: { entadj1: "", entadj2: "" },
      manager: "",
      entgardien: "",
      prepphysique: "",
      analystedonnes: "",
      kine: "",
      kineadjoint: "",
      medecins: { medc1: "", medc2: "" },
      administration: { president: "", vicepresident: "" },
      recruteurs: { recr1: "", recr2: "" },
    },
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [updateFormErrors, setUpdateFormErrors] = useState<{
    [key: string]: string;
  }>({});
  const [updateGeneralError, setUpdateGeneralError] = useState<
    string | undefined
  >(undefined);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    setFormData((prev) => {
      const updated = { ...prev };

      const updateNested = (
        obj: any,
        keyPath: string[],
        newValue: string
      ): void => {
        if (keyPath.length === 1) {
          obj[keyPath[0]] = newValue;
        } else {
          updateNested(obj[keyPath[0]], keyPath.slice(1), newValue);
        }
      };

      updateNested(updated, keys, value);
      return updated;
    });

    setFormErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  };

  const validateForm = (formData: FormData) => {
    const errors: { [key: string]: string } = {};
    const requiredFields = [
      "id",
      "name",
      "code",
      "country",
      "city",
      "founded",
      "logo",
      "group",
      "createdAt",
      "staf.entprincipal",
      "staf.entadjoints.entadj1",
      "staf.entadjoints.entadj2",
      "staf.manager",
      "staf.entgardien",
      "staf.prepphysique",
      "staf.analystedonnes",
      "staf.kine",
      "staf.kineadjoint",
      "staf.medecins.medc1",
      "staf.medecins.medc2",
      "staf.administration.president",
      "staf.administration.vicepresident",
      "staf.recruteurs.recr1",
      "staf.recruteurs.recr2",
    ];

    const getNestedValue = (obj: any, keyPath: string[]) =>
      keyPath.reduce((acc, key) => acc?.[key], obj);

    requiredFields.forEach((field) => {
      const value = getNestedValue(formData, field.split("."));
      if (typeof value !== "string" || value.trim() === "") {
        errors[field] = "Ce champ est requis.";
      }
    });

    return errors;
  };

  const handleSubmit = () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    fetch("http://localhost:5000/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setTeams((prev) => [...prev, data.team]);
        setShowToast(true);
        handleClose();
      })
      .catch((error) => console.error("Error creating team:", error));
  };

  const handleUpdateSubmit = () => {
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setUpdateFormErrors(errors);
      setUpdateGeneralError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!selectedTeamId) return;

    fetch(`http://localhost:5000/api/teams/${selectedTeamId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        setTeams((prev) =>
          prev.map((t) => (t.id === selectedTeamId ? data.team : t))
        );
        setShowUpdateModal(false);
        setShowToast(true);
      })
      .catch((error) => console.error("Error updating team:", error));
  };

  const handleDeleteConfirm = () => {
    if (!selectedTeamId) return;

    fetch(`http://localhost:5000/api/teams/${selectedTeamId}`, {
      method: "DELETE",
    })
      .then(() => {
        setTeams((prev) => prev.filter((t) => t.id !== selectedTeamId));
        setShowDeleteModal(false);
        setShowToast(true);
      })
      .catch((error) => console.error("Error deleting team:", error));
  };

  return (
    <>
      <HeaderMatch>
        <h2>Equipe</h2>
        <Button variant="outline-success" onClick={handleShow}>
          Ajouter
        </Button>
      </HeaderMatch>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Succès</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Opération réussie !</Toast.Body>
        </Toast>
      </ToastContainer>

      <EquipeModal
        show={show}
        handleClose={handleClose}
        formErrors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <div style={{ width: "100%", overflowX: "hidden" }}>
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Country</th>
                <th>City</th>
                <th>Founded</th>
                <th>Logo</th>
                <th>Group</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>{team.name}</td>
                  <td>{team.code}</td>
                  <td>{team.country}</td>
                  <td>{team.city}</td>
                  <td>{team.founded}</td>
                  <td>
                    <img src={team.logo} alt={team.name} width="40" />
                  </td>
                  <td>{team.group}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setSelectedTeamId(team.id);
                        setFormData(team);
                        setShowUpdateModal(true);
                      }}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => {
                        setSelectedTeamId(team.id);
                        setShowDeleteModal(true);
                      }}
                    >
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this team?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <UpdateEquipe
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        handleChange={handleChange}
        handleSubmit={handleUpdateSubmit}
        formErrors={updateFormErrors}
        formData={formData}
        generalError={updateGeneralError}
      />
    </>
  );
};

export default Equipe;
