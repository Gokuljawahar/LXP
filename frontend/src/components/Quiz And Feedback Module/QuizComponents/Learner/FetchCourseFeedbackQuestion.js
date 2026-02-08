import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../../../../Styles/Quiz And Feedback Module/Learner/FeedbackResponse.css";
import Button from "react-bootstrap/Button";
import { fetchallquizfeedbackRequest } from "../../../../actions/Quiz And Feedback Module/Admin/GetAllQuizFeedbackAction";
import { fetchquizfeedbackquestionrequest } from "../../../../actions/Quiz And Feedback Module/Learner/FetchQuizFeedbackQuestionAction";
import { quizfeedbackresponserequest } from "../../../../actions/Quiz And Feedback Module/Learner/QuizFeedbackResponseAction";
import { Container } from "react-bootstrap";
import TopBar from "../../../Quiz And Feedback Module/QuizComponents/Learner/TopBar";
import Swal from "sweetalert2";
import Textarea from '@mui/joy/Textarea';
import { FetchCourseFeedbackQuestionApi } from "../../../../middleware/Quiz And Feedback Module/Learner/FetchCourseFeedbackQuestionApi";
import { CourseFeedbackResponseApi } from "../../../../middleware/Quiz And Feedback Module/Learner/CourseFeedbackResponseApi";

