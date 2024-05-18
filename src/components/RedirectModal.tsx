import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface RedirectModalProps {
  show: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
}

const RedirectModal: React.FC<RedirectModalProps> = ({ show, handleCancel, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Switching to a different questionnaire will erase your responses. 
        Are you sure you want to proceed?</Modal.Body>
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