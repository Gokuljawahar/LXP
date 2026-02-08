import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { TiWarningOutline } from "react-icons/ti";
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
import { updatecoursefeedbackRequest } from "../../../actions/Course/Course/UpdateCourseFeedbackAction";
import { GetCourseFeedbackApi } from "../../../middleware/Course/Course/GetCourseFeedbackApi";
import GetByIDCourseFeedbackApi from "../../../middleware/Course/Course/GetByIDCourseFeedbackApi";
import DeleteCourseFeedbackApi from "../../../middleware/Course/Course/DeleteCourseFeedbackApi";
import Swal from "sweetalert2";

export const GetCourseFeedback = () => {
  const courseId = sessionStorage.getItem('courseId');
  const [coursefeedback, setGetAllfeedback] = useState();
  const [getfeedback, setGetFeedback] = useState();
  const [errors, setErrors] = useState("");
  const [showEditfbQuestionModal, setShowEditfbQuestionModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);

  const navigate = useNavigate();
  //const courseId = sessionStorage.getItem("courseId");
  const dispatch = useDispatch();
  const [editedQuestion, setEditedQuestion] = useState({
    question: "",
    questionType: "",
    options: [],
  });

  useEffect(() => {
    fetchAllCourseFeedback(courseId);
  });

  const fetchAllCourseFeedback = async (courseId) => {
    const courseFeedbackData = await GetCourseFeedbackApi(courseId);
    setGetAllfeedback(courseFeedbackData);
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
    const { courseFeedbackId, questionType, ...updatedQuestion } = editedQuestion;
    const updatedOptions = updatedQuestion.options.map((optionText) => ({ optionText }));

    const requestBody = {
      ...updatedQuestion,
      questionType: questionType,
      courseId: courseId,
      options: updatedOptions,
    };
    dispatch(updatecoursefeedbackRequest(courseFeedbackId, requestBody));
    showSuccessToast("CourseFeedback Updated Successfully");
  };

  const handleOpenEditQuestionModal = async (CourseFeedbackQuestionId) => {
    const getIdfeedback = await GetByIDCourseFeedbackApi(CourseFeedbackQuestionId);
    setGetFeedback(getIdfeedback);
    if (getIdfeedback && getIdfeedback.options) {
      setShowEditfbQuestionModal(true);
      setEditedQuestion({
        courseFeedbackId: CourseFeedbackQuestionId,
        question: getIdfeedback.question,
        questionType: getIdfeedback.questionType,
        options: getIdfeedback.options.map((options) => options.optionText),
      });
    }
  };

  const handleDeletecoursefbQuestion = async (courseFeedbackId) => {
    await DeleteCourseFeedbackApi(courseFeedbackId);
    setDeleteQuestionId(null);
    showSuccessToast("CourseFeedback Deleted Successfully");
  };

  const handleNavigate = () => {
    sessionStorage.removeItem("courseId");
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
    <Container maxWidth="lg" style={{marginBottom:'275px'}}>
      <Typography variant="h5" style={{marginBottom:'25px'}}>
        {coursefeedback ? <b style={{marginBottom:'95px'}}>COURSE FEEDBACK QUESTION</b> : <h2 style={{paddingTop:'150px'}}><img src="https://i.pinimg.com/originals/ec/c0/15/ecc015d4e89f77b435df3cd81928ad48.gif" style={{height:'90px',width:'90px'}}></img>No Feedback Available</h2>}
      
      </Typography>
      {coursefeedback &&
        coursefeedback.length > 0 &&
        coursefeedback.map((feedback, index) => (
          <Card key={index} sx={{ mb: 2, backgroundColor: '#F6F5F5', boxShadow: '0px 4px 8px #23275c', borderRadius: '20px'}}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip title="Edit Feedback">
                  <IconButton onClick={() => handleOpenEditQuestionModal(feedback.courseFeedbackQuestionId)}>
                  <FaRegEdit style={{ color: "#604CC3" }} variant="outlined" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Feedback">
                  <IconButton onClick={() => setDeleteQuestionId(feedback.courseFeedbackQuestionId)}>
                  <DeleteIcon style={{ color: "#C80036" }} />
                  </IconButton>
                </Tooltip>
              </Box>
              {deleteQuestionId === feedback.courseFeedbackQuestionId && (
                <div id="popupQuizQuestionDelete">
                  <div id="popup-contentQuizQuestionDelete" style={{width:'500px',height:'240px'}}>
                    <button id="popup-close-buttonQuizQuestionDelete" onClick={() => setDeleteQuestionId(null)}>×</button>
                    <div style={{display: 'flex', alignItems: 'center'}}><TiWarningOutline style={{ marginRight: '10px', color: 'red', fontSize: '25px' }} />
                    <h4 style={{ paddingTop: '5px' }}><b>Confirm Deletion</b></h4></div>
                    <p id='QuizQuestionDelete' style={{ marginTop: "5%" ,fontSize:'20px'}}>Are you sure you want to delete the feedback?</p>
                    <button onClick={() => handleDeletecoursefbQuestion(feedback.courseFeedbackQuestionId)} id='delete-btn' style={{ backgroundColor: '#E01950', color: 'white', borderRadius: '10px', padding: '10px 35px' }}>Delete</button>
                    <button onClick={() => setDeleteQuestionId(null)} style={{ backgroundColor: '#0F62FE', color: 'white', borderRadius: '10px', padding: '10px 35px' }}>Cancel</button>
                  </div>
                </div>
              )}
              <Typography variant="h6"><b>Question {feedback.questionNo}:</b></Typography>
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

      {coursefeedback && (
        <Button
          onClick={() => setShowAddModal(true)}
          variant="contained"
          sx={{ backgroundColor: 'blue', color: 'white', borderRadius: '10px', float: "right", mb: 2 ,padding: '10px 35px' }}
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
         
         
          <Alert severity="success" sx={{ mb: 2 }}>
            CourseFeedback Published successfully!
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
            <b>Edit Question</b>
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
          {/* {editedQuestion.options && editedQuestion.options.map((option, index) => (
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
          ))} */}
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

export default GetCourseFeedback;