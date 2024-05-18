import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './RedirectModal.css';

// Define the properties for the RedirectModal component
interface RedirectModalProps {
  show: boolean; // Whether or not the modal should be shown
  handleCancel: () => void; // Called when cancel button is clicked
  handleConfirm: () => void; // Called when confirm button is clicked
}

// The RedirectModal displays a confirmation modal when the user is about to switch questionnaires
const RedirectModal: React.FC<RedirectModalProps> = ({ show, handleCancel, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Switching to a different questionnaire will erase your responses. 
        Are you sure you want to proceed?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RedirectModal;