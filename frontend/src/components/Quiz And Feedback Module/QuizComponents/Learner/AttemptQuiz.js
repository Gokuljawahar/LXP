import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionsRequest } from "../../../../actions/Quiz And Feedback Module/Learner/AttemptQuizAction";
import { fetchReviewRequest } from "../../../../actions/Quiz And Feedback Module/Learner/ReviewAction";
import { selectAnswerRequest } from "../../../../actions/Quiz And Feedback Module/Learner/SelectAnswerAction";
import { useNavigate } from "react-router-dom";
import "../../../../Styles/Quiz And Feedback Module/Learner/AttemptQuiz.css";
import TopBar from "../../../Quiz And Feedback Module/QuizComponents/Learner/TopBar";
import Timer from "./Timer";
import ConfirmationModal from "./ConfirmationModal";
import Swal from "sweetalert2";
import DynamicTimer from "./Timer";
 
 
const AttemptQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizId = sessionStorage.getItem("quizId");
  const questions = useSelector((state) => state.AttemptQuiz.questions);
  const learnerattemptid = useSelector(
    (state) => state.learnerattempt.attemptId
  );
 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const storedCurrentQuestionIndex = sessionStorage.getItem(
      "currentQuestionIndex"
    );
    return storedCurrentQuestionIndex
      ? parseInt(storedCurrentQuestionIndex)
      : 0;
  });
 
  const [selectedOptions, setSelectedOptions] = useState(() => {
    const storedSelectedOptions = sessionStorage.getItem("selectedOptions");
    return storedSelectedOptions ? JSON.parse(storedSelectedOptions) : {};
  });
 
  const [showModal, setShowModal] = useState(false);
  const [navigateAway, setNavigateAway] = useState(false);
 
  const [flaggedQuestions, setFlaggedQuestions] = useState(() => {
    const storedFlaggedQuestions = sessionStorage.getItem("flaggedQuestions");
    return storedFlaggedQuestions ? JSON.parse(storedFlaggedQuestions) : {};
  });
 
  useEffect(() => {
    sessionStorage.setItem(
      "flaggedQuestions",
      JSON.stringify(flaggedQuestions)
    );
  }, [flaggedQuestions]);
 
  const handleFlagQuestion = () => {
    setFlaggedQuestions((prevFlagged) => {
      const questionId = questions[currentQuestionIndex].quizQuestionId;
      const newFlagged = { ...prevFlagged };
      newFlagged[questionId] = !newFlagged[questionId];
      return newFlagged;
    });
  };
 
  useEffect(() => {
    // Ensure questions are fetched
    if (!questions || questions.length === 0) {
      dispatch(fetchQuestionsRequest(quizId));
    }
  }, [quizId, dispatch, questions]);
 
  useEffect(() => {
    // Store learnerattemptid in sessionStorage
    if (learnerattemptid) {
      sessionStorage.setItem("learnerattemptid", learnerattemptid);
    }
  }, [learnerattemptid]);
 
  useEffect(() => {
    sessionStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
  }, [selectedOptions]);
 
  useEffect(() => {
    sessionStorage.setItem("currentQuestionIndex", currentQuestionIndex);
  }, [currentQuestionIndex]);
 
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!navigateAway) {
        event.preventDefault();
        event.returnValue = ""; // For Chrome
      }
    };
 
    const handleBrowserNavigation = (event) => {
      if (!navigateAway) {
        event.preventDefault();
        event.stopImmediatePropagation();
        // setShowModal(true);
        window.history.pushState(null, "", window.location.href);
      }
    };
 
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handleBrowserNavigation);
    window.history.pushState(null, "", window.location.href); // Ensure the initial state is set
 
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handleBrowserNavigation);
    };
  }, [navigateAway]);
 
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
      showAlert();
    };
 
    const handleCopy = (event) => {
      if (event.ctrlKey && (event.key === 'c' || event.key === 'C')) {
        event.preventDefault();
        showAlert();
      }
    };
 
   
    const showAlert = () => {
      // const Toast = Swal.mixin({
      //   className: "swal2-toast",
      //   toast: true,
      //   position: "top",
      //   showConfirmButton: false,
      //   timer: 2000,
      //   background: "#fa4d56",
      //   timerProgressBar: true,
      //   didOpen: (toast) => {
      //     toast.onmouseenter = Swal.stopTimer;
      //     toast.onmouseleave = Swal.resumeTimer;
      //   },
      // });
      // Toast.fire({
      //   icon: "warning",
      //   title: "Here you couldn't copy the text",
      //   color: "white",
      // });
 
      Swal.fire({
        customClass:"msq-alert-msg ",
        title: "Here you couldn't copy the text",
        icon: "warning",
        confirmButtonText: "Ok",
        cancelButtonText: "Cancel",
        showCancelButton: true,
        showCloseButton: true
      });
    };
 
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleCopy);
 
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleCopy);
    };
  }, []);
 
  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };
 
  const handleOptionChange = (questionId, optionValue, isMSQ) => {
    const learnerAttemptId =
      learnerattemptid || sessionStorage.getItem("learnerattemptid");
 
    if (!learnerAttemptId) {
      console.error("learnerAttemptId is not defined");
      return;
    }
 
    setSelectedOptions((prevSelectedOptions) => {
      const updatedOptions = { ...prevSelectedOptions };
      if (isMSQ) {
        const selectedForQuestion = updatedOptions[questionId] || [];
        if (selectedForQuestion.includes(optionValue)) {
          updatedOptions[questionId] = selectedForQuestion.filter(
            (opt) => opt !== optionValue
          );
        } else if (selectedForQuestion.length < 3) {
          updatedOptions[questionId] = [...selectedForQuestion, optionValue];
        } else {
          // alert("You can select a maximum of 3 options.");
 
          // Swal.fire({
          //   title: "You can select a maximum of 3 options",
          //   customClass:"msq-alert-msg ",
          //   showClass: {
          //     popup: `
          //       animate__animated
          //       animate__fadeInUp
          //       animate__faster
          //     `
          //   },
          //   hideClass: {
          //     popup: `
          //       animate__animated
          //       animate__fadeOutDown
          //       animate__faster
          //     `
          //   }
          // });
 
          Swal.fire({
            customClass:"msq-alert-msg ",
            title: "You can select maximum of 3 options",
            icon: "warning",
            confirmButtonText: "Ok",
            cancelButtonText: "Cancel",
            showCancelButton: true,
            showCloseButton: true
          });
        }
      } else {
        updatedOptions[questionId] = [optionValue];
      }
 
      // Dispatch action to save the answer
      dispatch(
        selectAnswerRequest({
          learnerAttemptId,
          quizQuestionId: questionId,
          selectedOptions: updatedOptions[questionId],
        })
      );
 
      return updatedOptions;
    });
  };
 
  const handleSubmit = () => {
    const attemptId =
      learnerattemptid || sessionStorage.getItem("learnerattemptid");
    if (attemptId) {
      dispatch(fetchReviewRequest(attemptId));
      setNavigateAway(true);
      navigate("/reviewanswer");
    } else {
      console.error("Attempt ID is missing.");
    }
  };
 
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
 
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
 
  const handleModalClose = () => setShowModal(false);
 
  const handleModalConfirm = () => {
    setNavigateAway(true);
    setShowModal(false);
    window.history.back();
  };
 
  // Calculate progress
  const answeredQuestions = Object.keys(selectedOptions).length;
 
  const progressPercentage = (answeredQuestions / questions.length) * 100;
 
  const [checktprogresshundredpercentage, setchecktprogresshundredpercentage] =
    useState(progressPercentage);
 
  console.log("progressPercentage", progressPercentage);
 
  return (
    <div>
      <TopBar />
      <div className="attempt-quiz-page">
        <div className="attempt-quiz-sidebar">
          <h1 className="attempt-quiz-quiz-title">Attempt Quiz</h1>
          <div className="attempt-quiz-navbar">
            {questions.map((question, index) => (
              <button
                key={index}
                className={`
                  attempt-quiz-navbar-button
                  ${selectedOptions[question.quizQuestionId] ? "answered" : ""}
                  ${flaggedQuestions[question.quizQuestionId] ? "flagged" : ""}
                `}
                onClick={() => handleQuestionClick(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="attempt-quiz-progress-bar-container">
            <div
              className="attempt-quiz-progress-bar"
              style={{ width: `${progressPercentage}%` }}
            >
              {Math.round(progressPercentage)}% COMPLETED
            </div>
          </div>
          {/* {progressPercentage === 100 ? (
            <button
              className="attempt-quiz-finish-attempt"
              onClick={handleSubmit}
            >
              Review all questions
            </button>
          ) : (
            <button
              disabled
              style={{ cursor: "not-allowed" }}
              className="attempt-quiz-finish-attempt"
              onClick={handleSubmit}
            >
              Review all questions
            </button>
          )} */}
 
            <button
              className="attempt-quiz-finish-attempt"
              onClick={handleSubmit}
            >
              Review all questions
            </button>
           
          <div className="attempt-quiz-last-saved">
            Last saved: {new Date().toLocaleString()}
          </div>
        </div>
        <div className="attempt-quiz-main-content">
          <br />
          <br />
          <DynamicTimer />
          <div className="attempt-quiz-top-bar">
            <h2 className="attempt-quiz-quiz-question-number">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <button
              className={`attempt-quiz-flag-button ${
                flaggedQuestions[
                  questions[currentQuestionIndex]?.quizQuestionId
                ]
                  ? "flagged"
                  : ""
              }`}
              onClick={handleFlagQuestion}
            >
              <i className="attempt-quiz-flag-icon"></i>
              {flaggedQuestions[questions[currentQuestionIndex]?.quizQuestionId]
                ? "Remove flag"
                : "Flag question"}
            </button>
          </div>
          {questions && questions.length > 0 ? (
            <div className="attempt-quiz-question-container">
              <h3 className="attempt-quiz-quiz-question">
                {questions[currentQuestionIndex].question}
              </h3>
              <ul className="attempt-quiz-question-options">
                {questions[currentQuestionIndex].options.map(
                  (option, optionIndex) => (
                    <li key={optionIndex}>
                      <label
                        className={`attempt-quiz-option-label ${
                          selectedOptions[
                            questions[currentQuestionIndex].quizQuestionId
                          ]?.includes(option.option)
                            ? "attempt-quiz-option-label-answered"
                            : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <input
                          type={
                            questions[currentQuestionIndex].questionType ===
                            "MSQ"
                              ? "checkbox"
                              : "radio"
                          }
                          name={questions[currentQuestionIndex].quizQuestionId}
                          value={option.option}
                          checked={
                            selectedOptions[
                              questions[currentQuestionIndex].quizQuestionId
                            ]?.includes(option.option) || false
                          }
                          onChange={() =>
                            handleOptionChange(
                              questions[currentQuestionIndex].quizQuestionId,
                              option.option,
                              questions[currentQuestionIndex].questionType ===
                                "MSQ"
                            )
                          }
                          className="attempt-quiz-option-type"
                        />
                        <span className="attempt-quiz-option-text">
                          {option.option}
                        </span>
                      </label>
                    </li>
                  )
                )}
              </ul>
              <div className="attempt-quiz-navigation-buttons">
                <button
                  className="attempt-quiz-previous-button"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                  <button
                    className="attempt-quiz-next-button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className="attempt-quiz-review-button"
                    onClick={handleSubmit}
                  >
                    Review
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default AttemptQuiz;  