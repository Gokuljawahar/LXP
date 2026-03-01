import React from "react";
import { Form } from "react-bootstrap";

const AddCourseForm = ({ onSubmit, children }) => (
  <Form onSubmit={onSubmit}>{children}</Form>
);

export default AddCourseForm;
