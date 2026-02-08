// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import '../../../../Styles/Quiz And Feedback Module/Learner/FeedbackResponse.css';
// import Button from 'react-bootstrap/Button';
// import { Container } from 'react-bootstrap';
// import { topicfeedbackresponserequest } from '../../../../actions/Quiz And Feedback Module/Learner/TopicFeedbackResponseAction';
// import { fetchtopicfeedbackquestionrequest } from '../../../../actions/Quiz And Feedback Module/Learner/FetchTopicFeedbackQuestionAction';
// import Swal from "sweetalert2";
// import TopBar from "../../../Quiz And Feedback Module/QuizComponents/Learner/TopBar";
// import { TopicFeedbackResponseApi } from '../../../../middleware/Quiz And Feedback Module/Learner/TopicFeedbackResponseApi';




// const TopicFeedbackquestion = () => {


//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const topicfeedbackquestionfetch = useSelector(
//     (state) => state.fetchtopicfeedbackquestion.topicfeedbackquestions
//   );
//   const topicId = sessionStorage.getItem("topicId");
//   const learnerId = sessionStorage.getItem("UserSessionID");

//   const courseId = sessionStorage.getItem("courseId")
//   const [answerss, setAnswerss] = useState([]);

//   useEffect(() => {
//     dispatch(fetchtopicfeedbackquestionrequest(topicId));
//   }, [dispatch, topicId]);

//   useEffect(() => {
//     setAnswerss(
//       topicfeedbackquestionfetch.map((question) => ({
//         topicFeedbackQuestionId: question.topicFeedbackQuestionId,
//         topicId: topicId,
//         learnerId: learnerId,
//         response: "",
//         optionText: "",
//       }))
//     );
//   }, [topicfeedbackquestionfetch, topicId, learnerId]);

//   const onhandleChange = (questionId, optionType, optionValue) => {
//     setAnswerss((prevAnswers) =>
//       prevAnswers.map((answer) =>
//         answer.topicFeedbackQuestionId === questionId
//           ? { ...answer, [optionType]: optionValue }
//           : answer
//       )
//     );
//   };

//   const onhandleResponse = (questionId, optionType) => (e) => {
//     const { value } = e.target;
//     setAnswerss((prevAnswers) =>
//       prevAnswers.map((answer) =>
//         answer.topicFeedbackQuestionId === questionId
//           ? { ...answer, [optionType]: value }
//           : answer
//       )
//     );
//   };


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     TopicFeedbackResponseApi(answerss);
//     const Toast = Swal.mixin({
//       customClass: 'swal2-toast-quiz-submission',
//       className: "swal2-toast",
//       toast: true,
//       position: "top",
//       showConfirmButton: false,
//       timer: 2000,
//       background: 'green',
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.onmouseenter = Swal.stopTimer;
//         toast.onmouseleave = Swal.resumeTimer;
//       }
//     });
//     Toast.fire({
//       icon: "success",
//       title: "TopicFeedback Response Submitted successfully",
//       color: 'white'
//     });
//     setTimeout(() => {
//       navigate(`/ViewTopics/${courseId}`);
//     }, 2000);
//   };

//   const divStyle = {
//     boxShadow: "0px 4px 8px #23275c",
//     backgroundColor: "#F5F7F8",
//     width: "750px",
//     height: "100%",
//     marginTop: "2%"
//   };

//   const allAnswered = answerss.every(
//     (answer) => answer.optionText || answer.response
//   );

//   const instructionStyle = {
//     padding: "10px",
//     margin: "10px",
//   };

//   const labels = {
//     1: 'Poor',
//     5: 'Excellent'
//   };

//   return (
//     <div>
//       <TopBar />
//       <div className="question template container" id="fq">
//         <div>
//           <button
//             className="btn btn-light"
//             style={{
//               marginLeft: "100%",
//               marginTop: "3%",
//               backgroundColor: "#365486",
//               color: "white",
//               width: "50",
//             }}
//             onClick={() => {
//               navigate(`/ViewTopics/${courseId}`);
//             }}
//           >
//             Back
//           </button>
//         </div>

