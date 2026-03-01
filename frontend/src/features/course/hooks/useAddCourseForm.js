import { useState } from "react";
import { validateForm } from "../../../utils/Course/Course/AddCourseValidation";

const initialCourseState = {
  title: "",
  level: "",
  category: "",
  description: "",
  createdby: "Asha",
  duration: "",
  thumbnailimage: null,
};

export const useAddCourseForm = ({ onValidSubmit, onAddCategoryRequested }) => {
  const [course, setCourse] = useState(initialCourseState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));

    if (name === "category" && value === "Add category") {
      onAddCategoryRequested?.();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isFormValid = validateForm(course, setErrors);
    if (isFormValid) {
      await onValidSubmit?.(course);
    }
  };

  return {
    course,
    setCourse,
    errors,
    setErrors,
    handleInputChange,
    handleSubmit,
  };
};
