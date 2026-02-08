export const FETCH_ALL_COURSEFEEDBACK_REQUEST =
  "FETCH_ALL_COURSEFEEDBACK_REQUEST";
export const FETCH_ALL_COURSEFEEDBACK_SUCCESS =
  "FETCH_ALL_COURSEFEEDBACK_SUCCESS";
export const FETCH_ALL_COURSEFEEDBACK_FAILURE =
  "FETCH_ALL_COURSEFEEDBACK_FAILURE";

export const fetchallcoursefeedbackRequest = (formData) => ({
  type: FETCH_ALL_COURSEFEEDBACK_REQUEST,
  payload: formData,
});

export const fetchallcoursefeedbackSuccess = (coursefeedback) => ({
  type: FETCH_ALL_COURSEFEEDBACK_SUCCESS,
  payload: coursefeedback,
});

export const fetchalltopicfeedbackFailure = (error) => ({
  type: FETCH_ALL_COURSEFEEDBACK_FAILURE,
  payload: error,
});