//         <h4 style={{ fontWeight: "bold", textAlign: "center" }}>Topic Feedback</h4>
//         <div>
//           <Container fluid id="cardstyle" style={divStyle}>
//           <h6 style={instructionStyle}><b>Please rate from 1 to 5 on the mentioned Topic parameters .
//             <b style={{ color: "red" }}> * </b>
//             Poor = 1 ; Average = 3 ; Excellent = 5</b></h6>
//           <h6 style={instructionStyle}>Please select the number, which most accurately reflects your satisfaction level</h6>
//             {topicfeedbackquestionfetch &&
//               topicfeedbackquestionfetch.map(
//                 (topicfeedbackquestions, index) => (
//                   <div className="cont mt-2" key={index}>
//                     <div className="card mt-5">
//                       <div className="card-body">
//                         <h5 style={{ fontWeight: "bold", fontSize: "18px" }}>{topicfeedbackquestions.question} <b style={{ color: "red" }}>*</b></h5>
//                         {/* <h6 className="card-title">
//                           Question {topicfeedbackquestions.questionNo}
//                         </h6> */}
//                         {/* <input
//                           value={topicfeedbackquestions.question}
//                           className="form-control"
//                           readOnly
//                         /> */}
//                         <div className="card-body">
//                           <div className="form-group">


//                             {/* <h6 className="card-title">Options:</h6> */}
//                             <div className="radio-container">
//                             {topicfeedbackquestions.questionType === "MCQ" ? (
//                               topicfeedbackquestions.options.map(
//                                 (option, optionIndex) => (
//                                   <div key={optionIndex} className="custom-radio-button">

//                                     {/* <input
//                                       id="feedbackradiobtn"
//                                       type="radio"
//                                       onChange={() =>
//                                         onhandleChange(
//                                           topicfeedbackquestions.topicFeedbackQuestionId,
//                                           'optionText',
//                                           option.optionText
//                                         )
//                                       }
//                                       value={option.optionText}
//                                       name={`option_${topicfeedbackquestions.topicFeedbackQuestionId}`} // Unique name for each question
//                                     /> */}
//                                     {/* <label>{option.optionText}</label> */}





//                                     <input
//                                       id={`option_${topicfeedbackquestions.topicFeedbackQuestionId}_${optionIndex}`}
//                                       type="radio"
//                                       onChange={() => onhandleChange(topicfeedbackquestions.topicFeedbackQuestionId, "optionText", option.optionText)}
//                                       value={option.optionText}
//                                       name={`option_${topicfeedbackquestions.topicFeedbackQuestionId}`}
//                                       className="custom-radio-input"
//                                     />
//                                     <label htmlFor={`option_${topicfeedbackquestions.topicFeedbackQuestionId}_${optionIndex}`} className="custom-radio-label">
//                                       {option.optionText}
//                                     </label>
//                                     {labels[option.optionText] && <div className="rating-tag">{labels[option.optionText]}</div>}


//                                   </div>
//                                 )
//                               )
//                             ) : (
//                               <textarea
//                                 onChange={onhandleResponse(
//                                   topicfeedbackquestions.topicFeedbackQuestionId,
//                                   'response'
//                                 )}
//                                 value={
//                                   answerss.find(
//                                     answer =>
//                                       answer.topicFeedbackQuestionId ===
//                                       topicfeedbackquestions.topicFeedbackQuestionId
//                                   )?.response
//                                 }
//                                 name='response' className="form-control"
//                               />
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   </div>
//                 )
//               )}
//             <Button
//               type="submit"
//               onClick={handleSubmit}
//               className="btn btn-light mt-3 mb-5 float-right"
//               style={{
//                 backgroundColor: "#365486",
//                 color: "white",
//                 marginLeft: "45%",
//               }}
//               disabled={!allAnswered}
//             >
//               Submit
//             </Button>
//           </Container>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TopicFeedbackquestion;


