import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewRequest } from "../../../../actions/Quiz And Feedback Module/Learner/ReviewAction";
import { fetchQuestionsRequest } from "../../../../actions/Quiz And Feedback Module/Learner/AttemptQuizAction";
import { submitAttemptRequest } from "../../../../actions/Quiz And Feedback Module/Learner/SubmitAttemptAction";
import "../../../../Styles/Quiz And Feedback Module/Learner/ReviewAnswers.css";
import { useNavigate } from "react-router-dom";
import TopBar from "../../../Quiz And Feedback Module/QuizComponents/Learner/TopBar";
import Swal from "sweetalert2";
import DynamicTimer from "./Timer";

const ReviewAnswers = ({ attemptId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reviewDataFromStore = useSelector((state) => state.Review.reviewData);
  const questionsFromStore = useSelector(
    (state) => state.AttemptQuiz.questions
  );
  const submitLoading = useSelector((state) => state.SubmitAttempt.loading);
  const submitSuccess = useSelector((state) => state.SubmitAttempt.success);
  const AttemptId = reviewDataFromStore?.learnerAttemptId;

  const [showPopup, setShowPopup] = useState(false);
  const [localReviewData, setLocalReviewData] = useState(null);
  const [localQuestions, setLocalQuestions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unansweredError, setUnansweredError] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);

  useEffect(() => {
    const storedReviewData = sessionStorage.getItem("reviewData");
    const storedQuestions = sessionStorage.getItem("questions");
    const quizId = sessionStorage.getItem("quizId");

    if (storedReviewData) {
      setLocalReviewData(JSON.parse(storedReviewData));
    } else if (attemptId) {
      dispatch(fetchReviewRequest(attemptId));
    }

    if (storedQuestions) {
      setLocalQuestions(JSON.parse(storedQuestions));
    } else if (quizId) {
      dispatch(fetchQuestionsRequest(quizId));
    }
  }, [dispatch, attemptId]);

  useEffect(() => {
    if (reviewDataFromStore) {
      sessionStorage.setItem("reviewData", JSON.stringify(reviewDataFromStore));
      setLocalReviewData(reviewDataFromStore);
    }
  }, [reviewDataFromStore]);

  useEffect(() => {
    if (questionsFromStore.length > 0) {
      sessionStorage.setItem("questions", JSON.stringify(questionsFromStore));
      setLocalQuestions(questionsFromStore);
    }
  }, [questionsFromStore]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const [flaggedQuestions, setFlaggedQuestions] = useState(() => {
    const storedFlaggedQuestions = sessionStorage.getItem("flaggedQuestions");
    return storedFlaggedQuestions ? JSON.parse(storedFlaggedQuestions) : {};
  });

  const [selectedOptions, setSelectedOptions] = useState(() => {
    const storedSelectedOptions = sessionStorage.getItem("selectedOptions");
    return storedSelectedOptions ? JSON.parse(storedSelectedOptions) : {};
  });

  const scrollToQuestion = (index) => {
    const element = document.getElementById(`question-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = () => {
    // const unanswered = localQuestions.reduce((acc, question, index) => {
    //   const response = localReviewData.questionResponses.find(
    //     (q) => q.quizQuestionId === question.quizQuestionId
    //   );
    //   if (!response || !response.selectedOptions || response.selectedOptions.length === 0) {
    //     acc.push(index + 1); // Push 1-based index
    //   }
    //   return acc;
    // }, []);

    // if (unanswered.length > 0) {
    //   setUnansweredQuestions(unanswered);
    //   setUnansweredError(true);
    //   return;
    // }

    if (AttemptId && !isSubmitting) {
      setIsSubmitting(true);
      dispatch(submitAttemptRequest(AttemptId))
        .then(() => {
          setIsSubmitting(false);
          const Toast = Swal.mixin({
            customClass: "swal2-toast-quiz-submission",
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 2000,
            background: "green",
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Quiz Submitted Successfully",
            color: "white",
          });
          setTimeout(() => {
            navigate(`/learnerscorepage`);
          }, 2000);
        })
        .catch(() => {
          setIsSubmitting(false);
        });
      setShowPopup(false);
    } else {
      console.error(
        "Attempt ID is missing or submission is already in progress"
      );
    }
  };

  const handleNavigate = () => {
    navigate("/attemptquiz");
  };

  if (
    !localReviewData ||
    !Array.isArray(localReviewData.questionResponses) ||
    localReviewData.questionResponses.length === 0
  ) {
    return <p>Loading review data...</p>;
  }

  const handleAutoSubmit = () => {
    handleSubmit();
  };

  return (
    <div className="review-answers-page">
      <div className="sidebar">
        <h1 className="review-title">Review Answers</h1>
        <div className="navbar">
          {localQuestions.map((question, index) => {
            const isAnswered = localReviewData.questionResponses.some(
              (response) => response.quizQuestionId === question.quizQuestionId
            );
            return (
              // <button
              //   key={index}
              //   className={isAnswered ? "sidebar-question-button answered" : "sidebar-question-button"}
              //   onClick={() => scrollToQuestion(index)}
              // >
              //   {index + 1}
              // </button>
              <button
                key={index}
                // className={isAnswered ? "sidebar-question-button answered" : "sidebar-question-button"}
                className={`
                attempt-quiz-navbar-button
                ${selectedOptions[question.quizQuestionId] ? "answered" : ""}
                ${flaggedQuestions[question.quizQuestionId] ? "flagged" : ""}
              `}
                onClick={() => scrollToQuestion(index)}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
        <div className="sidebar-bottom">
          <button className="finish-attempt" onClick={() => setShowPopup(true)}>
            Submit Quiz
          </button>
          <button className="navigate-back" onClick={handleNavigate}>
            Back to Quiz
          </button>
        </div>
        <div className="last-saved" style={{ marginBottom: "20%" }}>
          Last saved: {new Date().toLocaleString()}
        </div>
      </div>
      <div className="main-content" style={{ marginTop: "10px" }}>
        <TopBar />
        <DynamicTimer />
        <div className="questions-container">
          {localQuestions.map((question, index) => (
            <div
              key={index}
              id={`question-${index}`}
              className="question-container"
            >
              <h3 className="review-question">
                {index + 1}.{question.question}
              </h3>
              <ul className="question-options">
                {question.options.map((option, optionIndex) => {
                  const response = localReviewData.questionResponses.find(
                    (q) => q.quizQuestionId === question.quizQuestionId
                  );
                  const isAnswered =
                    response?.selectedOptions?.includes(option.option) || false;
                  return (
                    <li key={optionIndex}>
                      <label
                        className={`option-label ${
                          isAnswered ? "selected" : ""
                        }`}
                      >
                        {/* <input
                          type={question.questionType === "MSQ" ? "checkbox" : "radio"}
                          name={question.quizQuestionId}
                          value={option.option}
                          checked={isAnswered}
                          readOnly
                          className="option-type"
                        /> */}
                        <input
                          type={
                            question.questionType === "MSQ"
                              ? "checkbox"
                              : "radio"
                          }
                          name={question.quizQuestionId}
                          value={option.option}
                          checked={isAnswered}
                          readOnly
                          className="option-type"
                          style={{
                            margin: "0 -400px 0 0",
                            marginLeft: "-45%",
                            marginRight: "-530px",
                          }}
                        />
                        <span className="option-text">{option.option}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <br />
        {/* <button className="finish-quiz-attempt" onClick={() => setShowPopup(true)}>
          Submit Quiz
        </button> */}
      </div>
      {showPopup && (
        <div className="reviewanswers-popup">
          <div className="popup-content">
            <button
              className="popup-close-button"
              style={{ padding: "2px" }}
              onClick={() => setShowPopup(false)}
            >
              ×
            </button>
            <br />
            <br />
            {/* {unansweredError && (
              <p className="error-message">
                Please answer all questions before submitting. Unanswered questions:
                <br/>
                {unansweredQuestions.join(", ")}
              </p>
            )} */}
            {!unansweredError && (
              <>
                <p className="submit-quiz-text">
                  Are you sure you want to submit?
                </p>
                <button onClick={handleSubmit} disabled={isSubmitting}>
                  Submit
                </button>
                <button onClick={() => setShowPopup(false)}>Cancel</button>
              </>
            )}
          </div>
        </div>
      )}
      {submitLoading && <div className="loading-overlay">Submitting...</div>}
      {submitSuccess && (
        <div className="success-message">Submitted successfully!</div>
      )}
    </div>
  );
};

export default ReviewAnswers;
