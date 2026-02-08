export const UPDATE_COURSEFEEDBACK_REQUEST = "UPDATE_COURSEFEEDBACK_REQUEST";
export const UPDATE_COURSEFEEDBACK_SUCCESS = "UPDATE_COURSEFEEDBACK_SUCCESS";
export const UPDATE_COURSEFEEDBACK_FAILURE = "UPDATE_COURSEFEEDBACK_FAILURE";

export const updatecoursefeedbackRequest = (courseFeedbackId, formData) => ({
  type: UPDATE_COURSEFEEDBACK_REQUEST,
  payload: {
    courseFeedbackId,
    formData,
  },
});

export const updatecoursefeedbackSuccess = (quizfeedback) => ({
  type: UPDATE_COURSEFEEDBACK_SUCCESS,
  payload: quizfeedback,
});

export const updatecoursefeedbackFailure = (error) => ({
  type: UPDATE_COURSEFEEDBACK_FAILURE,
  payload: error,
});