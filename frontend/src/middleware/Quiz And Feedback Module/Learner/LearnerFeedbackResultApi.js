import React from 'react'
import axios from "axios";

import { FETCH_LEARNERFEEDBACKRESULT_REQUEST,fetchlearnerfeedbackresultSuccess,fetchlearnerfeedbackresultFailure } from '../../../actions/Quiz And Feedback Module/Learner/LearnerFeedbackResultAction';

const baseUrl = "http://localhost:5199";


const LearnerFeedbackResultApi =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type === FETCH_LEARNERFEEDBACKRESULT_REQUEST) {
      const learnerfeedbackid = action.payload;
      try {
        const API_URL = `${baseUrl}/api/FeedbackResponse/learnerfeedbackinfo?learnerId=${learnerfeedbackid}`;
        console.log("learnersfeedbackresult", API_URL);
        const response = await axios.get(API_URL);
        console.log("learner feedback result", response.data);
        dispatch(fetchlearnerfeedbackresultSuccess(response.data));
      } catch (error) {
        console.error(
          "API ERROR",
          error.response ? error.response.data.data : error.message
        );
        dispatch(fetchlearnerfeedbackresultFailure(error.message));
      }
    }
    return next(action);
  };


export default LearnerFeedbackResultApi