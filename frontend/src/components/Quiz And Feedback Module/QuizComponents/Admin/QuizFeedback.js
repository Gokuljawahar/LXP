import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import "../../../../Styles/Quiz And Feedback Module/CreateQuiz.css";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import {
  Modal as MuiModal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Rating
} from '@mui/material';
import GetAllFeedbacks from "./GetAllFeedbacks";
import { QuizFeedbackApi } from "../../../../middleware/Quiz And Feedback Module/Admin/QuizFeedbackApi";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";

export const QuizFeedback = () => {
  const quizName = sessionStorage.getItem("quizName");
  const courseId = sessionStorage.getItem('courseId');

  console.log("name", quizName);
  const [getallfeedback, setGetAllfeedback] = useState();
  const [errorfb, setErrorfb] = useState("");
  const [loading, setLoading] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddfbModal, setShowAddfbModal] = useState(false);

  const quizId = sessionStorage.getItem("quizId");
  console.log("quiz feed", quizId);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fbQuestion, setFbQuestion] = useState({
    question: "",
    questionType: "",
    options: ["", "", "", "", "", "", "", ""],
  });
  const [selectedfbType, setSelectedfbType] = useState("");


  const handleSaveQuestion = async () => {
    let tempfbErrors = { question: "", questionType: "" };
  
    if (!fbQuestion.question) {
      tempfbErrors.question = "Question is required";
    }
    if (!fbQuestion.questionType) {
      tempfbErrors.questionType = "Question type is required";
    }
  
    setErrorfb(tempfbErrors);
  
    if (tempfbErrors.question || tempfbErrors.questionType) {
      return;
    }
  
    const requestBody = {
      quizId: quizId,
      question: fbQuestion.question,
      questionType: fbQuestion.questionType,
      options: fbQuestion.questionType === "MCQ" 
        ? [
            { optionText: "1" },
            { optionText: "2" },
            { optionText: "3" },
            { optionText: "4" },
            { optionText: "5" }
          ]
        : []
    };
  
    try {
      await QuizFeedbackApi(requestBody);
      setFbQuestion({ ...fbQuestion, question: "", options: [] });
      handleCloseAddfbQuestionModal();
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
        title: "QuizFeedback Added Successfully",
        color: 'white'
      });
    } catch (error) {
      console.log(error)
    }
  };

  const handleOpenAddfbQuestionModal = () => {
    setShowAddfbModal(true);
  };

  const handleCloseAddfbQuestionModal = () => {
    setShowAddfbModal(false);

  };
  const handleChange = (index, field, value) => {
    const updatedoptions = [...fbQuestion.options];
    updatedoptions[index] = value;
    setFbQuestion({ ...fbQuestion, options: updatedoptions });

    setFbQuestion((prevState) => ({
      ...prevState,
      [field]:
        index === -1
          ? value
          : [
            ...prevState[field].slice(0, index),
            value,
            ...prevState[field].slice(index + 1),
          ],
    }));
  };

  const handlefbQuestionTypeChange = (e) => {
    const value = e.target.value;
    setSelectedfbType(value);
    setFbQuestion((prevState) => ({
      ...prevState,
      questionType: value,
      options: [],
    }));
  };

  const handleNavigate = () => {
    navigate(`/reviewquestions`);
  };



  return (
    <>
      <Container fluid style={{ marginTop: '630px' }}>
        <div>
          <button
            class="btn btn-light"
            style={{
              marginLeft: "95%",
              marginTop: "-73%",
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

          <div>
            <div>
              <h4 className="text" style={{ marginLeft: "3%", marginTop: "-35%" }}>
                <b>Feedback Questions for {quizName} Quiz</b>
              </h4>
              <button
                onClick={handleOpenAddfbQuestionModal}
                className="btn btn-light mt-3 mb-5 float-right"
                style={{
                  backgroundColor: "#365486",
                  color: "white",
                  marginLeft: "43%",
                }}
              >
                Add Feedback Questions
              </button>
              <GetAllFeedbacks />
              <MuiModal
                open={showAddfbModal}
                onClose={handleCloseAddfbQuestionModal}
                aria-labelledby="add-feedback-modal-title"
              >
                <Box sx={{
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
                }}>
                  <Typography id="add-feedback-modal-title" variant="h6" component="h2" gutterBottom>
                    Add Feedback Questions
                  </Typography>

                  <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 2 }}>
                    <FormControl fullWidth margin="normal" error={!!errorfb.questionType}>
                      <InputLabel id="question-type-label">Question Type</InputLabel>
                      <Select
                        labelId="question-type-label"
                        value={selectedfbType}
                        onChange={handlefbQuestionTypeChange}
                        label="Question Type"
                      >
                        <MenuItem value="">Select Question Type</MenuItem>
                        <MenuItem value="MCQ">Rating</MenuItem>
                        <MenuItem value="Descriptive">Descriptive</MenuItem>
                      </Select>
                      {errorfb.questionType && <Typography color="error">{errorfb.questionType}</Typography>}
                    </FormControl>

                    {selectedfbType === "MCQ" && (
                      <>
                        <TextField
                          fullWidth
                          margin="normal"
                          label="Rating Question"
                          variant="outlined"
                          value={fbQuestion.question}
                          onChange={(e) => handleChange(-1, "question", e.target.value)}
                          error={!!errorfb.question}
                          helperText={errorfb.question}
                        />
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                          This a 5-star rating question.
                        </Typography>
                        <Rating
                        name="star-rating"
                        max={5}
                        readOnly
                        />
                      </>
                    )}

                    {selectedfbType === "Descriptive" && (
                      <TextField
                        fullWidth
                        margin="normal"
                        label="Question"
                        variant="outlined"
                        value={fbQuestion.question}
                        onChange={(e) => handleChange(-1, "question", e.target.value)}
                        error={!!errorfb.question}
                        helperText={errorfb.question}
                      />
                    )}
                  </Box>

                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleCloseAddfbQuestionModal} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        handleSaveQuestion();
                      }}
                    >
                      Save
                    </Button>
                  </Box>
                </Box>
              </MuiModal>

            </div>
          </div>
        </div>

      </Container>
    </>
  );
}
export default QuizFeedback;