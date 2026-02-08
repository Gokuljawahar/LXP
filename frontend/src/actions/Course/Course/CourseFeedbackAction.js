export const CREATE_COURSEFEEDBACK_REQUEST = "CREATE_COURSEFEEDBACK_REQUEST";
export const CREATE_COURSEFEEDBACK_SUCCESS = "CREATE_COURSEFEEDBACK_SUCCESS";
export const CREATE_COURSEFEEDBACK_FAILURE = "CREATE_COURSEFEEDBACK_FAILURE";

export const createcourseRequest = (formData) => ({
  type: CREATE_COURSEFEEDBACK_REQUEST,
  payload: formData,
});

export const createcoursefeedbackSuccess = (CourseFeedback) => ({
  type: CREATE_COURSEFEEDBACK_SUCCESS,
  payload: CourseFeedback,
});

export const createcoursefeedbackFailure = (error) => ({
  type: CREATE_COURSEFEEDBACK_FAILURE,
  payload: error,
});