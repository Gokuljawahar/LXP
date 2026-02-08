// ConfirmationModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Navigation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to leave this page without submitting your quiz?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Leave
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;