import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { FaTrashCan } from "react-icons/fa6";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal as MuiModal,
  IconButton,
  Tooltip,
  Alert,
  Card,
  CardContent,
  Container,
  Stack
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { updatequizfeedbackRequest } from "../../../../actions/Quiz And Feedback Module/Admin/UpdateQuizFeedbackAction";
import { deletequizfeedbackRequest } from "../../../../actions/Quiz And Feedback Module/Admin/DeleteQuizFeedbcakAction";
import { GetAllFeedbackApi } from "../../../../middleware/Quiz And Feedback Module/Admin/GetAllFeedbackApi";
import GetByIDFeedbackApi from "../../../../middleware/Quiz And Feedback Module/Admin/GetByIDFeedbackApi";
import { fetchQuizIdFailure } from "../../../../actions/Quiz And Feedback Module/Admin/FetchQuizIdAction";
import { useNavigate } from "react-router-dom";
import "../../../../Styles/Quiz And Feedback Module/QuestionTemplate.css";
import Swal from "sweetalert2";

export const GetAllFeedbacks = () => {

  const courseId = sessionStorage.getItem('courseId');
  const [getallfeedback, setGetAllfeedback] = useState();
  const [getfeedback, setGetFeedback] = useState();
  const [errorfb, setErrorfb] = useState("");
  const [showAddfbModal, setShowAddfbModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [errors, setErrors] = useState("");
  const [showEditfbQuestionModal, setShowEditfbQuestionModal] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);

  const quizId = sessionStorage.getItem("quizId");
  const topicId = sessionStorage.getItem('topicId')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fbQuestion, setFbQuestion] = useState([]);
  const [editedQuestion, setEditedQuestion] = useState({
    question: "",
    questionType: "",
    options: [],
  });

  useEffect(() => {
    fetchAllquizFeedback(quizId);
  });

  const fetchAllquizFeedback = async (quizId) => {
    const quizFeedbackData = await GetAllFeedbackApi(quizId);
    setGetAllfeedback(quizFeedbackData);
    return quizFeedbackData;
  }

  const handleCloseAddfbQuestionModal = () => {
    setShowAddfbModal(false);
  };

  const handleCloseEditQuestionModal = () => {
    setShowEditfbQuestionModal(false);
  };

  const validateField = (fieldName, value, index = null) => {
    let tempErrors = { ...errors };
    switch (fieldName) {
      case "question":
        tempErrors.question = value ? "" : "Question is required";
        break;
      case "options":
        if (index !== null) {
          if (!tempErrors.individualOptions) {
            tempErrors.individualOptions = [];
          }
          tempErrors.individualOptions[index] = value
            ? ""
            : `Option ${index + 1} is required`;
        }
        tempErrors.options = editedQuestion.options.some((option) => option)
          ? ""
          : "option is required";
        break;
      case "correctOptions":
        if (index !== null) {
          if (!tempErrors.individualCorrectOptions) {
            tempErrors.individualCorrectOptions = [];
          }
          tempErrors.individualCorrectOptions[index] = value
            ? ""
            : `Correct Option ${index + 1} is required`;
        }
        tempErrors.correctOptions = editedQuestion.correctOptions.some(
          (option) => option
        )
          ? ""
          : "correct option is required";
        break;
      default:
        break;
    }

    setErrors(tempErrors);
  };

  const handleUpdateQuestion = () => {
    const { quizFeedbackQuestionId, questionType, ...updatedQuestion } =
      editedQuestion;
    const updatedOptions = updatedQuestion.options.map((optionText, index) => ({
      optionText,
    }));

    const requestBody = {
      ...updatedQuestion,
      questionType: questionType,
      quizId: quizId,
      options: updatedOptions,
    };
    console.log("requestBody", requestBody);
    dispatch(updatequizfeedbackRequest(quizFeedbackQuestionId, requestBody));
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
      title: "QuizFeedback Updated Successfully",
      color: 'white'
    });


  };

  const validUpdatedQuestion = (event) => {
    event.preventDefault();
    handleUpdateQuestion();
    setShowEditfbQuestionModal(false);

  };

  const handleOpenEditQuestionModal = async (quizfeedbackId) => {
    console.log("handleopen", quizfeedbackId);
    const getIdfeedback = await GetByIDFeedbackApi(quizfeedbackId);
    setGetFeedback(getIdfeedback);
    console.log("edit open", getIdfeedback);
    if (getIdfeedback && getIdfeedback.options) {
      setShowEditfbQuestionModal(true);
      setEditedQuestion({
        quizFeedbackQuestionId: quizfeedbackId,
        question: getIdfeedback.question,
        questionType: getIdfeedback.questionType,
        options: getIdfeedback.options.map((option) => option.optionText),
      });
      console.log(editedQuestion);
    }
  };

  const handleDeletefbQuestion = (quizFeedbackQuestionId) => {
    dispatch(deletequizfeedbackRequest(quizFeedbackQuestionId));
    setDeleteQuestionId(null);
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
      title: "QuizFeedback Deleted Successfully",
      color: 'white'
    });
  };

  const handleNavigate = () => {
    sessionStorage.removeItem("quizId");
    sessionStorage.removeItem("topicId");
    sessionStorage.removeItem("courseId");
    navigate(`/coursecontent/${courseId}`)
    dispatch(fetchQuizIdFailure(topicId))
  }

  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  const handleTypeChange = () => {
    setShowAddModal(true);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {getallfeedback ? <b>Review Feedback Questions</b> : <b>No Feedback Questions</b>}
      </Typography>
      {getallfeedback &&
        getallfeedback.length > 0 &&
        getallfeedback.map((feedback, index) => (
          <Card key={index} sx={{ mb: 2, bgcolor: '#F9F5F6' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title="Edit Feedback">
                  <IconButton onClick={() => handleOpenEditQuestionModal(feedback.quizFeedbackQuestionId)}>
                    <EditIcon sx={{ color: "#365486" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Feedback">
                  <IconButton onClick={() => setDeleteQuestionId(feedback.quizFeedbackQuestionId)}>
                    <DeleteIcon sx={{ color: "#C80036" }} />
                  </IconButton>
                </Tooltip>
              </Box>
              {deleteQuestionId === feedback.quizFeedbackQuestionId && (
                <div id="popupQuizQuestionDelete">
                  <div id="popup-contentQuizQuestionDelete">
                    <button id="popup-close-buttonQuizQuestionDelete" onClick={() => setDeleteQuestionId(null)}>×</button>
                    <p id='QuizQuestionDelete' style={{ marginTop: "5%" }}>Are you sure you want to delete the feedback?</p>
                    <button onClick={() => handleDeletefbQuestion(feedback.quizFeedbackQuestionId)} id='delete-btn'>Delete</button>
                    <button onClick={() => setDeleteQuestionId(null)}>Cancel</button>
                  </div>
                </div>
              )}
              <Typography variant="h6">Question {feedback.questionNo}:</Typography>
              <TextField
                fullWidth
                value={feedback.question}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                {feedback.options.map((option, index) => (
                  <StarIcon key={index} sx={{ color: "#FFD700", mr: 1 }} />
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}

      {getallfeedback && (
        <Button
          onClick={handleTypeChange}
          variant="contained"
          sx={{ bgcolor: "#365486", color: "white", float: "right", mb: 2 }}
        >
          Submit
        </Button>
      )}
      <MuiModal
        open={showAddModal}
        onClose={handleCloseModal}
        aria-labelledby="submit-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="submit-modal-title" variant="h6" component="h2" gutterBottom>
            Confirmation
          </Typography>
          <Alert severity="success" sx={{ mb: 2 }}>
            QuizFeedback Published successfully!
          </Alert>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleNavigate}
              sx={{ bgcolor: "#365486", color: "white" }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </MuiModal>
      <MuiModal
        open={showEditfbQuestionModal}
        onClose={handleCloseEditQuestionModal}
        aria-labelledby="edit-question-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="edit-question-modal-title" variant="h6" component="h2" gutterBottom>
            Edit Question
          </Typography>
          <TextField
            fullWidth
            label="Question"
            variant="outlined"
            value={editedQuestion.question}
            onChange={(e) => {
              setEditedQuestion({
                ...editedQuestion,
                question: e.target.value,
              });
              validateField("question", e.target.value);
            }}
            error={!!errors.question}
            helperText={errors.question}
            sx={{ mb: 2 }}
          />
          {editedQuestion.options && editedQuestion.options.map((option, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Option ${index + 1}`}
              variant="outlined"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...editedQuestion.options];
                updatedOptions[index] = e.target.value;
                setEditedQuestion({
                  ...editedQuestion,
                  options: updatedOptions,
                });
                validateField("options", e.target.value, index);
              }}
              error={!!errors.individualOptions && !!errors.individualOptions[index]}
              helperText={errors.individualOptions && errors.individualOptions[index]}
              sx={{ mb: 2 }}
            />
          ))}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleCloseEditQuestionModal} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={validUpdatedQuestion}
              sx={{ bgcolor: "#365486", color: "white" }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </MuiModal>
    </Container>
  );
};

export default GetAllFeedbacks;