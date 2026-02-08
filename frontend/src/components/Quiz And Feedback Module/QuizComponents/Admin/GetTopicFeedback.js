import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import { updatetopicfeedbackRequest } from "../../../../actions/Quiz And Feedback Module/Admin/UpdateTopicFeedbackAction";
import { GetTopicFeedbackApi } from "../../../../middleware/Quiz And Feedback Module/Admin/GetTopicFeedbackApi";
import GetByIDTopicFeedbackApi from "../../../../middleware/Quiz And Feedback Module/Admin/GetByIDTopicFeedbackApi";
import DeleteTopicFeedbackApi from "../../../../middleware/Quiz And Feedback Module/Admin/DeleteTopicFeedbackApi";
import Swal from "sweetalert2";

export const GetTopicFeedback = () => {
  const courseId = sessionStorage.getItem('courseId');
  const [topicfeedback, setGetAllfeedback] = useState();
  const [getfeedback, setGetFeedback] = useState();
  const [errors, setErrors] = useState("");
  const [showEditfbQuestionModal, setShowEditfbQuestionModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);

  const navigate = useNavigate();
  const topicId = sessionStorage.getItem("topicId");
  const dispatch = useDispatch();
  const [editedQuestion, setEditedQuestion] = useState({
    question: "",
    questionType: "",
    options: [],
  });

  useEffect(() => {
    fetchAllTopicFeedback(topicId);
  });

  const fetchAllTopicFeedback = async (topicId) => {
    const topicFeedbackData = await GetTopicFeedbackApi(topicId);
    setGetAllfeedback(topicFeedbackData);
  }

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
      default:
        break;
    }
    setErrors(tempErrors);
  };

  const handleUpdateQuestion = () => {
    const { topicFeedbackId, questionType, ...updatedQuestion } = editedQuestion;
    const updatedOptions = updatedQuestion.options.map((optionText) => ({ optionText }));

    const requestBody = {
      ...updatedQuestion,
      questionType: questionType,
      topicId: topicId,
      options: updatedOptions,
    };
    dispatch(updatetopicfeedbackRequest(topicFeedbackId, requestBody));
    showSuccessToast("TopicFeedback Updated Successfully");
  };

  const handleOpenEditQuestionModal = async (TopicFeedbackQuestionId) => {
    const getIdfeedback = await GetByIDTopicFeedbackApi(TopicFeedbackQuestionId);
    setGetFeedback(getIdfeedback);
    if (getIdfeedback && getIdfeedback.options) {
      setShowEditfbQuestionModal(true);
      setEditedQuestion({
        topicFeedbackId: TopicFeedbackQuestionId,
        question: getIdfeedback.question,
        questionType: getIdfeedback.questionType,
        options: getIdfeedback.options.map((options) => options.optionText),
      });
    }
  };

  const handleDeletetopicfbQuestion = async (topicFeedbackId) => {
    await DeleteTopicFeedbackApi(topicFeedbackId);
    setDeleteQuestionId(null);
    showSuccessToast("TopicFeedback Deleted Successfully");
  };

  const handleNavigate = () => {
    sessionStorage.removeItem("topicId");
    navigate(`/coursecontent/${courseId}`);
  };

  const showSuccessToast = (message) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      background: 'green',
      color: 'white',
      timerProgressBar: true,
    });
    Toast.fire({
      icon: "success",
      title: message,
    });
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
        {topicfeedback ? <b>Review Topic Feedback Questions</b> : <b>No Topic Feedback Questions</b>}
      </Typography>
      {topicfeedback &&
        topicfeedback.length > 0 &&
        topicfeedback.map((feedback, index) => (
          <Card key={index} sx={{ mb: 2, bgcolor: '#F9F5F6' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title="Edit Feedback">
                  <IconButton onClick={() => handleOpenEditQuestionModal(feedback.topicFeedbackQuestionId)}>
                    <EditIcon sx={{ color: "#365486" }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Feedback">
                  <IconButton onClick={() => setDeleteQuestionId(feedback.topicFeedbackQuestionId)}>
                    <DeleteIcon sx={{ color: "#C80036" }} />
                  </IconButton>
                </Tooltip>
              </Box>
              {deleteQuestionId === feedback.topicFeedbackQuestionId && (
                <div id="popupQuizQuestionDelete">
                  <div id="popup-contentQuizQuestionDelete">
                    <button id="popup-close-buttonQuizQuestionDelete" onClick={() => setDeleteQuestionId(null)}>×</button>
                    <p id='QuizQuestionDelete' style={{ marginTop: "5%" }}>Are you sure you want to delete the feedback?</p>
                    <button onClick={() => handleDeletetopicfbQuestion(feedback.topicFeedbackQuestionId)} id='delete-btn'>Delete</button>
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

      {topicfeedback && (
        <Button
          onClick={() => setShowAddModal(true)}
          variant="contained"
          sx={{ bgcolor: "#365486", color: "white", float: "right", mb: 2 }}
        >
          Submit
        </Button>
      )}

      <MuiModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        aria-labelledby="submit-modal-title"
      >
        <Box sx={modalStyle}>
          <Typography id="submit-modal-title" variant="h6" component="h2" gutterBottom>
            Confirmation
          </Typography>
          <Alert severity="success" sx={{ mb: 2 }}>
            TopicFeedback Published successfully!
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
        onClose={() => setShowEditfbQuestionModal(false)}
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
            <Button onClick={() => setShowEditfbQuestionModal(false)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleUpdateQuestion();
                setShowEditfbQuestionModal(false);
              }}
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

export default GetTopicFeedback;