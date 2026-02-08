export const FETCH_LEARNERSRESULT_REQUEST = "FETCH_LEARNERSRESULT_REQUEST";
export const FETCH_LEARNERSRESULT_SUCCESS = "FETCH_LEARNERSRESULT_SUCCESS";
export const FETCH_LEARNERSRESULT_FAILURE = "FETCH_LEARNERSRESULT_FAILURE";

export const fetchlearnersresultRequest = (learnersresult) => ({
  type: FETCH_LEARNERSRESULT_REQUEST,
  payload: learnersresult,
});

export const fetchlearnersresultSuccess = (learnersresult) => ({
  type: FETCH_LEARNERSRESULT_SUCCESS,
  payload: learnersresult,
});

export const fetchlearnersresultFailure = (error) => ({
  type: FETCH_LEARNERSRESULT_FAILURE,
  payload: error,
});
