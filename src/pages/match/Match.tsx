import React, { useState, ChangeEvent } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import UpdateJoueur from "../joueur/UpdateJouer";

const HeaderJoueur = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1%;
`;

type PlayerForm = {
  team_id: string;
  team_code: string;
  date: string;
  team_name: string;
  team_logo: string;
  name: string;
  age: string;
  number: string;
  position: string;
  logo: string;
  value: string;
  value_passionne: string;
  height: string;
  availabilityStatus: string;
};

type FieldType = {
  name: keyof PlayerForm;
  label: string;
  type: string;
};

const fields: FieldType[] = [
  { name: "team_id", label: "Referee", type: "text" },
  { name: "team_code", label: "Round", type: "text" },
  { name: "date", label: "Date", type: "date" },
  { name: "team_name", label: "Stade_Name", type: "text" },
  { name: "team_logo", label: "Stade_City", type: "text" },
  { name: "name", label: "Teams/H", type: "text" },
  { name: "age", label: "Teams/A", type: "text" },
  { name: "number", label: "Status_Long", type: "text" },
  { name: "position", label: "Status_Short", type: "text" },
  { name: "logo", label: "Goals.H/H.T", type: "number" },
  { name: "value", label: "Goals.H/FT", type: "number" },
  { name: "value_passionne", label: "Goals.A/H.T", type: "number" },
  { name: "height", label: "Goals.A/F.T", type: "number" },
];

// Modal for adding/editing a player
const AjouterJoueur: React.FC<{
  show: boolean;
  handleClose: () => void;
  handleAddPlayer: () => void;
  formData: PlayerForm;
  formErrors: Partial<PlayerForm>;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    name: keyof PlayerForm
  ) => void;
}> = ({
  show,
  handleClose,
  handleAddPlayer,
  formData,
  formErrors,
  handleInputChange,
}) => (
  <Modal show={show} onHide={handleClose} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Add Match</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        {fields.map((field) => (
          <Form.Group
            className="mb-3"
            controlId={`form${field.name}`}
            key={field.name}
          >
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type={field.type}
              placeholder={`Enter ${field.label}`}
              value={formData[field.name]}
              onChange={(e) => handleInputChange(e, field.name)}
              isInvalid={!!formErrors[field.name]}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors[field.name]}
            </Form.Control.Feedback>
          </Form.Group>
        ))}

        <Form.Group className="mb-3" controlId="formAvailabilityStatus">
      
          <Form.Control.Feedback type="invalid">
            {formErrors.availabilityStatus}
          </Form.Control.Feedback>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Annuler
      </Button>
      <Button variant="success" onClick={handleAddPlayer}>
        Add Match
      </Button>
    </Modal.Footer>
  </Modal>
);

const Joueur: React.FC = () => {
  const [, setSelectedIndex] = useState<number | null>(null);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const handleEditPlayer = () => {
    // Simulate fetching the player's data
    const examplePlayer: PlayerForm = {
      team_id: "1",
      team_code: "T123",
      date: "2024-04-19",
      team_name: "Otto FC",
      team_logo: "team_logo.png",
      name: "John",
      age: "23",
      number: "10",
      position: "Forward",
      logo: "logo.png",
      value: "$10M",
      value_passionne: "5",
      height: "6ft",
      availabilityStatus: "available",
    };

    setFormData(examplePlayer);
    setFormErrors({});
    setShowUpdate(true);
  };

  const [showToast, setShowToast] = useState<boolean>(false);

  const [formData, setFormData] = useState<PlayerForm>({
    team_id: "",
    team_code: "",
    date: "",
    team_name: "",
    team_logo: "",
    name: "",
    age: "",
    number: "",
    position: "",
    logo: "",
    value: "",
    value_passionne: "",
    height: "",
    availabilityStatus: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<PlayerForm>>({});

  const handleCloseAdd = () => {
    setShowAdd(false);
    setFormErrors({});
  };
  const handleShowAdd = () => setShowAdd(true);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    name: keyof PlayerForm
  ) => {
    setFormData({ ...formData, [name]: e.target.value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors: Partial<PlayerForm> = {};
    fields.forEach((field) => {
      if (!formData[field.name]) {
        errors[field.name] = `${field.label} is required`;
      }
    });
    if (!formData.availabilityStatus) {
      errors.availabilityStatus = "Availability Status is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddPlayer = () => {
    if (validateForm()) {
      
      alert("Match added successfully!");
      handleCloseAdd();
    }
  };

  const handleDeleteConfirm = () => {
    // TODO: actually delete from your data array using selectedIndex
    setShowDeleteModal(false);
    setSelectedIndex(null);
    setShowToast(true);
  };

  return (
    <div>
      <HeaderJoueur>
        <h2>Match</h2>
        <Button variant="outline-success" onClick={handleShowAdd}>
          Ajouter
        </Button>
      </HeaderJoueur>

      {/* Success Toast */}
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

      {/* Players Table */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <Table bordered hover>
          <thead>
            <tr>
              {[
                "Referee",
                "Round",
                "Date",
                "Stade_Name",
                "Stade_City",
                "Teams/H",
                "Teams/A",
                "Status_Long",
                "Status_Short",
                "Goals.H/H.T",
                "Goals.H/FT",
                "Goals.A/H.T",
                "Goals.A/F.T",
              
                "Action",
              ].map((hdr) => (
                <th key={hdr}>{hdr}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(4)].map((_, idx) => (
              <tr key={idx}>
                <td>Mark</td>
                <td>Otto</td>
                <td>2024-04-19</td>
                <td>Otto FC</td>
                <td>team_logo.png</td>
                <td>John</td>
                <td>23</td>
                <td>10</td>
                <td>Forward</td>
                <td>logo.png</td>
                <td>$10M</td>
                <td>5</td>
                <td>6ft</td>
              
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditPlayer(idx)}
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      setSelectedIndex(idx);
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

  
      <AjouterJoueur
        show={showAdd}
        handleClose={handleCloseAdd}
        handleAddPlayer={handleAddPlayer}
        formData={formData}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
      />
      <UpdateJoueur
        show={showUpdate}
        handleClose={() => setShowUpdate(false)}
        handleAddPlayer={handleAddPlayer} 
        formData={formData}
        formErrors={formErrors}
        handleInputChange={handleInputChange}
        fields={fields}
      />

    
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Match?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Joueur;
