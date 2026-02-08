import React from 'react'

import axios from "axios";

import { FETCH_LEARNERSRESULT_REQUEST,fetchlearnersresultSuccess,fetchlearnersresultFailure } from '../../../actions/Quiz And Feedback Module/Learner/GetResultByLearnerIDAction';
    
const baseUrl = "http://localhost:5199";

//http://localhost:5199/api/QuizEngine/learners/200a92f3-7ace-433b-8c35-fdd17ffaa37a/quiz-results

const GetResultByLearnerIDApi =
  ({ dispatch }) =>
  (next) =>
    async (action) => {
     
    if (action.type === FETCH_LEARNERSRESULT_REQUEST) {
      const learnerid = action.payload;
      try {
        const API_URL = `${baseUrl}/api/QuizEngine/learners/${learnerid}/quiz-results`;
        console.log("learnersresult", API_URL);
        const response = await axios.get(API_URL);
        console.log("learner result", response.data);
        dispatch(fetchlearnersresultSuccess(response.data));
      } catch (error) {
        console.error(
          "API ERROR",
          error.response ? error.response.data.data : error.message
        );
        dispatch(fetchlearnersresultFailure(error.message));
      }
    }
    return next(action);
  };


export default GetResultByLearnerIDApi