
export const FETCH_LEARNERFEEDBACKRESULT_REQUEST = "FETCH_LEARNERFEEDBACKRESULT_REQUEST";
export const FETCH_LEARNERFEEDBACKRESULT_SUCCESS = "FETCH_LEARNERFEEDBACKRESULT_SUCCESS";
export const FETCH_LEARNERFEEDBACKRESULT_FAILURE = "FETCH_LEARNERFEEDBACKRESULT_FAILURE";

export const fetchlearnerfeedbackresultRequest = (learnerfeedbackresult) => ({
  type: FETCH_LEARNERFEEDBACKRESULT_REQUEST,
  payload: learnerfeedbackresult,
});

export const fetchlearnerfeedbackresultSuccess = (learnerfeedbackresult) => ({
  type: FETCH_LEARNERFEEDBACKRESULT_SUCCESS,
  payload: learnerfeedbackresult,
});

export const fetchlearnerfeedbackresultFailure = (error) => ({
  type: FETCH_LEARNERFEEDBACKRESULT_FAILURE,
  payload: error,
});