import axios from "axios";
import {
  UPDATE_COURSEFEEDBACK_REQUEST,
  updatecoursefeedbackSuccess,
  updatecoursefeedbackFailure,
} from "../../../actions/Course/Course/UpdateCourseFeedbackAction";

export const UpdateCourseFeedbackApi = ({ dispatch }) => (next) => async (action) => {
    if (action.type == UPDATE_COURSEFEEDBACK_REQUEST) {
      try {
        console.log("put act", action.payload);
        const API_URL = `http://localhost:5199/api/CourseFeedback/${action.payload.courseFeedbackId}`;
        const response = await axios.put(API_URL, action.payload.formData);
        console.log("feed course Put API Response:", response.data); // Log the response data
        dispatch(updatecoursefeedbackSuccess(response.data.data)); // Dispatch success action with the response data
      } catch (error) {
        console.error("API Error:", error.message);
        dispatch(updatecoursefeedbackFailure(error.message));
      }
    }
    return next(action);
  };

export default UpdateCourseFeedbackApi;