import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import '../../../../Styles/Quiz And Feedback Module/Learner/FeedbackResponse.css';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { topicfeedbackresponserequest } from '../../../../actions/Quiz And Feedback Module/Learner/TopicFeedbackResponseAction';
import { fetchtopicfeedbackquestionrequest } from '../../../../actions/Quiz And Feedback Module/Learner/FetchTopicFeedbackQuestionAction';
import Swal from "sweetalert2";
import Textarea from '@mui/joy/Textarea';
import TopBar from "../../../Quiz And Feedback Module/QuizComponents/Learner/TopBar";
import { TopicFeedbackResponseApi } from '../../../../middleware/Quiz And Feedback Module/Learner/TopicFeedbackResponseApi';
 
 
 
 
const TopicFeedbackquestion = () => {
 
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const topicfeedbackquestionfetch = useSelector(
    (state) => state.fetchtopicfeedbackquestion.topicfeedbackquestions
  );
  const topicId = sessionStorage.getItem("topicId");
  const learnerId = sessionStorage.getItem("UserSessionID");
 
  const courseId = sessionStorage.getItem("courseId")
  const [answerss, setAnswerss] = useState([]);
 
  useEffect(() => {
    dispatch(fetchtopicfeedbackquestionrequest(topicId));
  }, [dispatch, topicId]);
 
  useEffect(() => {
    setAnswerss(
      topicfeedbackquestionfetch.map((question) => ({
        topicFeedbackQuestionId: question.topicFeedbackQuestionId,
        topicId: topicId,
        learnerId: learnerId,
        response: "",
        optionText: "",
      }))
    );
  }, [topicfeedbackquestionfetch, topicId, learnerId]);
 
  // const onhandleChange = (questionId, optionType, optionValue) => {
  //   setAnswerss((prevAnswers) =>
  //     prevAnswers.map((answer) =>
  //       answer.topicFeedbackQuestionId === questionId
  //         ? { ...answer, [optionType]: optionValue }
  //         : answer
  //     )
  //   );
  // };
  const onhandleChange = (questionId, optionType, optionValue) => {
    setAnswerss((prevAnswers) =>
          prevAnswers.map((answer) =>
            answer.topicFeedbackQuestionId === questionId
              ? { ...answer, [optionType]: optionValue }
              : answer
          )
        );
    setSelectedOption(questionId);
  };
 
  const onhandleResponse = (questionId, optionType) => (e) => {
    const { value } = e.target;
    setAnswerss((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.topicFeedbackQuestionId === questionId
          ? { ...answer, [optionType]: value }
          : answer
      )
    );
  };
 
 
  const handleSubmit = (e) => {
    e.preventDefault();
    TopicFeedbackResponseApi(answerss);
    const Toast = Swal.mixin({
      customClass: 'swal2-toast-quiz-submission',
      className: "swal2-toast",
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      background: 'green',
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "TopicFeedback Response Submitted successfully",
      color: 'white'
    });
    setTimeout(() => {
      navigate(`/ViewTopics/${courseId}`);
    }, 2000);
  };
 
  const divStyle = {
    boxShadow: "0px 4px 8px #23275c",
    backgroundColor: "#F5F7F8",
    // backgroundColor:"white",
    width:"750px",
    height:"100%",
    marginTop: "2%"
  };
 
  const allAnswered = answerss.every(
    (answer) => answer.optionText || answer.response
  );
 
  const instructionStyle = {
    padding: "10px",
    margin: "10px",
  };
 
  const labels = {
    1: 'Poor',
    5: 'Excellent'
  };
 
  return (
    <div>
      <TopBar />
      <div className="question template container" id="fq">
        <div>
          <button
            className="btn btn-light"
            style={{
              marginLeft:"100%",
              marginTop: "3%",
              backgroundColor: "#365486",
              color: "white",
              width: "50",
            }}
            onClick={() => {
              navigate(`/ViewTopics/${courseId}`);
            }}
          >
            Back
          </button>
        </div>
 
        <h4 style={{ fontWeight: "bold", textAlign: "center" }}>Topic Feedback</h4>
        <div>
          <Container fluid id="cardstyle" style={divStyle}>
          <h6 style={instructionStyle}><b>Please rate from 1 to 5 on the mentioned Topic parameters.
            <b style={{ color: "red" }}> * </b>
            Poor = 1 ; Average = 3 ; Excellent = 5</b></h6>
          <h6 style={instructionStyle}>Please select the number, which most accurately reflects your satisfaction level</h6>
            {topicfeedbackquestionfetch &&
              topicfeedbackquestionfetch.map(
                (topicfeedbackquestions, index) => (
                  <div className="cont mt-2" key={index}>
                    <div className="card mt-5">
                      <div>
                        <h5 style={{ fontWeight: "bold", fontSize: "18px" , marginTop: "2%", marginLeft: "2%"  }}>{topicfeedbackquestions.questionNo}.{""}{topicfeedbackquestions.question} <b style={{ color: "red" }}>*</b></h5>
                        <div className="card-body">
                        <div className={`card-body form-group ${topicfeedbackquestions.topicFeedbackQuestionId === selectedOption ? 'selected-card-body' : ''}`} >
                            {/* <h6 className="card-title">Options:</h6> */}
                            <div className="radio-container">
                            {topicfeedbackquestions.questionType === "MCQ" ? (
                              topicfeedbackquestions.options.map(
                                (option, optionIndex) => (
                                  <div key={optionIndex} className="custom-radio-button">
                                    {/* <input
                                      id="feedbackradiobtn"
                                      type="radio"
                                      onChange={() =>
                                        onhandleChange(
                                          topicfeedbackquestions.topicFeedbackQuestionId,
                                          'optionText',
                                          option.optionText
                                        )
                                      }
                                      value={option.optionText}
                                      name={`option_${topicfeedbackquestions.topicFeedbackQuestionId}`} // Unique name for each question
                                    /> */}
                                    {/* <label>{option.optionText}</label> */}
                                    <input
                                      id={`option_${topicfeedbackquestions.topicFeedbackQuestionId}_${optionIndex}`}
                                      type="radio"
                                      onChange={() => onhandleChange(topicfeedbackquestions.topicFeedbackQuestionId, "optionText", option.optionText)}
                                      value={option.optionText}
                                      name={`option_${topicfeedbackquestions.topicFeedbackQuestionId}`}
                                      className="custom-radio-input"
                                    />
                                    <label htmlFor={`option_${topicfeedbackquestions.topicFeedbackQuestionId}_${optionIndex}`} className="custom-radio-label">
                                      {option.optionText}
                                    </label>
                                    {labels[option.optionText] && <div className="rating-tag">{labels[option.optionText]}</div>}
 
 
                                  </div>
                                )
                              )
                            ) : (
                              <Textarea
                              id="feedbacktextarea"
                              color="primary"
                              minRows={2}
                              variant="neutral"
                              placeholder="Type here..."
                              onChange={onhandleResponse(topicfeedbackquestions.topicFeedbackQuestionId, "response")}
                              value={answerss.find((answer) => answer.topicFeedbackQuestionId === topicfeedbackquestions.topicFeedbackQuestionId)?.response}
                              name="response" className="form-control"
                            />
                              // <textarea
                              //   onChange={onhandleResponse(
                              //     topicfeedbackquestions.topicFeedbackQuestionId,
                              //     'response'
                              //   )}
                              //   value={
                              //     answerss.find(
                              //       answer =>
                              //         answer.topicFeedbackQuestionId ===
                              //         topicfeedbackquestions.topicFeedbackQuestionId
                              //     )?.response
                              //   }
                              //   name='response' className="form-control"
                              // />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                )
              )}
            <Button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-light mt-3 mb-5 float-right"
              style={{
                backgroundColor: "#365486",
                color: "white",
                marginLeft: "45%",
              }}
              disabled={!allAnswered}
            >
              Submit
            </Button>
          </Container>
        </div>
      </div>
    </div>
  );
};
 
export default TopicFeedbackquestion;
 