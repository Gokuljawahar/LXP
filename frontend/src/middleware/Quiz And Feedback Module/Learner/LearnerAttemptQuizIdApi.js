import {
  CREATE_ATTEMPT_REQUEST,
  CreateAttemptSuccess,
  CreateAttemptFailure,
  CREATE_ATTEMPT_STATUS,
} from "../../../actions/Quiz And Feedback Module/Learner/AttemptQuizAction";
import axios from "axios";

//   const API_URL = "http://localhost:5199/api/QuizEngine/";

export const LearnerAttemptQuizIdApi =
  ({ dispatch, getState }) =>
    (next) =>
      async (action) => {
        if (action.type === CREATE_ATTEMPT_REQUEST) {
          console.log("isRequesting", getState().learnerattempt);

          const ReducerData = getState().learnerattempt;
          if (!ReducerData.isRequesting) {
            dispatch({ type: CREATE_ATTEMPT_STATUS, payload: true });

            try {
              const quizId = sessionStorage.getItem('quizId');
              const response = await axios.post(`http://localhost:5199/api/QuizEngine/attempt?learnerId=${action.payload.learnerId}&quizId=${quizId}`);
              console.log(response);
              console.log("LearnerAttemptID:", response.data);
              sessionStorage.setItem("learnerAttemptId", response.data);
              if (response.data.statusCode == 412) {
                console.log("Response Exists");
              }
              else {
                dispatch(CreateAttemptSuccess(response.data));
                console.log("Successful response", response.data);
              }
              // sessionStorage.setItem("attemptId",response.data.data.learnerAttemptId)
              // console.log("attempt ID :",response.data.data.learnerAttemptId)
            } catch (error) {
              console.error("API Error:", error.message);
              dispatch(CreateAttemptFailure(error.message));
              // throw error; // Throw the error for better error handling
            } finally {
              dispatch({ type: CREATE_ATTEMPT_STATUS, payload: false })
            }
          }
        }
        return next(action);
      };

export default LearnerAttemptQuizIdApi;
