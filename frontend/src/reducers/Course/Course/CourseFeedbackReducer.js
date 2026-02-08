import React from 'react'

// import {
//     CREATE_TOPICFEEDBACK_REQUEST,
//     CREATE_TOPICFEEDBACK_SUCCESS,
//     CREATE_TOPICFEEDBACK_FAILURE,
//   } from '../actions/TopicFeedbackAction';

import { CREATE_COURSEFEEDBACK_REQUEST,CREATE_COURSEFEEDBACK_SUCCESS,CREATE_COURSEFEEDBACK_FAILURE } from '../../actions/Course/Course/CourseFeedbackAction';

  
  const initialState = {
    
    TopicFeedback: [],
    loading: false,
    error: null,
    isSubmitted:false,
  };
  
  const CourseFeedbackReducer = (state = initialState, action) => {
    switch (action.type) {
       case CREATE_COURSEFEEDBACK_REQUEST:
        
        return {
          ...state,
          loading: true,
        };
      case CREATE_COURSEFEEDBACK_SUCCESS:
        console.log('course reducer', action.payload);
        // Add the new course to the existing courses array
        return {
          ...state,
          loading: false,
          quizfeedback: action.payload,
          isSubmitted:true,
          error: null,
        };
       
      case CREATE_COURSEFEEDBACK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      
      default:
        return state;
    }
  };

export default CourseFeedbackReducer