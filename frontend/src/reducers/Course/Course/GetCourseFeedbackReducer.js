import React from 'react'
// import { FETCH_ALL_TOPICFEEDBACK_REQUEST,FETCH_ALL_TOPICFEEDBACK_SUCCESS,FETCH_ALL_TOPICFEEDBACK_FAILURE } from '../actions/GetTopicFeedbackAction';
 import { FETCH_ALL_COURSEFEEDBACK_REQUEST,FETCH_ALL_COURSEFEEDBACK_SUCCESS,FETCH_ALL_COURSEFEEDBACK_FAILURE } from '../../actions/Course/Course/GetCourseFeedbackAction';
const initialState = { 
    coursefeedback: [],
    loading: false,
    error: null,
    isSubmitted:false,
  };
 
  const GetCourseFeedbackReducer = (state = initialState, action) => {
    switch (action.type) {
       case FETCH_ALL_COURSEFEEDBACK_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ALL_COURSEFEEDBACK_SUCCESS:
        console.log('Coursefeedback FETCHED:', action.payload);
       
        // Add the new course to the existing courses array
        return {
          ...state,
          loading: false,
          coursefeedback:action.payload,
          isSubmitted:true,
          error: null,
        };
       
      case FETCH_ALL_COURSEFEEDBACK_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
     
      default:
        return state;
    }
  };
 
export default GetCourseFeedbackReducer