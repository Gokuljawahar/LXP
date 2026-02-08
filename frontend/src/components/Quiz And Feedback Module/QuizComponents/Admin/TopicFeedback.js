import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import GetTopicFeedback from './GetTopicFeedback';
import { TopicFeedbackApi } from "../../../../middleware/Quiz And Feedback Module/Admin/TopicFeedbackApi";
import { Container } from "react-bootstrap";
import Swal from "sweetalert2";

const TopicFeedback = () => {
  const topicName = sessionStorage.getItem("topicName");
  const courseId = sessionStorage.getItem('courseId');

  const [errorfb, setErrorfb] = useState({});
  const [showAddfbModal, setShowAddfbModal] = useState(false);

  const topicId = sessionStorage.getItem("topicId");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fbQuestion, setFbQuestion] = useState({
    question: "",
    questionType: "",
    options: ["1", "2", "3", "4", "5"],
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
      topicId: topicId,
      question: fbQuestion.question,
      questionType: fbQuestion.questionType,
      options: fbQuestion.questionType === "MCQ" 
        ? fbQuestion.options.map(optionText => ({ optionText }))
        : []
    };
  
    try {
      await TopicFeedbackApi(requestBody);
      setFbQuestion({ ...fbQuestion, question: "", options: ["1", "2", "3", "4", "5"] });
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
        title: "Topic Feedback Added Successfully",
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

  const handleChange = (field, value) => {
    setFbQuestion(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handlefbQuestionTypeChange = (e) => {
    const value = e.target.value;
    setSelectedfbType(value);
    setFbQuestion(prevState => ({
      ...prevState,
      questionType: value,
    }));
  };

  const handleNavigate = () => {
    navigate(`/coursecontent/${courseId}`);
  };

  return (
    <>
      <Container fluid style={{ marginTop: '630px' }}>
        <div>
          <button
            className="btn btn-light"
            style={{
              marginLeft: "95%",
              marginTop: "-73%",
              backgroundColor: "#365486",
              color: "white",
              width: "50",
            }}
            onClick={handleNavigate}
          >
            Back
          </button>

          <div>
            <div>
              <h4 className="text" style={{ marginLeft: "3%", marginTop: "-35%" }}>
                <b>Feedback Questions for {topicName} Topic</b>
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
              <GetTopicFeedback />
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
                          onChange={(e) => handleChange("question", e.target.value)}
                          error={!!errorfb.question}
                          helperText={errorfb.question}
                        />
                        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                          This is a 5-star rating question.
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
                        onChange={(e) => handleChange("question", e.target.value)}
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
                      onClick={handleSaveQuestion}
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

export default TopicFeedback;