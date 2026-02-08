import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IconButton, Stack, Tooltip } from '@mui/material';    // modification for  imports quizteam 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ImFolderUpload } from "react-icons/im";
import { BiSolidCoinStack } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import { FaUpload } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Card, ProgressBar, OverlayTrigger } from 'react-bootstrap';
import { FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import "../../../../Styles/Quiz And Feedback Module/CreateQuiz.css";
import {
    ValidationQuizTitle,
    ValidationDuration,
    ValidationGrade,
    ValidationAttempts,
} from "../../../../utils/Quiz And Feedback Module/ValidationCreateQuiz";
import { DeleteQuizDetails } from "../../../../middleware/Quiz And Feedback Module/Admin/api";
import { GetQuizDetails } from "../../../../middleware/Quiz And Feedback Module/Admin/FetchQuizApi";
import { setQuizDetailsRequest } from "../../../../actions/Quiz And Feedback Module/Admin/CreateQuizAction";
import { useNavigate } from "react-router-dom";
import { editQuizDetailsRequest } from "../../../../actions/Quiz And Feedback Module/Admin/EditQuizAction";
import QuestionTemplateView from "../../../../View/Quiz And Feedback Module/QuestionTemplateView";
import { fetchQuizIdFailure } from "../../../../actions/Quiz And Feedback Module/Admin/FetchQuizIdAction";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";
import CreateQuizApi from "../../../../middleware/Quiz And Feedback Module/Admin/CreateQuizApi";
import { useSelector } from "react-redux";
import { Modal as MuiModal, Box, Typography, TextField, Button as MuiButton } from '@mui/material';
import { fetchTopicsRequest } from "../../../../actions/Course/Topic/FetchTopicsAction";

export const Home = () => {
    const quizId = sessionStorage.getItem('quizId');
    const topicId = sessionStorage.getItem('topicId');
    const courseId = sessionStorage.getItem('courseId');
    const [button, setButton] = useState(true);
    const selectorTopicsDetail = useSelector((state) => state.fetchTopic.topics[0]);

    // const [viewCourse, setViewCourse] = useState([course])
    console.log("course", selectorTopicsDetail);
    const [showQuestions, setShowQuestions] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showOptions, setShowOptions] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [quizTitle, setQuizTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [passMark, setPassMark] = useState('');
    const [attemptsAllowed, setAttemptsAllowed] = useState('');
    const [error, setError] = useState('');
    const [errorduration, setErrorDuration] = useState('');
    const [errormark, setErrormark] = useState('');
    const [errorattempts, setErrorAttempt] = useState('');
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const [showQuizEditModal, setShowQuizEditModal] = useState(false);
    const [showQuizDeleteModal, setShowQuizDeleteModal] = useState(false);
    const [inputQuizTitle, setInputQuizTitle] = useState('');
    const [errordeletequiz, setErrorDeleteQuiz] = useState('');
    const [formComplete, setFormComplete] = useState(false);
    const [quizDetails, setQuizDetails] = useState({
        topicId: topicId,
        nameOfQuiz: '',
        duration: '',
        passMark: '',
        attemptsAllowed: ''
    });
    const [quizData, setQuizData] = useState({
        topicId: topicId,
        courseId: 'course',
        nameOfQuiz: '',
        duration: '',
        passMark: '',
        attemptsAllowed: ''
    });

    const [currentTopic, setCurrentTopic] = useState(null);

    console.log("courseId:", courseId);

    const [isQuizEditable, setIsQuizEditable] = useState(!quizId);

    console.log("create page Id: ", quizId, topicId);

    useEffect(() => {
        dispatch(fetchTopicsRequest(courseId));
    }, []);

    useEffect(() => {
        fetchQuizData(quizId);
    }, []);

    useEffect(() => {
        fetchQuizData(quizId);

        // Find the correct topic
        const topic = selectorTopicsDetail?.topics.find(topic => topic.topicId === topicId);
        setCurrentTopic(topic);
    }, []);

    const toggleOptions = (event) => {
        event.preventDefault();
        setShowOptions(!showOptions);
        event.target.nextSibling.style.display = showOptions ? 'none' : 'block';
    };

    const toggleQuestions = () => {
        setShowQuestions(!showQuestions);
    };


    const handleUploadClick = async (e) => {
        e.preventDefault();
        console.log("quiz details:", quizDetails);
        // dispatch(setQuizDetailsRequest(quizDetails));
        await CreateQuizApi(quizDetails)
        navigate('/upload');
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleQuizTitleChange = (e) => {
        ValidationQuizTitle(e.target.value, setError, setQuizTitle);
        handleQuizChange(e);
    };

    const handleInputChange = (e) => {
        ValidationDuration(e.target.value, setDuration, setErrorDuration);
        handleQuizChange(e);
    };

    const handlemarkChange = (e) => {
        ValidationGrade(e.target.value, setPassMark, setErrormark);
        handleQuizChange(e);
    };

    const handleattemptsChange = (e) => {
        ValidationAttempts(e.target.value, setAttemptsAllowed, setErrorAttempt);
        handleQuizChange(e);
    };

    const handleOpenAddQuestionModal = () => {
        setShowAddQuestionModal(true);
    };

    const handleCloseQuizEditModal = () => {
        setShowQuizEditModal(false);
    }

    const handleCloseQuizDeleteModal = () => {
        setShowQuizDeleteModal(false);
    }

    const handleOpenQuizEditModal = () => {
        setShowQuizEditModal(true);
    }

    const handleOpenQuizDeleteModal = () => {
        setShowQuizDeleteModal(true);
    }

    const handleQuizChange = (e) => {
        const updatedQuizDetails = { ...quizDetails, [e.target.name]: e.target.value };
        setQuizDetails(prevDetails => ({
            ...prevDetails,
            [e.target.name]: e.target.value
        }));
        setQuizData({ ...quizData, [e.target.name]: e.target.value });
        setFormComplete(isFormComplete(updatedQuizDetails));
    };

    const isFormComplete = (details) => {
        return (
            details.nameOfQuiz.trim() !== '' &&
            Number(details.duration) > 0 &&
            Number(details.passMark) > 0 &&
            Number(details.attemptsAllowed) > 0
        );
    };

    const handleSubmit = () => {
        try {
            navigate(`/reviewquestions`)

        } catch (error) {
            console.error('Error fetching data:', error)
        }

    };

    const handleDurationChange = (e) => {
        setDuration('SET_DURATION', e.target.value);
    };

    const handleGradeChange = (e) => {
        setPassMark('SET_PASSMARK', e.target.value);
    };

    const fetchQuizData = async (quizId) => {
        try {
            const data = await GetQuizDetails(quizId);
            sessionStorage.setItem('quizName', data.nameOfQuiz);
            setQuizData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleUpdateQuiz = () => {
        const updatedQuizData = {
            quizId: quizId,
            nameOfQuiz: quizData.nameOfQuiz,
            duration: parseInt(quizData.duration),
            attemptsAllowed: parseInt(quizData.attemptsAllowed),
            passMark: parseInt(quizData.passMark)
        };
        console.log("update", updatedQuizData);
        dispatch(editQuizDetailsRequest(updatedQuizData));
        handleCloseQuizEditModal();
        const Toast = Swal.mixin({
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
            title: "Quiz Updated Successfully",
            color: 'white'
        });

    };

    const handleDeleteQuiz = (quizId) => {
        setShowQuestions(false);
        console.log('Entered Title:', inputQuizTitle);
        console.log('Actual Quiz Title:', quizData.nameOfQuiz);

        if (inputQuizTitle === quizData.nameOfQuiz) {
            DeleteQuizDetails(quizId);
            const Toast = Swal.mixin({
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
                title: "Quiz deleted successfully",
                color: 'white'
            });
            // alert('Quiz deleted successfully');
            handleCloseQuizDeleteModal();
            setTimeout(() => {
                navigate(`/coursecontent/${courseId}`)
            }, 2000);
            dispatch(fetchQuizIdFailure(topicId))
        } else {
            setErrorDeleteQuiz('The QuizTitle you entered does not match !');
        }
    };

    const handleQuizTitle = (event) => {
        setInputQuizTitle(event.target.value);
    };



    const handleNavigate = () => {
        sessionStorage.removeItem("quizId");
        sessionStorage.removeItem("topicId");
        navigate(`/coursecontent/${courseId}`)
        dispatch(fetchQuizIdFailure(topicId))
    }

    const handleQuizFeedback = () => {
        navigate(`/quizfeedback`)
    }

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <div>
            <Container fluid className="creat-quiz-container">
                <div >

                    <div className="d-flex justify-content-end mb-5" style={{ marginTop: 100 }}>
                        <Button variant="primary" onClick={handleQuizFeedback} style={{ height: '50px', marginRight: 10 }}>
                            Quiz Feedback
                        </Button>
                        <button class="btn btn-light" style={{ color: "white", width: '50', backgroundColor: "#365486" }} onClick={() => { handleNavigate() }}>Back</button>
                    </div>
                    <Row>
                        <Col md={6}>
                            <Card className="mb-4">
                                <Card.Header as="h5">Course Details</Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3 d-flex">
                                            <Form.Label className="mt-1" style={{ width: 80 }}>Course: </Form.Label>
                                            <Form.Control type="text" value={selectorTopicsDetail?.courseTitle} readOnly />
                                        </Form.Group>
                                        <Form.Group className="mb-3 d-flex">
                                            <Form.Label className="mt-1" style={{ width: 80 }}>Topic: </Form.Label>
                                            <Form.Control type="text" value={currentTopic?.topicName} readOnly />
                                        </Form.Group>

                                    </Form>
                                </Card.Body>
                            </Card>
                            <Card className="mb-4">
                                <Card.Header as="h5">On this page, you can:</Card.Header>
                                <Card.Body style={{ fontSize: 13 }}>
                                    <ul>
                                        <li>View and manage the entire quiz</li>
                                        <li>Navigate to quiz feedback or proceed to review questions</li>
                                        <li>View question cards containing:
                                            <ul>
                                                <li>Question text</li>
                                                <li>Answer options</li>
                                                <li>Correct option highlighted in <span style={{ backgroundColor: 'green', color: 'white' }}>green</span></li>
                                            </ul>
                                        </li>
                                        <li>Use the "Proceed" button at the bottom to move to the next step</li>
                                    </ul>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
                                    Quiz Details
                                    <div>
                                        <Tooltip title="Edit quiz"><IconButton aria-label="Editquiz" onClick={handleOpenQuizEditModal}  ><EditIcon style={{ color: "#365486" }} variant="outlined" /> </IconButton></Tooltip>
                                        <Tooltip title="Delete quiz"><IconButton aria-label="deletequiz" onClick={handleOpenQuizDeleteModal}  ><DeleteIcon style={{ color: "C80036" }} /></IconButton></Tooltip>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Quiz Title<span id='required'>*</span></Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="nameOfQuiz"
                                                value={quizData.nameOfQuiz}
                                                readOnly={!isQuizEditable}
                                                onChange={handleQuizTitleChange}
                                            />
                                            {error && <Form.Text className="text-danger">{error}</Form.Text>}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Duration<span id='required'>*</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="duration"
                                                value={quizData.duration}
                                                readOnly={!isQuizEditable}
                                                onChange={handleInputChange}
                                            />
                                            {errorduration && <Form.Text className="text-danger">{errorduration}</Form.Text>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Grade to be secured<span id='required'>*</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="passMark"
                                                value={quizData.passMark}
                                                readOnly={!isQuizEditable}
                                                onChange={handlemarkChange}
                                            />
                                            {errormark && <Form.Text className="text-danger">{errormark}</Form.Text>}
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Attempts Allowed<span id='required'>*</span></Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="attemptsAllowed"
                                                value={quizData.attemptsAllowed}
                                                readOnly={!isQuizEditable}
                                                onChange={handleattemptsChange}
                                            />
                                            {errorattempts && <Form.Text className="text-danger">{errorattempts}</Form.Text>}
                                        </Form.Group>

                                        {quizId ? (
                                            <div></div>
                                        ) : (
                                            <div className="form-group" style={{ textAlign: 'center' }}>
                                                <div className="">
                                                    <Button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                        onClick={(e) => {
                                                            handleUploadClick(e);
                                                        }}
                                                        style={{ color: 'white', width: 200 }}
                                                        disabled={!formComplete}
                                                    >
                                                        <FaUpload /> Import Question
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    {/* --------------------------------------------------------------*/}
                    {showQuestions && quizId ? (
                        <div className="">
                            <QuestionTemplateView />
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {quizId ? <div>
                        <button onClick={handleSubmit} className="btn btn-light mt-3 mb-5 float-left" style={{ color: "white", marginLeft: "92%", backgroundColor: "#365486" }}>Proceed</button>
                    </div> : <div></div>}
                    {/* DeleteQuiz */}
                    <MuiModal
                        open={showQuizDeleteModal}
                        onClose={handleCloseQuizDeleteModal}
                        aria-labelledby="delete-quiz-modal-title"
                    >
                        <Box sx={modalStyle}>
                            <Typography id="delete-quiz-modal-title" variant="h6" component="h2" gutterBottom>
                                Delete Quiz
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                All the quiz related data will be removed permanently. <br />
                                To confirm deletion, please type the quiz title:
                                <br />
                                <strong>"{quizData.nameOfQuiz}"</strong>
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                placeholder="Enter the Quiz Title"
                                onChange={handleQuizTitle}
                                error={!!errordeletequiz}
                                helperText={errordeletequiz}
                            />
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <MuiButton onClick={handleCloseQuizDeleteModal} sx={{ mr: 1 }}>
                                    Cancel
                                </MuiButton>
                                <MuiButton
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDeleteQuiz(quizId)}
                                >
                                    Delete
                                </MuiButton>
                            </Box>
                        </Box>
                    </MuiModal>

                    {/* EditQuiz */}
                    <MuiModal
                        open={showQuizEditModal}
                        onClose={handleCloseQuizEditModal}
                        aria-labelledby="edit-quiz-modal-title"
                    >
                        <Box sx={modalStyle}>
                            <Typography id="edit-quiz-modal-title" variant="h6" component="h2" gutterBottom>
                                Edit Quiz
                            </Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Quiz Title"
                                variant="outlined"
                                name="nameOfQuiz"
                                value={quizData.nameOfQuiz}
                                onChange={(e) => { handleQuizTitleChange(e); handleQuizChange(e) }}
                                error={!!error}
                                helperText={error}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Duration (minutes)"
                                variant="outlined"
                                type="number"
                                name="duration"
                                value={quizData.duration}
                                onChange={(e) => { handleDurationChange(e); handleQuizChange(e); handleInputChange(e) }}
                                error={!!errorduration}
                                helperText={errorduration}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Grade to be Secured"
                                variant="outlined"
                                type="number"
                                name="passMark"
                                value={quizData.passMark}
                                onChange={(e) => { handleGradeChange(e); handleQuizChange(e); handlemarkChange(e) }}
                                error={!!errormark}
                                helperText={errormark}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Attempts Allowed"
                                variant="outlined"
                                type="number"
                                name="attemptsAllowed"
                                value={quizData.attemptsAllowed}
                                onChange={(e) => { handleQuizChange(e); handleattemptsChange(e) }}
                                error={!!errorattempts}
                                helperText={errorattempts}
                            />
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                <MuiButton onClick={handleCloseQuizEditModal} sx={{ mr: 1 }}>
                                    Cancel
                                </MuiButton>
                                <MuiButton
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdateQuiz}
                                >
                                    Update
                                </MuiButton>
                            </Box>
                        </Box>
                    </MuiModal>
                    <Modal show={showModal} onHide={closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title id='questitle'>Question Library</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {/* <h6><BiSolidCoinStack style={{ fontSize: "30", color: "GrayText", marginBottom: "11", marginLeft: "10" }} /><Link id='bulklink' onClick={() => { handleBulkUpload(bulkQuizId) }}> Add Question from Bulk Upload</Link></h6> */}
                            <h6><ImFolderUpload style={{ fontSize: "20", color: "GrayText", marginBottom: "11", marginLeft: "13" }} /><Link id='newquelink' onClick={() => { handleOpenAddQuestionModal(); closeModal() }}> Add New Question</Link></h6>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            </Container>
        </div>
    );
};

export default Home;