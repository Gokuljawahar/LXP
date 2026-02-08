import React from 'react'
import { FETCH_LEARNERFEEDBACKRESULT_REQUEST,FETCH_LEARNERFEEDBACKRESULT_SUCCESS,FETCH_LEARNERFEEDBACKRESULT_FAILURE } from '../../actions/Quiz And Feedback Module/Learner/LearnerFeedbackResultAction';

const initialState = {
  learnersfeedbackresultdetails: null,
  loading: false,
  error: null,
  isSubmitted: false,
};

const LearnerFeedbackResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEARNERFEEDBACKRESULT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LEARNERFEEDBACKRESULT_SUCCESS:
      // Add the new course to the existing courses array
      return {
        ...state,
        loading: false,
        learnersfeedbackresultdetails: action.payload,
        isSubmitted: true,
        error: null,
      };

    case FETCH_LEARNERFEEDBACKRESULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default LearnerFeedbackResultReducer