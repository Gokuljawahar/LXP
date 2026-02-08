import React from "react";
import { FETCH_LEARNERSRESULT_REQUEST,FETCH_LEARNERSRESULT_SUCCESS,FETCH_LEARNERSRESULT_FAILURE } from "../../../actions/Quiz And Feedback Module/Learner/GetResultByLearnerIDAction";

const initialState = {
  learnersresultdetails: null,
  loading: false,
  error: null,
  isSubmitted: false,
};

const GetResultByLearnerIDReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARNERSRESULT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LEARNERSRESULT_SUCCESS:
      // Add the new course to the existing courses array
      return {
        ...state,
        loading: false,
        learnersresultdetails: action.payload,
        isSubmitted: true,
        error: null,
      };

    case FETCH_LEARNERSRESULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default GetResultByLearnerIDReducer;