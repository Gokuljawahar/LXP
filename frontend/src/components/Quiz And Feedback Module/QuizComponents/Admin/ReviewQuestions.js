import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Container, Row, Col, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { createquizfeedbackRequest } from "../../../../actions/Quiz And Feedback Module/Admin/QuizFeedbackAction";
import { fetchQuizIdFailure } from "../../../../actions/Quiz And Feedback Module/Admin/FetchQuizIdAction";
import { FetchQuizQuestionsApi } from '../../../../middleware/Quiz And Feedback Module/Admin/FetchQuizQuestionsApi';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledContainer = styled(Container)`
  padding-top: 2rem;
  background-color: #f8f9fa;
`;

const QuestionGridCard = styled(Card)`
  position: fixed;
  top: 100px; // Adjust this value as needed
  width: 300px; // Adjust this value as needed
`;

const QuestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
`;

const QuestionNumberBtn = styled(Button)`
  width: 40px;
  height: 40px;
  padding: 0;
  font-weight: bold;
`;

const QuestionCard = styled(Card)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }
`;

const OptionInput = styled(Form.Control)`
  background-color: ${props => props.isCorrect ? '#d4edda' : 'white'};
  border-color: ${props => props.isCorrect ? '#c3e6cb' : '#ced4da'};
`;

