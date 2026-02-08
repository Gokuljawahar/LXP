
import React from 'react'
import {
  UPDATE_COURSEFEEDBACK_REQUEST,
  UPDATE_COURSEFEEDBACK_SUCCESS,
  UPDATE_COURSEFEEDBACK_FAILURE,
} from "../../../actions/Course/Course/UpdateCourseFeedbackAction";

  const initialState = {
    quizfeedback: [],
    loading: false,
    error: null,
    isSubmitted: false,
  };

  const UpdateCourseFeedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_COURSEFEEDBACK_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_COURSEFEEDBACK_SUCCESS:
        console.log("Course feedback reducer", action.payload);
        // Add the new course to the existing courses array
        return {
          ...state,
          loading: false,
          quizfeedback: action.payload,
          isSubmitted: true,
          error: null,
        };

      case UPDATE_COURSEFEEDBACK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };

      default:
        return state;
    }
  };





export default UpdateCourseFeedbackReducer