import { useState } from "react";
import { validateCategory } from "../../../utils/Course/Course/AddCourseValidation";

const initialCategoryState = {
  category: "",
  createdBy: "Asha",
};

export const useCategoryDialog = ({ onValidSubmit }) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(initialCategoryState);
  const [categoryErrors, setCategoryErrors] = useState({});

  const openDialog = () => setOpen(true);

  const closeDialog = () => {
    setOpen(false);
    setCategory(initialCategoryState);
    setCategoryErrors({});
  };

  const handleCategoryInput = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const isCategoryValid = validateCategory(category, setCategoryErrors);
    if (!isCategoryValid) return;

    await onValidSubmit?.(category);
  };

  return {
    open,
    category,
    categoryErrors,
    openDialog,
    closeDialog,
    handleCategoryInput,
    handleCategorySubmit,
  };
};