export const ReviewQuestions = () => {
    const courseId = sessionStorage.getItem('courseId');
    const quizId = sessionStorage.getItem('quizId');
    const topicId = sessionStorage.getItem('topicId');

    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');
    const [errorfb, setErrorfb] = useState('');
    const [showAddfbModal, setShowAddfbModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [fbQuestion, setFbQuestion] = useState({
        question: '',
        questionType: '',
        options: ['', '', '', '', '', '', '', ''],
    });
    const [selectedfbType, setSelectedfbType] = useState('');

    useEffect(() => {
        fetchQuestions(quizId);
    }, [quizId]);

    const fetchQuestions = async (quizId) => {
        try {
            const questionsData = await FetchQuizQuestionsApi(quizId);
            setQuestions(questionsData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to fetch questions. Please try again.");
        }
    };

    const handleSubmit = () => {
        try {
            navigate('/createquiz');
        } catch (error) {
            console.error('Error navigating:', error);
        }
    };

    const handleFeedback = () => {
        try {
            navigate(`/quizfeedback`);
        } catch (error) {
            console.error('Error navigating:', error);
        }
    };

    const handleSaveQuestion = () => {
        let tempfbErrors = { question: '', questionType: '', optionText: '' };

        if (!fbQuestion.question) {
            tempfbErrors.question = 'Question is required';
        }
        if (!fbQuestion.questionType) {
            tempfbErrors.questionType = 'Question type is required';
        }
        if (fbQuestion.options.length === 0 && fbQuestion.questionType === "MCQ") {
            tempfbErrors.optionText = 'At least one option is required';
        }

        setErrorfb(tempfbErrors);

        if (tempfbErrors.question || tempfbErrors.questionType || tempfbErrors.optionText) {
            return;
        }

        const requestBody = {
            quizId: quizId,
            question: fbQuestion.question,
            questionType: fbQuestion.questionType,
            options: fbQuestion.options.map((optionText) => ({
                optionText: optionText
            }))
        };

        dispatch(createquizfeedbackRequest(requestBody));
        handleCloseAddfbQuestionModal();
    };

    const handleOpenAddfbQuestionModal = () => {
        setShowAddfbModal(true);
    };

    const handleTypeChange = () => {
        setShowAddModal(true);
    };

    const handleCloseAddfbQuestionModal = () => {
        setShowAddfbModal(false);
    };

    const handleChange = (index, field, value) => {
        setFbQuestion(prevState => ({
            ...prevState,
            [field]: index === -1 ? value : [...prevState[field].slice(0, index), value, ...prevState[field].slice(index + 1)]
        }));
    };

    const handlefbQuestionTypeChange = (e) => {
        const value = e.target.value;
        setSelectedfbType(value);
        setFbQuestion(prevState => ({
            ...prevState,
            questionType: value,
            options: [],
        }));
    };

    const handleSelectQuestion = (index) => {
        setSelectedQuestion(index);
        const questionElement = document.getElementById(`question-${index}`);
        if (questionElement) {
            questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const handleNavigate = () => {
        navigate(`/createquiz`);
    }

    const handleClose = () => {
        sessionStorage.removeItem("quizId");
        sessionStorage.removeItem("topicId");
        sessionStorage.removeItem("courseId");
        navigate(`/addtopic/${courseId}`);
        dispatch(fetchQuizIdFailure(topicId));
    }

    return (
        <StyledContainer fluid>
            <Row className="justify-content-end mt-5">
                <Col xs="auto">
                    <Button variant="primary" onClick={handleNavigate}>Back</Button>
                </Col>
            </Row>
            
            <Row>
            <Col md={3}>
                    <QuestionGridCard>
                        <Card.Body>
                            <h5 className="text-center mb-4">Question Navigator</h5>
                            <QuestionGrid>
                                {questions && questions.map((_, index) => (
                                    <QuestionNumberBtn
                                        key={index}
                                        variant={selectedQuestion === index ? 'primary' : 'outline-primary'}
                                        onClick={() => handleSelectQuestion(index)}
                                    >
                                        {index + 1}
                                    </QuestionNumberBtn>
                                ))}
                            </QuestionGrid>
                        </Card.Body>
                    </QuestionGridCard>
                </Col>
                
                <Col md={9}>
                    <h3 className="mb-4">Review Questions</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {questions && questions.map((question, index) => (
                        <QuestionCard key={index} id={`question-${index}`} className="mb-4">
                            <Card.Header>
                                <h5>Question {question.questionNo}</h5>
                            </Card.Header>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label>Question:</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={question.question} readOnly />
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    <Form.Label>Options:</Form.Label>
                                    {question.options.map((option, optIndex) => (
                                        <OptionInput 
                                            key={optIndex} 
                                            type="text" 
                                            value={option.option} 
                                            readOnly 
                                            className="mt-2"
                                            isCorrect={option.isCorrect}
                                        />
                                    ))}
                                </Form.Group>
                            </Card.Body>
                        </QuestionCard>
                    ))}
                    
                    <div className="d-flex justify-content-between mt-4 mb-5">
                        <Button variant="primary" onClick={handleSubmit}>Go to Edit Page</Button>
                        <Button variant="success" onClick={handleTypeChange}>Review & Publish</Button>
                    </div>
                </Col>
            </Row>

            <Modal show={showAddfbModal} onHide={handleCloseAddfbQuestionModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Feedback Questions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Question Type:</Form.Label>
                            <Form.Control as="select" value={selectedfbType} onChange={handlefbQuestionTypeChange}>
                                <option value="">Select Question Type</option>
                                <option value="MCQ">MCQ</option>
                                <option value="Descriptive">Descriptive</option>
                            </Form.Control>
                            {errorfb.questionType && <Form.Text className="text-danger">{errorfb.questionType}</Form.Text>}
                        </Form.Group>

                        {selectedfbType && (
                            <Form.Group className="mt-3">
                                <Form.Label>Question:</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={fbQuestion.question} 
                                    onChange={(e) => handleChange(-1, 'question', e.target.value)} 
                                />
                                {errorfb.question && <Form.Text className="text-danger">{errorfb.question}</Form.Text>}
                            </Form.Group>
                        )}

                        {selectedfbType === 'MCQ' && (
                            [...Array(4)].map((_, index) => (
                                <Form.Group className="mt-3" key={index}>
                                    <Form.Label>Option {index + 1}:</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        value={fbQuestion.options[index] || ''} 
                                        onChange={(e) => handleChange(index, 'options', e.target.value)} 
                                    />
                                </Form.Group>
                            ))
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddfbQuestionModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveQuestion}>Save</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} backdrop="static" className='mt-5'>
                <Modal.Header closeButton>
                    <Modal.Title>Quiz Published</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant="success">Quiz Questions Published successfully</Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleFeedback}>Add Feedback</Button>
                    <Button variant="secondary" onClick={handleClose}>Go to course</Button>
                </Modal.Footer>
            </Modal>
        </StyledContainer>
    );
};

export default ReviewQuestions;