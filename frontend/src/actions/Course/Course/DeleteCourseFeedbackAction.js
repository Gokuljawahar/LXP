

export const DELETE_COURSEFEEDBACK_REQUEST = "DELETE_QUIZFEEDBACK_REQUEST";
export const DELETE_COURSEFEEDBACK_SUCCESS = "DELETE_QUIZFEEDBACK_SUCCESS";
export const DELETE_COURSEFEEDBACK_FAILURE = "DELETE_QUIZFEEDBACK_FAILURE";

export const deletecoursefeedbackRequest = (courseFeedbackId) => ({
  type: DELETE_COURSEFEEDBACK_REQUEST,
  payload: courseFeedbackId,
});

export const deletecoursefeedbackSuccess = (quizfeedback) => ({
  type: DELETE_COURSEFEEDBACK_SUCCESS,
  payload: quizfeedback,
});

export const deletecoursefeedbackFailure = (error) => ({
  type: DELETE_COURSEFEEDBACK_FAILURE,
  payload: error,
});
