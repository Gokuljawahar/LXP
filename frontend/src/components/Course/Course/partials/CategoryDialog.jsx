import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

const CategoryDialog = ({
  open,
  onClose,
  onSubmit,
  category,
  onCategoryChange,
  categoryErrors,
}) => (
  <Modal show={open} onHide={onClose} centered>
    <Form onSubmit={onSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Enter new category</Form.Label>
          <Form.Control
            name="category"
            type="text"
            autoFocus
            value={category.category}
            onChange={onCategoryChange}
            isInvalid={!!categoryErrors.category}
          />
          <Form.Control.Feedback type="invalid">
            {categoryErrors.category}
          </Form.Control.Feedback>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
);

export default CategoryDialog;
