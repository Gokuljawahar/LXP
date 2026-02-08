
import React from 'react'

// import { FETCH_TOPICFEEDBACK_REQUEST,FETCH_TOPICFEEDBACK_SUCCESS,FETCH_TOPICFEEDBACK_FAILURE } from '../actions/GetByIDTopicFeedbackAction';
import { FETCH_COURSEFEEDBACK_REQUEST,FETCH_COURSEFEEDBACK_SUCCESS,FETCH_COURSEFEEDBACK_FAILURE } from '../../actions/Course/Course/GetByIDCourseFeedbackAction';

const initialState = {
  quizfeedback: [],
  loading: false,
  error: null,
  isSubmitted: false,
};

const GetByIDCourseFeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSEFEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COURSEFEEDBACK_SUCCESS:
      console.log("Coursefeedback FETCHED:", action.payload);

      // Add the new course to the existing courses array
      return {
        ...state,
        loading: false,
        quizfeedback: action.payload,
        isSubmitted: true,
        error: null,
      };

    case FETCH_COURSEFEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};




export default GetByIDCourseFeedbackReducer