const FetchCourseFeedbackQuestion = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState(null);
    const [coursefeedbackquestion, setCoursefeedbackquestion] = useState([]);
    //const courseId = sessionStorage.getItem("courseId");
    const learnerId = sessionStorage.getItem("UserSessionID");

    useEffect(() => {
        fetchCourseFeedbackQuestions(id);
    }, []);

    const fetchCourseFeedbackQuestions = async (id) => {
        console.log("fetch course");
        const data = await FetchCourseFeedbackQuestionApi(id);
        console.log("datadata", data);
        setCoursefeedbackquestion(data);
    }

    console.log("data", coursefeedbackquestion);




    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (coursefeedbackquestion) {
            setAnswers(
                coursefeedbackquestion.map((question) => ({
                    courseFeedbackQuestionId: question.courseFeedbackQuestionId,
                    courseId: question.courseId,
                    learnerId: learnerId,
                    response: "",
                    optionText: "",
                }))
            );
        }
    }, [coursefeedbackquestion]);


    const onhandleChange = (questionId, optionType, optionValue) => {
        setAnswers(answers.map((answer) => answer.courseFeedbackQuestionId === questionId ? { ...answer, [optionType]: optionValue } : answer));
        setSelectedOption(questionId);
    };

    const onhandleResponse = (questionId, optionType) => (e) => {
        const { value } = e.target;
        setAnswers(
            answers.map((answer) =>
                answer.courseFeedbackQuestionId === questionId
                    ? { ...answer, [optionType]: value }
                    : answer
            )
        );
    };
    // Submit all answers
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Replace with your actual submit logic
        console.log("Submitting answers:", answers);
        await CourseFeedbackResponseApi(answers);
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
            title: "QuizFeedback Response Submitted successfully",
            color: 'white'
        });
        // setTimeout(() => {
        //     navigate("/LearnerenrolledCourse");
        // }, 2000);
    };

    const handleNavigate = () => {
        navigate("/completedcourse");
    };

    const divStyle = {
        boxShadow: "0px 4px 8px #23275c",
        // backgroundColor: "#F9F5F6",
        backgroundColor: "#F5F7F8",
        width: "750px",
        height: "100%",
        marginTop: "2%"
    };

    const allAnswered = answers.every(
        (answer) => answer.optionText || answer.response
    );

    const instructionStyle = {
        padding: "10px",
        margin: "10px",
    };

    const labels = {
        1: 'Easy',
        5: 'Hard'
    };




    return (
        <div>
            <TopBar />
            <div className="question template container" id="fq">
                <div>
                    <button
                        class="btn btn-light"
                        style={{
                            marginLeft: "100%",
                            marginTop: "7%",
                            backgroundColor: "#365486",
                            color: "white",
                            width: "50",
                        }}
                        onClick={() => {
                            handleNavigate();
                        }}
                    >
                        Back
                    </button>
                </div>
                <h4 style={{ fontWeight: "bold", textAlign: "center" }}>Course Feedback</h4>
                <div>
                    <Container fluid id="cardstyle" style={divStyle}>
                        <h6 style={instructionStyle}><b>Please rate from 1 to 5 on the mentioned Quiz parameters .<br />
                            <b style={{ color: "red" }}> * </b>
                            Easy = 1 ; Intermediate = 3 ; Hard = 5</b></h6>
                        <h6 style={instructionStyle}>Please select the number, which most accurately reflects your satisfaction level</h6>


                        {coursefeedbackquestion &&
                            coursefeedbackquestion.map((coursefeedbackquestion, index) => (
                                <div className="cont mt-2">
                                    <div className="card mt-3" key={index}>
                                        <div >
                                            <h5 style={{ fontWeight: "bold", fontSize: "18px", marginTop: "2%", marginLeft: "2%" }}>{coursefeedbackquestion.questionNo}.{""}{coursefeedbackquestion.question}<b style={{ color: "red" }}>*</b></h5>
                                        </div>
                                        <div className="card-body">
                                            <div className={`card-body form-group ${coursefeedbackquestion.courseFeedbackQuestionId === selectedOption ? 'selected-card-body' : ''}`} >
                                                <div className="radio-container ">
                                                    {coursefeedbackquestion.questionType === "MCQ" ? (
                                                        coursefeedbackquestion.options.map((option, optionIndex) => (
                                                            <div key={optionIndex} className="custom-radio-button">
                                                                <input id={`option_${coursefeedbackquestion.courseFeedbackQuestionId}_${optionIndex}`} type="radio" onChange={() => onhandleChange(coursefeedbackquestion.courseFeedbackQuestionId, "optionText", option.optionText)} value={option.optionText} name={`option_${coursefeedbackquestion.courseFeedbackQuestionId}`} className="custom-radio-input" />
                                                                <label htmlFor={`option_${coursefeedbackquestion.courseFeedbackQuestionId}_${optionIndex}`} className="custom-radio-label">{option.optionText}</label>
                                                                {labels[option.optionText] && <div className="rating-tag">{labels[option.optionText]}</div>}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <Textarea
                                                            id="feedbacktextarea"
                                                            color="primary"
                                                            minRows={2}
                                                            size="lg"
                                                            variant="neutral"
                                                            placeholder="Type here..."
                                                            onChange={onhandleResponse(coursefeedbackquestion.courseFeedbackQuestionId, "response")}
                                                            value={answers.find((answer) => answer.courseFeedbackQuestionId === coursefeedbackquestion.courseFeedbackQuestionId)?.response}
                                                            name="response" className="form-control"
                                                        />
                                                        // <textarea id="feedbacktextarea" onChange={onhandleResponse(quizfeedbackquestions.quizFeedbackQuestionId, "response")} value={answers.find((answer) => answer.quizFeedbackQuestionId === quizfeedbackquestions.quizFeedbackQuestionId)?.response} name="response" className="form-control" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            ))}

                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            className="btn btn-light mt-3 mb-5 float-right"
                            style={{
                                backgroundColor: "#365486",
                                color: "white",
                                marginLeft: "45%",
                            }}
                            disabled={
                                !answers.every((answer) => answer.optionText || answer.response)
                            }
                        >
                            Submit
                        </Button>
                    </Container>
                    <div>
                        <Button
                            variant="default"
                            style={{
                                backgroundColor: "#365486",
                                color: "whitesmoke",
                                width: "130px",
                                marginTop: "-2%",
                                marginLeft: "85%",
                            }}
                            onClick={() => {
                                navigate("/LearnerenrolledCourse");
                            }}
                        >
                            Go to Course
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FetchCourseFeedbackQuestion;