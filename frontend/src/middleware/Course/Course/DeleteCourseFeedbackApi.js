import React from "react";

import axios from "axios";
import {
  DELETE_COURSEFEEDBACK_REQUEST,
  deletecoursefeedbackSuccess,
  deletecoursefeedbackFailure,
} from "../../../actions/Course/Course/DeleteCourseFeedbackAction";

export const DeleteCourseFeedbackApi = async (action) => {
      try {
        const API_URL = `http://localhost:5199/api/CourseFeedback/${action}`;
        console.log("delete course feedback", action);
        // Assuming 'action.payload' contains the data you want to senda
        const response = await axios.delete(API_URL);
        console.log("Delete course feedback API Response:", response.data); // Log the response data
      } catch (error) {
        console.error("API Error:", error.message);
      }

  };

export default DeleteCourseFeedbackApi;