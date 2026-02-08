import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaPlus, FaFileExcel, FaInfoCircle } from "react-icons/fa";
import { Button, Container, Row, Col } from 'react-bootstrap';
import Swal from "sweetalert2";
import { Modal as MuiModal, Box, Typography, TextField, Button as MuiButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { fetchQuizIdRequest } from "../../../../actions/Quiz And Feedback Module/Admin/FetchQuizIdAction";
import { BulkUploadQuestion, PostSingleQuestion } from '../../../../middleware/Quiz And Feedback Module/Admin/QuestionApi';
import Exceltemplate from "../../../../assets/Quiz And Feedback Module/ExcelTemplate/Bulk upload format.xlsx";
import { FormHelperText } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { IconButton, Stack, Tooltip } from '@mui/material';    // modification for  imports quizteam 

const PageWrapper = styled(Container)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  margin: auto;
`;

const DropZone = styled(motion.div)`
  border: 3px dashed #365486;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f4f8;
  }
`;

const StyledButton = styled(motion.button)`
  background-color: #365486;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2a4268;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const FileList = styled(motion.ul)`
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
`;

const FileItem = styled(motion.li)`
  background-color: #f0f4f8;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UploadBulkQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const inputRef = useRef();
  const topicId = sessionStorage.getItem("topicId");
  const quizId = useSelector((state) => state.quizId.quizId);
  const allowedFileTypes = [".xlsx"];
  const [errors, setErrors] = useState("");
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [numCorrectOptions, setNumCorrectOptions] = useState(2);
  const [numOptions, setNumOptions] = useState(5);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [addedQuestions, setAddedQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    question: "",
    questionType: "",
    options: ["", "", "", "", "", "", "", ""],
    correctOptions: ["", "", ""],
  });


  useEffect(() => {
    dispatch(fetchQuizIdRequest(topicId));
  }, [dispatch, topicId]);

  const handleFileChange = (event) => {
    event.preventDefault();
    console.log("file",event.target.files);
    const newFiles = Array.from(event.target.files);
    
    validateFiles(newFiles);
    // Reset the file input value to allow selecting the same file again
    event.target.value = null;
  };

  const validateFiles = (newFiles) => {
    const invalidFiles = newFiles.filter(
      (file) => !allowedFileTypes.some((type) => file.name.endsWith(type))
    );

    if (invalidFiles.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid File Type',
        text: `Please select only .xlsx files. Invalid files: ${invalidFiles.map(f => f.name).join(", ")}`,
      });
    } else {
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    validateFiles(Array.from(event.dataTransfer.files));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileUpload = async () => {
    try {
      console.log("sent file",files, quizId);
        await BulkUploadQuestion(files, quizId);
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
          title: "Bulk Uploaded Successfully",
          color: 'white'
        });
        setTimeout(function () {
          navigate(`/createquiz`);
        }, 2000);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'There was an error uploading the questions. Please try again.',
      });
    }
  };

  const handleOpenAddQuestionModal = () => {
    setShowAddQuestionModal(true);
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleQuestionTypeChange = (e) => {
    const value = e.target.value;
    setSelectedQuestionType(value);
    setNewQuestion((prevState) => ({
      ...prevState,
      questionType: value,
      options: [],
      correctOptions: [],
    }));
  };

  const handleSaveQuestion = (isSaveAll = false) => {
    let tempErrors = {
      question: "",
      questionType: "",
      options: "",
      correctOptions: "",
    };

    let hasCorrectOption = false;
    if (newQuestion.questionType === "MCQ" || newQuestion.questionType === "T/F") {
      hasCorrectOption = !!newQuestion.correctOptions[0];
    } else {
      hasCorrectOption = newQuestion.correctOptions.some((option) => option);
    }

    if (!newQuestion.question) {
      tempErrors.question = "Question is required";
    }
    if (!newQuestion.questionType) {
      tempErrors.questionType = "Question type is required";
    }
    if (newQuestion.options.length === 0) {
      tempErrors.options = "At least one option is required";
    }

    if (
      tempErrors.question ||
      tempErrors.questionType ||
      tempErrors.options ||
      !hasCorrectOption
    ) {
      tempErrors.correctOptions = "Correct option is required";
      setErrors(tempErrors);
      return;
    }

    const newQuestionData = {
      question: newQuestion.question,
      questionType: newQuestion.questionType,
      options: newQuestion.options.map((option, index) => ({
        option: option,
        isCorrect:
          newQuestion.questionType === "MCQ" || newQuestion.questionType === "T/F"
            ? newQuestion.correctOptions[0] === option
            : newQuestion.correctOptions.includes(option),
      })),
    };
  
    if (isSaveAll) {
      // Include the current question along with previously added questions
      const allQuestions = [...addedQuestions, newQuestionData];
      
      // Post all questions including the current one
      allQuestions.forEach(question => {
        const questionBody = {
          quizId: quizId,
          question: question.question,
          questionType: question.questionType,
          options: question.options
        };
        PostSingleQuestion(questionBody);
      });
  
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Questions Saved',
        text: 'All questions have been successfully saved.',
        timer: 2000,
        showConfirmButton: false,
      });
  
      // Clear added questions and close modal
      setAddedQuestions([]);
      handleCloseAddQuestionModal();
      navigate('/createquiz');
    } else {
      // Add the current question to addedQuestions
      setAddedQuestions(prevQuestions => [...prevQuestions, newQuestionData]);
  
      // Reset form for next question
      setNewQuestion({
        question: "",
        questionType: "",
        options: ["", "", "", "", "", "", "", ""],
        correctOptions: ["", "", ""]
      });
      setSelectedQuestionType("");
      setNumOptions(5);
      setNumCorrectOptions(2);
      setErrors({});
    }
  };

  const handleCloseAddQuestionModal = () => {
    setShowAddQuestionModal(false);
  };

  const handleChange = (index, field, value) => {
    if (field === "correctOptions") {
      setNewQuestion((prevState) => ({
        ...prevState,
        correctOptions: [
          ...prevState.correctOptions.slice(0, index),
          value,
          ...prevState.correctOptions.slice(index + 1),
        ],
      }));
    } else {
      setNewQuestion((prevState) => ({
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
    }
  };

  const handleAddCorrectOption = () => {
    if (numCorrectOptions < 3) {
      setNumCorrectOptions(numCorrectOptions + 1);
      setNewQuestion((prevState) => ({
        ...prevState,
        correctOptions: [...prevState.correctOptions, ""],
      }));
    }
  };

  const handleRemoveCorrectOption = (index) => {
    if (numCorrectOptions > 1) {
      setNumCorrectOptions(numCorrectOptions - 1);
      const updatedCorrectOptions = [...newQuestion.correctOptions];
      updatedCorrectOptions.splice(index, 1);
      setNewQuestion((prevState) => ({
        ...prevState,
        correctOptions: updatedCorrectOptions,
      }));
    }
  };

  const handleAddOption = () => {
    if (numOptions < 8) {
      setNumOptions(numOptions + 1);
      setNewQuestion((prevState) => ({
        ...prevState,
        options: [...prevState.options, ""],
      }));
    }
  };

  const handleRemoveOption = (index) => {
    if (numOptions > 5) {
      setNumOptions(numOptions - 1);
      const updatedOptions = [...newQuestion.options];
      updatedOptions.splice(index, 1);
      setNewQuestion((prevState) => ({
        ...prevState,
        options: updatedOptions,
      }));
    }
  };

  return (
    <div>

      <PageWrapper>
        <div style={{ display: 'block', margin: 'auto' }}>
          <div className="d-flex justify-content-end" style={{ marginBottom: 10 }}>
            <button class="btn btn-light" style={{ color: "white", width: '50', backgroundColor: "#365486" }} onClick={() => { navigate('/createquiz') }}>Back</button>
          </div>

          <div style={{ width: 700 }}>
            <Card
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="">Upload Quiz Questions</h3>
              <DropZone
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => inputRef.current.click()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaCloudUploadAlt size={50} color="#365486" className="mb-3" />
                <h4>Drag and Drop Files to Upload</h4>
                <p>or</p>
                <StyledButton as="label" htmlFor="file-input" onClick={()=>{debugger}}>
                  Browse Files
                </StyledButton>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  hidden
                  ref={inputRef}
                />
              </DropZone>

              <AnimatePresence>
                {files.length > 0 && (
                  <FileList>
                    {files.map((file, index) => (
                      <FileItem
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span><FaFileExcel className="me-2" />{file.name}</span>
                        <Button variant="outline-danger" size="sm" onClick={() => removeFile(index)}>Remove</Button>
                      </FileItem>
                    ))}
                  </FileList>
                )}
              </AnimatePresence>

              <Row className="mt-4">
                <Col>
                  <StyledButton
                    onClick={handleFileUpload}
                    disabled={files.length === 0}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Upload Files
                  </StyledButton>
                </Col>
                <Col className="text-end">
                  <StyledButton
                    onClick={handleOpenAddQuestionModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPlus className="me-2" />
                    Add Individual Question
                  </StyledButton>
                </Col>
              </Row>

              <div className="mt-4 text-center">
                <a href={Exceltemplate} download="Bulk upload template" className="text-decoration-none">
                  <Button variant="outline-secondary">
                    <FaInfoCircle className="me-2" />
                    Download Question Format
                  </Button>
                </a>
              </div>
            </Card>
          </div>
        </div>
        <MuiModal
          open={showAddQuestionModal}
          onClose={handleCloseAddQuestionModal}
          aria-labelledby="add-question-modal-title"
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
            <Typography id="add-question-modal-title" variant="h6" component="h2" gutterBottom>
              Add Multiple Questions
            </Typography>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 2 }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="added-questions-label">Added Questions</InputLabel>
                <Select
                  labelId="added-questions-label"
                  value=""
                  onChange={(e) => {
                    // You can add logic here to edit the selected question if needed
                  }}
                  label="Added Questions"
                >
                  <MenuItem value="">Select a question to view/edit</MenuItem>
                  {addedQuestions.map((q, index) => (
                    <MenuItem key={index} value={index}>
                      {q.question.substring(0, 50)}...
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal" error={!!errors.questionType}>
                <InputLabel id="question-type-label">Question Type</InputLabel>
                <Select
                  labelId="question-type-label"
                  value={selectedQuestionType}
                  onChange={handleQuestionTypeChange}
                  label="Question Type">
                  <MenuItem value="">Select Question Type</MenuItem>
                  <MenuItem value="MSQ">Multiple Select Question (MSQ)</MenuItem>
                  <MenuItem value="MCQ">Multiple Choice Question (MCQ)</MenuItem>
                  <MenuItem value="T/F">True/False (T/F)</MenuItem>
                </Select>
                {errors.questionType && <FormHelperText>{errors.questionType}</FormHelperText>}
              </FormControl>

              {selectedQuestionType && (
                <TextField
                  fullWidth
                  margin="normal"
                  label="Question"
                  variant="outlined"
                  value={newQuestion.question}
                  onChange={(e) => handleChange(-1, "question", e.target.value)}
                  error={!!errors.question}
                  helperText={errors.question}
                />
              )}

              {selectedQuestionType === "MSQ" && (
                <>
                  {[...Array(numOptions)].map((_, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TextField
                        fullWidth
                        margin="normal"
                        label={`Option ${index + 1}`}
                        variant="outlined"
                        value={newQuestion.options[index] || ""}
                        onChange={(e) => handleChange(index, "options", e.target.value)}
                        error={!!errors.options}
                        helperText={errors.options}
                      />
                      {index >= 5 && (
                        <IconButton
                          onClick={() => handleRemoveOption(index)}
                          sx={{ ml: 1, bgcolor: 'error.main', color: 'white', '&:hover': { bgcolor: 'error.dark' } }}
                        >
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                  <Button
                    variant="contained"
                    className='btn-primary'
                    startIcon={<AddIcon />}
                    onClick={handleAddOption}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Add Option
                  </Button>

                  {[...Array(numCorrectOptions)].map((_, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <FormControl fullWidth margin="normal">
                        <InputLabel id={`correct-option-${index}-label`}>Correct Option {index + 1}</InputLabel>
                        <Select
                          labelId={`correct-option-${index}-label`}
                          value={newQuestion.correctOptions[index] || ""}
                          onChange={(e) => handleChange(index, "correctOptions", e.target.value)}
                          label={`Correct Option ${index + 1}`}
                        >
                          <MenuItem value="">Select Correct Option</MenuItem>
                          {newQuestion.options.map((option, optionIndex) => (
                            <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {index >= 1 && (
                        <IconButton
                          onClick={() => handleRemoveCorrectOption(index)}
                          sx={{ ml: 1, bgcolor: 'error.main', color: 'white', '&:hover': { bgcolor: 'error.dark' } }}
                        >
                          <RemoveIcon />
                        </IconButton>
                      )}
                    </Box>
                  ))}
                  <Button
                    className='btn-primary'
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAddCorrectOption}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Add Correct Option
                  </Button>
                </>
              )}

              {selectedQuestionType === "MCQ" && (
                <>
                  {[...Array(4)].map((_, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      margin="normal"
                      label={`Option ${index + 1}`}
                      variant="outlined"
                      value={newQuestion.options[index] || ""}
                      onChange={(e) => handleChange(index, "options", e.target.value)}
                      error={!!errors.options}
                      helperText={errors.options}
                    />
                  ))}
                  <FormControl fullWidth margin="normal" error={!!errors.correctOptions}>
                    <InputLabel id="mcq-correct-option-label">Correct Option</InputLabel>
                    <Select
                      labelId="mcq-correct-option-label"
                      value={newQuestion.correctOptions[0] || ""}
                      onChange={(e) => handleChange(0, "correctOptions", e.target.value)}
                      label="Correct Option"
                    >
                      <MenuItem value="">Select Correct Option</MenuItem>
                      {newQuestion.options.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                    {errors.correctOptions && <FormHelperText>{errors.correctOptions}</FormHelperText>}
                  </FormControl>
                </>
              )}

              {selectedQuestionType === "T/F" && (
                <>
                  {[...Array(2)].map((_, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      margin="normal"
                      label={`Option ${index + 1}`}
                      variant="outlined"
                      value={newQuestion.options[index] || ""}
                      onChange={(e) => handleChange(index, "options", e.target.value)}
                      error={!!errors.options}
                      helperText={errors.options}
                    />
                  ))}
                  <FormControl fullWidth margin="normal" error={!!errors.correctOptions}>
                    <InputLabel id="tf-correct-option-label">Correct Option</InputLabel>
                    <Select
                      labelId="tf-correct-option-label"
                      value={newQuestion.correctOptions[0] || ""}
                      onChange={(e) => handleChange(0, "correctOptions", e.target.value)}
                      label="Correct Option"
                    >
                      <MenuItem value="">Select Correct Option</MenuItem>
                      {newQuestion.options.map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                    {errors.correctOptions && <FormHelperText>{errors.correctOptions}</FormHelperText>}
                  </FormControl>
                </>
              )}
            </Box>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCloseAddQuestionModal} sx={{ mr: 1 }}>
                Cancel
              </Button>
              {selectedQuestionType && (
                <Button
                variant="contained"
                color="primary"
                onClick={() => handleSaveQuestion(false)}
                sx={{ mr: 1 }}
              >
                Add Another Question
              </Button>
              )}
              
              {selectedQuestionType && (
                <Button
                variant="contained"
                color="secondary"
                onClick={() => handleSaveQuestion(true)}
              >
                Finish and Save All
              </Button>
              )}
            </Box>
          </Box>
        </MuiModal>
      </PageWrapper>
    </div>
  );
};

export default UploadBulkQuiz;