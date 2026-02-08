
import React from 'react'

// import { DELETE_TOPICFEEDBACK_REQUEST,DELETE_TOPICFEEDBACK_SUCCESS,DELETE_TOPICFEEDBACK_FAILURE } from '../../actions/Quiz And Feedback Module/DeleteTopicFeedbackAction';
import { DELETE_COURSEFEEDBACK_REQUEST,DELETE_COURSEFEEDBACK_SUCCESS,DELETE_COURSEFEEDBACK_FAILURE } from '../../../actions/Course/Course/DeleteCourseFeedbackAction';

 const initialState = {
   courseFeedbackId: [],
   loading: false,
   error: null,
   isSubmitted: false,
 };

 const DeleteCourseFeedbackReducer = (state = initialState, action) => {
   switch (action.type) {
     case DELETE_COURSEFEEDBACK_REQUEST:
       return {
         ...state,
         loading: true,
       };
     case DELETE_COURSEFEEDBACK_SUCCESS:
       console.log("quiz feedback reducer", action.payload);
       // Add the new course to the existing courses array
       return {
         ...state,
         loading: false,
         quizfeedback: action.payload,
         isSubmitted: true,
         error: null,
       };

     case DELETE_COURSEFEEDBACK_FAILURE:
       return {
         ...state,
         loading: false,
         error: action.payload,
       };

     default:
       return state;
   }
 };


export default DeleteCourseFeedbackReducer