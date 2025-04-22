import React from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

interface UpdateEquipeProps {
  show: boolean;
  handleClose: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  formErrors: { [key: string]: string };
  formData: { [key: string]: string };
  generalError?: string; // <-- New optional prop
}

const fields = [
  { name: "name", label: "Name" },
  { name: "code", label: "Code" },
  { name: "country", label: "Country" },
  { name: "city", label: "City" },
  { name: "founded", label: "Founded" },
  { name: "logo", label: "Logo" },
  { name: "group", label: "Group" },
  { name: "createdAt", label: "Created At" },
];

const UpdateEquipe: React.FC<UpdateEquipeProps> = ({
  show,
  handleClose,
  handleChange,
  handleSubmit,
  formErrors,
  formData,
  generalError, // receive it here
}) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Equipe</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* 🔴 Display general error at the top */}
          {generalError && (
            <Alert variant="danger" className="mb-3">
              {generalError}
            </Alert>
          )}

          {fields.map((field) => (
            <Form.Group
              className="mb-3"
              controlId={`form${field.name}`}
              key={field.name}
            >
              <Form.Label>{field.label}</Form.Label>
              <Form.Control
                type="text"
                name={field.name}
                placeholder={`Enter ${field.label}`}
                value={formData[field.name] || ""}
                onChange={handleChange}
                isInvalid={!!formErrors[field.name]}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors[field.name]}
              </Form.Control.Feedback>
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateEquipe;
