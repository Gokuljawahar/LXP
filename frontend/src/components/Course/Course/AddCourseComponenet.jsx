import React, { useState, useEffect } from "react";
// import "../../../style/Course/Course/AddCourse.css";
import "../../../Styles/Course/Course/AddCourse.css";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Modal,
  Image,
  CloseButton,
  CardHeader,
} from "react-bootstrap";
import { useDispatch, connect, useSelector } from "react-redux";
// import {
//   createCoursesRequest,
//   createCoursesSuccess,
//   fetchLevelRequest,
// } from "../../../action/Course/Course/AddCourseAction"; // Assuming this is your action creator

import {
  createCoursesRequest,
  createCoursesSuccess,
  fetchLevelRequest,
  RESET_EXISTEDCOURSE_MESSAGE,
  RESET_SUCCESSCOURSE_MESSAGE,
} from "../../../actions/Course/Course/AddCourseAction";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../../utils/Course/Course/AddCourseValidation";
// import { createCategoryrequest } from "../../../action/Course/Category/AddCategoryAction";
import {
  createCategoryrequest,
  RESET_THE_SUBMITTED_MESSGAE,
  RESET_EXISTED_MESSAGE,
} from "../../../actions/Course/Category/AddCategoryAction";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  TextField,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Alert,
  Stack,
  Box,
  MenuItem,
  FormControl,
  FormHelperText,
  CardContent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { validateCategory } from "../../../utils/Course/Course/AddCourseValidation";
// import { fetchCategoryRequest } from "../../../action/Course/Category/FetchCategoryAction";
import { fetchCategoryRequest } from "../../../actions/Course/Category/FetchCategoryAction";
import Swal from "sweetalert2";

const AddCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coursecategory, setCategory] = useState([]);
  const [courselevel, setLevel] = useState([]);
  const [categoryErrors, setCategoryErrors] = useState({});
  const [category, setAddCategory] = useState({
    category: "",
    createdBy: "Asha",
  });
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    title: "",
    level: "",
    category: "",
    description: "",
    createdby: "Asha",
    duration: "",
    thumbnailimage: null,
  });
  //If course is created then navigate to course creation  page\
  const courseid = useSelector((state) => state.addcourse.course_id);
  const [cduration, setCDuration] = useState(0);

  //  const isSubmits = useSelector((state) => state.addcourse);
  const isSubmit = useSelector((state) => state.addcourse.isSubmitted);
  //  const CourseId= useSelector((state)=>state.AddCourse.course_id)
  //  console.log("checkcoursecontent",isSubmits);
  useEffect(() => {
    if (isSubmit) {
      // console.log("oppp",courseid);
      // const courseid = useSelector((state) => state.addcourse.course_id);
      dispatch({ type: RESET_SUCCESSCOURSE_MESSAGE });
      navigate(`/coursecontent/${courseid}`); // Navigate to the next page on success
    }
  }, [isSubmit, navigate]);
  //success message for adding category
  const addCategorySuccessState = useSelector(
    (state) => state.addCategory.isSuccess
  );
  const addCategoryFailureState = useSelector(
    (state) => state.addCategory.isFailure
  );
  //   const categorySuccessMsg=useSelector((state)=>state.addCategory.message)
  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    if (addCategorySuccessState) {
      handleClose();

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Category added successfully",
      });
      dispatch({ type: RESET_THE_SUBMITTED_MESSGAE });

      // setSuccessMsg('Category added successfully');

      // const timer = setTimeout(() => {
      //   setSuccessMsg('');
      // }, 7000);

      // // Clear the timeout if the component unmounts
      // return () => clearTimeout(timer);
    }
  }, [addCategorySuccessState]);
  const [failurMsg, setFailureMsg] = useState("");
  useEffect(() => {
    if (addCategoryFailureState) {
      handleClose();
      // setFailureMsg('Category already exists');
      // const timer = setTimeout(() => {
      //   setFailureMsg('');
      // }, 7000);

      // // Clear the timeout if the component unmounts
      // return () => clearTimeout(timer);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Category already exists",
      });
      dispatch({ type: RESET_EXISTED_MESSAGE });
    }
  }, [addCategoryFailureState]);

  const [servererror, setserverrError] = useState("");
  const InternalError = useSelector((state) => state.addCategory.isError);
  useEffect(() => {
    if (InternalError) {
      handleClose();
      // setserverrError('Internal Server error occured');
      // const timer = setTimeout(() => {
      //   setserverrError('');
      // }, 7000);

      // // Clear the timeout if the component unmounts
      // return () => clearTimeout(timer);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Internal Server error occured",
      });
    }
  }, [InternalError]);

  //If course is already exists
  const isExist = useSelector((state) => state.addcourse.isExists);
  console.log("isEx", isExist);

  const [existMsg, setExistMsg] = useState("");
  useEffect(() => {
    if (isExist) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "warning",
        title: "Course already exists",
      });
      dispatch({ type: RESET_EXISTEDCOURSE_MESSAGE });
    }
  }, [isExist]);

  //if internal message occurs for creating course
  const [failure, setFailure] = useState("");
  const isFailure = useSelector((state) => state.course.isError);
  useEffect(() => {
    if (isFailure) {
      // setFailure('Internal Server error occured');
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Internal Server error occured",
      });
    }
  }, [isFailure]);

  const fetchCategory = useSelector((state) => state.category.courses);

  const fetchLevel = useSelector((state) => state.level.courses);

  const fetchData = async () => {
    // try {
    //   const categoryResponse = await axios.get(
    //     "http://localhost:5199/lxp/course/category"
    //   );
    //   setCategory(categoryResponse.data.data);
    //   const levelResponse = await axios.get(
    //     "http://localhost:5199/lxp/course/courselevel/ash"
    //   );
    //   setLevel(levelResponse.data.data);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
    dispatch(fetchCategoryRequest());
  };
  useEffect(() => {
    fetchData();
    dispatch(fetchLevelRequest());
  }, []);

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAddCategory("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = validateForm(course, setErrors);

    if (isFormValid) {
      try {
        console.log("form", course);
        dispatch(createCoursesRequest(course));
      } catch (error) {
        console.error("Error creating course:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
    //  setCourse({ ...course, [e.target.name]: e.target.value });
    if (name === "category" && value === "Add category") {
      // Show modal for adding a new category
      handleClickOpen();
    }
  };
  const handleInputCategory = (e) => {
    setAddCategory({ ...category, [e.target.name]: e.target.value });
  };
  // const handleCategory = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log("category add", category);
  //     dispatch(createCategoryrequest(category));

  //   } catch (error) {
  //     window.alert("Error occured in adding category", error);
  //   }
  // };

  const handleCategory = async (e) => {
    e.preventDefault();
    const isCategoryValid = validateCategory(category, setCategoryErrors);

    if (isCategoryValid) {
      // fetchData();
      handleClose(); // This will close the modal

      try {
        console.log("category add", category);
        dispatch(createCategoryrequest(category));
      } catch (error) {
        window.alert("Error occurred in adding category", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]); // Dependency array with category to re-run fetchData when category changes

  const handleThumbnailChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setCourse((prevCourse) => ({
        ...prevCourse,
        thumbnailimage: event.target.files[0],
      }));
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const removeThumbnail = () => {
    setSelectedImage(null);
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Handle the files
    const file = acceptedFiles[0];
    // Create a URL for the file
    const fileUrl = URL.createObjectURL(file);
    setSelectedImage(fileUrl);
    handleThumbnailChange({ target: { files: [file] } });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const [progress, setProgress] = useState(1);
  const percentage = Math.round((progress / 6) * 100);

  const containerStyles = {
    height: 5,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    // marginLeft:'10px'

    //margin: 50,
  };

  const fillerStyles = {
    height: "100%",
    width: `${percentage}%`,
    backgroundColor: "blue", // Change this color as needed
    borderRadius: "inherit",
    textAlign: "right",
    // marginLeft:'10px'
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };
  const [step, setStep] = useState(1);
  const handleContinue = () => {
    // const isFormValid = alidateForm(course, setErrors);

    // if (isFormValid) {
    setProgress(progress + 1);

    setStep(step + 1);
    // }else{

    //   setErrors({})

    // }
  };
  const handlePrevious = () => {
    setProgress(progress - 1);
    setStep(step - 1);
  };

  return (
    <>
      <Container style={{ background: "white" }}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Row
              className="mt-5"
              style={{
                boxShadow: "1px 2px 9px #F0F0F0",
                height: "60px",
                marginLeft: "10px",
              }}
            >
              <h6 style={{ paddingTop: "20px", fontWeight: "bold" }}>
                Step {progress} of 6
              </h6>
              <Row style={containerStyles} className="mt-1">
                <Row style={fillerStyles}>
                  <span style={labelStyles}>{`${percentage}%`}</span>
                </Row>
              </Row>
            </Row>

            <Row
              style={{ height: "70vh" }}
              className="mt-1 d-flex justify-content-center align-items-center"
            >
              {/* <Col></Col> */}

              {step == 1 && (
                <Row className="d-flex justify-content-center align-items-center">
                  <h1 className="mb-3 d-flex justify-content-center align-items-center">
                    How about a Course title
                  </h1>
                  <h6 className="mb-5 d-flex justify-content-center align-items-center">
                    It's ok if you can't think of a good title now. You can
                    change it later.
                  </h6>
                  <Col></Col>
                  <Col>
                    <FormControl className="mt-3" fullWidth>
                      {/* <Form.Label>Course Title</Form.Label> */}
                      <TextField
                        type="text"
                        name="title"
                        placeholder="eg : Learn Reactjs from scratch"
                        label="Course title"
                        fullWidth
                        autoFocus
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                        value={course.title}
                        onChange={handleInputChange}
                      />
                      {/* {errors.title && <p className="error">{errors.title}</p>} */}
                    </FormControl>
                  </Col>
                  <Col></Col>
                </Row>
              )}
              {step == 2 && (
                <Row className="d-flex justify-content-center align-items-center">
                  <h1 className="mb-3 d-flex justify-content-center align-items-center">
                    What category best fits the knowledge you'll share?
                  </h1>
                  <h6 className="mb-5 d-flex justify-content-center align-items-center">
                    If you're not sure about the right category, you can change
                    it later.You can add new category also.
                  </h6>
                  <Col></Col>
                  <Col>
                    <FormControl className="mt-3" fullWidth>
                      <TextField
                        select
                        name="category"
                        onChange={handleInputChange}
                        fullWidth
                        label="Course Catagory"
                        placeholder="Select Catagory"
                        error={Boolean(errors.category)}
                        helperText={errors.category}
                      >
                        {/* <b>Select Category</b> */}
                        {fetchCategory.map((category) => (
                          <MenuItem
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.category}
                          </MenuItem>
                        ))}
                        <MenuItem
                          value="Add category"
                          style={{ color: "#050C9C" }}
                        >
                          + Add Category
                        </MenuItem>
                      </TextField>
                    </FormControl>
                  </Col>
                  <Col></Col>
                </Row>
              )}
              {step == 3 && (
                <Row className="d-flex justify-content-center align-items-center">
                  <h1 className="mb-3 d-flex justify-content-center align-items-center">
                    What level best fits the knowledge you'll share?
                  </h1>
                  <h6 className="mb-5 d-flex justify-content-center align-items-center">
                    If you're not sure about the right category, you can change
                    it later.
                  </h6>
                  <Col></Col>
                  <Col>
                    <FormControl className="mb-3" fullWidth>
                      <TextField
                        name="level"
                        select
                        onChange={handleInputChange}
                        label="Course Level"
                        fullWidth
                        error={Boolean(errors.level)}
                        helperText={errors.level}
                        placeholder="Select Level"
                      >
                        {/* <MenuItem>Select Level</MenuItem> */}
                        {fetchLevel.map((level) => (
                          <MenuItem key={level.levelId} value={level.levelId}>
                            {level.level}
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Col>
                  <Col></Col>
                </Row>
              )}
              {step == 4 && (
                <Row className="d-flex justify-content-center align-items-center">
                  <h1 className="mb-3 d-flex justify-content-center align-items-center">
                    Choose your course duration
                  </h1>
                  <h6 className="mb-5 d-flex justify-content-center align-items-center">
                    If you're not sure about the course duration, you can change
                    it later.
                  </h6>
                  <Col></Col>
                  <Col>
                    <FormControl className="mb-3" fullWidth>
                      {/* <TextField
   margin="dense"
   id="name"
   label="Course Duration (in hrs)"
   fullWidth
   type="time"
   helperText={errors.duration}
   error={Boolean(errors.duration)}
  
   placeholder="CourseDuration (in hrs)"
   name="duration"
   value={course.duration}
   onChange={handleInputChange}
 /> */}
                      {/* <TextField name="duration" select onChange={handleInputChange} label="Course duration" fullWidth error={Boolean(errors.duration)} helperText={errors.duration} placeholder="Select Level">
                      <MenuItem>Select Duration</MenuItem>

                      <MenuItem value="01:00:00">
                        1 hour
                      </MenuItem>
                      <MenuItem value="02:00:00">
                        2 hour
                      </MenuItem>
                      <MenuItem value="03:00:00">
                        3 hour
                      </MenuItem>
                      <MenuItem value="04:00:00">
                        4 hour
                      </MenuItem>
                      <MenuItem value="05:00:00">
                        5 hour
                      </MenuItem>
                      <MenuItem value="06:00:00">
                        6 hour
                      </MenuItem>
                      <MenuItem value="07:00:00">
                        7 hour
                      </MenuItem>
                      <MenuItem value="08:00:00">
                        8 hour
                      </MenuItem>
                      <MenuItem value="09:00:00">
                        9 hour
                      </MenuItem>
                      <MenuItem value="10:00:00">
                        10 hour
                      </MenuItem>
                      <MenuItem value="11:00:00">
                        11 hour
                      </MenuItem>
                      <MenuItem value="12:00:00">
                        12 hour
                      </MenuItem>
                      <MenuItem value="13:00:00">
                        13 hour
                      </MenuItem>
                      <MenuItem value="14:00:00">
                        14 hour
                      </MenuItem>
                      <MenuItem value="15:00:00">
                        15 hour
                      </MenuItem>
                      <MenuItem value="16:00:00">
                        16 hour
                      </MenuItem>
                      <MenuItem value="17:00:00">
                        17 hour
                      </MenuItem>
                      <MenuItem value="18:00:00">
                        18 hour
                      </MenuItem>
                      <MenuItem value="19:00:00">
                        19 hour
                      </MenuItem>
                      <MenuItem value="20:00:00">
                        20 hour
                      </MenuItem>
                      <MenuItem value="21:00:00">
                        21 hour
                      </MenuItem>
                      <MenuItem value="22:00:00">
                        22 hour
                      </MenuItem>
                      <MenuItem value="23:00:00">
                        23 hour
                      </MenuItem>
                      <MenuItem value="24:00:00">
                        24 hour
                      </MenuItem>
                      <MenuItem value="25:00:00">
                        25 hour
                      </MenuItem>
                      <MenuItem value="26:00:00">
                        26 hour
                      </MenuItem>
                      <MenuItem value="27:00:00">
                        27 hour
                      </MenuItem>
                      <MenuItem value="28:00:00">
                        28 hour
                      </MenuItem>
                      <MenuItem value="29:00:00">
                        29 hour
                      </MenuItem>
                      <MenuItem value="30:00:00">
                        30 hour
                      </MenuItem>

                    </TextField> */}
                      <TextField
                        margin="dense"
                        id="name"
                        label="Course Duration (in hrs)"
                        fullWidth
                        type="number"
                        helperText={errors.duration}
                        error={Boolean(errors.duration)}
                        InputProps={{
                          inputProps: {
                            min: 0,
                            max: 15,
                            step: 1,
                          },
                        }}
                        placeholder="CourseDuration (in hrs)"
                        name="duration"
                        value={parseFloat(cduration)}
                        onChange={(e) => {
                          setCDuration(parseFloat(e.target.value));
                          setCourse({
                            ...course,
                            duration:
                              (parseFloat(cduration) + 1).toString() + ":00:00",
                          });
                        }}
                      />
                    </FormControl>
                  </Col>
                  <Col></Col>
                </Row>
              )}
              {step == 5 && (
                <Row className="d-flex justify-content-center align-items-center">
                  <h1 className="mb-3 d-flex justify-content-center align-items-center">
                    Describe about your course
                  </h1>
                  <h6 className="mb-5 d-flex justify-content-center align-items-center">
                    If you're not sure, you can change it later.
                  </h6>
                  <Col></Col>
                  <Col>
                    <FormControl className="mb-3" fullWidth>
                      <TextField
                        type="text"
                        label="Description"
                        multiline
                        rows={3}
                        placeholder="eg :This course covers key React concepts such as JSX, components, state, props, and hooks. You’ll learn how to build powerful interactive web applications using React. The syllabus includes 11 lessons, 7 projects, and quizzes1."
                        name="description"
                        value={course.description}
                        error={errors.description}
                        helperText={errors.description}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </Col>
                  <Col></Col>
                </Row>
              )}
              {step == 6 && (
                <Row>
                  {" "}
                  <Row className="d-flex justify-content-center align-items-center">
                    <h1 className="mb-3 d-flex justify-content-center align-items-center">
                      Provide a best thumbnail for your course
                    </h1>
                    <h6 className="mb-5 d-flex justify-content-center align-items-center">
                      If you're not sure, you can change it later.
                    </h6>
                    <Col></Col>
                    <Col>
                      <FormControl
                        controlId="formFile"
                        className="mb-3"
                        fullWidth
                      >
                        <Box {...getRootProps()} className="course-thumbnail">
                          <Card.Body className="text-center">
                            <input {...getInputProps()} type="file" />
                            {selectedImage ? (
                              <Card>
                                <CloseButton
                                  className="position-absolute top-0 end-0"
                                  style={{ color: "red" }}
                                  onClick={removeThumbnail}
                                  aria-label="Remove image"
                                />

                                <img
                                  className="thumbnail-image"
                                  src={selectedImage}
                                  alt="Course thumbnail"
                                />
                              </Card>
                            ) : (
                              <p>
                                {isDragActive ? (
                                  "Drag the course thumbnail here ..."
                                ) : (
                                  <span>
                                    Click to select thumbnail image or{" "}
                                    <span className="upload-link">
                                      Click to upload
                                    </span>
                                  </span>
                                )}
                              </p>
                            )}
                          </Card.Body>
                        </Box>
                        {errors.thumbnailimage && (
                          <p className="error">{errors.thumbnailimage}</p>
                        )}
                      </FormControl>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Row className=" mb-3 d-flex justify-content-center align-items-center">
                      {" "}
                      {errors.title && (
                        <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                          *{errors.title}
                        </h6>
                      )}
                    </Row>
                    <Row className=" mb-3 d-flex justify-content-center align-items-center">
                      {" "}
                      {errors.description && (
                        <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                          *{errors.description}
                        </h6>
                      )}
                    </Row>
                    <Row className=" mb-3 d-flex justify-content-center align-items-center">
                      {errors.thumbnailimage && (
                        <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                          *{errors.thumbnailimage}
                        </h6>
                      )}
                    </Row>
                    <Row className=" mb-3 d-flex justify-content-center align-items-center">
                      {errors.category && (
                        <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                          *{errors.category}
                        </h6>
                      )}
                    </Row>
                    <Row className=" mb-3 d-flex justify-content-center align-items-center">
                      {" "}
                      {errors.level && (
                        <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                          *{errors.level}
                        </h6>
                      )}{" "}
                    </Row>
                    <Row className=" mb-3 d-flex justify-content-center align-items-center">
                      {" "}
                      {errors.duration && (
                        <h6 className="error mb-2 d-flex justify-content-center align-items-center">
                          *{errors.duration}
                        </h6>
                      )}{" "}
                    </Row>
                  </Row>
                </Row>
              )}
            </Row>
          </Row>

          {/* <Row>
          <Col xs={2} sm={3} md={3} ></Col>
          <Col xs={12} sm={12} md={6} >
            <Card className="mt-5" id="Course-custom-card" >
              <Card.Header style={{ backgroundColor: '#23275C', color: 'white' }} className="Course-header">
                CREATE COURSE
              </Card.Header>
              <CardContent className="Course-scrollable-body">
                <Form onSubmit={handleSubmit}>
                  <FormControl className="mb-3" fullWidth> */}
          {/* <Form.Label>Course Title</Form.Label> */}
          {/* <TextField
                      type="text"
                      name="title"
                      placeholder="Course title"
                      label="Course title"
                      fullWidth
                      autoFocus
                      error={Boolean(errors.title)}
                      helperText={errors.title}
                      value={course.title}
                      onChange={handleInputChange}
                    /> */}
          {/* {errors.title && <p className="error">{errors.title}</p>} */}
          {/* </FormControl>

                  <FormControl className="mb-3" fullWidth> */}
          {/* <Form.Label required>Course Category</Form.Label> */}

          {/* <TextField select name="category" onChange={handleInputChange} fullWidth label="Course Catagory" placeholder="Select Catagory" error={Boolean(errors.category)} helperText={errors.category}>
                      <b>Select Category</b>
                      {fetchCategory.map((category) => (
                        <MenuItem
                          key={category.categoryId}
                          value={category.categoryId}
                        >
                          {category.category}
                        </MenuItem>
                      ))}
                      <MenuItem value="Add category" style={{ color: "#050C9C" }}>+ Add Category</MenuItem>
                    </TextField> */}
          {/* {errors.category && (
                      <p className="error">{errors.category}</p>
                    )} */}

          {/* </FormControl>
                  <FormControl className="mb-3" fullWidth> */}
          {/* <Form.Label>Course Level</Form.Label> */}
          {/* <TextField name="level" select onChange={handleInputChange} label="Course Level" fullWidth error={Boolean(errors.level)} helperText={errors.level} placeholder="Select Level">
                      <MenuItem>Select Level</MenuItem>
                      {fetchLevel.map((level) => (
                        <MenuItem key={level.levelId} value={level.levelId}>
                          {level.level}
                        </MenuItem>
                      ))}
                    </TextField> */}
          {/* {errors.level && <p className="error">{errors.level}</p>} */}
          {/* </FormControl>

                  <FormControl className="mb-3" fullWidth>

                    <TextField
                      margin="dense"
                      id="name"
                      label="Course Duration (in hrs)"
                      fullWidth
                      type="time"
                      helperText={errors.duration}
                      error={Boolean(errors.duration)} */}
          {/* // step="0.1"
                      // min="0" */}
          {/* placeholder="CourseDuration (in hrs)"
                      name="duration"
                      value={course.duration}
                      onChange={handleInputChange}
                    /> */}
          {/* {errors.duration && (
                      <p className="error">{errors.duration}</p>
                    )} */}

          {/* </FormControl>

                  <FormControl className="mb-3" fullWidth >
                    <TextField
                      type="text"
                      label="Description"
                      multiline
                      rows={3}
                      placeholder="Enter your description"
                      name="description"
                      value={course.description}
                      error={(errors.description)}
                      helperText={(errors.description)}
                      onChange={handleInputChange}
                    /> */}
          {/* {errors.description && (
                      <p className="error">{errors.description}</p>
                    )} */}
          {/* </FormControl>

                  <FormControl controlId="formFile" className="mb-3" fullWidth>
                    <Form.Label>Course Thumbnail</Form.Label>

                    <Box {...getRootProps()} className="course-thumbnail">
                      <Card.Body className="text-center">
                        <input {...getInputProps()} type="file" />
                        {selectedImage ? (

                          <Card > */}
          {/* <Card.Header> */}
          {/* <CloseButton
                              className="position-absolute top-0 end-0"
                              style={{ color: 'red' }}
                              onClick={removeThumbnail}
                              aria-label="Remove image"
                            /> */}
          {/* </Card.Header> */}

          {/* <img
                              className="thumbnail-image"
                              src={selectedImage}
                              alt="Course thumbnail"                               // modified lines
                            />
                          </Card>
                        ) : (
                          <p >
                            {isDragActive
                              ? "Drag the course thumbnail here ..."
                              : <span>Click to select thumbnail image or <span className="upload-link">Click to upload</span></span>
                            }
                          </p>
                        )}
                      </Card.Body>
                    </Box>
                    {errors.thumbnailimage && (
                      <p className="error">{errors.thumbnailimage}</p>
                    )}
                  </FormControl> */}

          {/* {selectedImage && (
          <Row>
            <Col></Col>
            <Col xs={4} md={4}>
              <Image src={selectedImage} thumbnail />
            </Col>
            <Col></Col>
          </Row>
        )} */}
          {/* <Row className="mt-3">
                    <Col md={4} ></Col>
                    <Col md={8}>
                      <Button type="submit" value="CREATE COURSE" style={{ backgroundColor: '#23275C', color: 'white',paddingLeft:'30px',paddingRight:'30px' }} className="align-items-center justify-content-center">
                        CREATE COURSE
                      </Button></Col>
                    <Col md={2}></Col>

                  </Row>
                </Form>
              </CardContent>

            </Card>
          </Col>
          <Col xs={0} sm={1} md={1}></Col>
        </Row> */}
          <footer>
            <Row
              style={{
                boxShadow: "1px 2px 9px #F0F0F0",
                height: "60px",
                marginLeft: "10px",
              }}
            >
              <Col md={6} xs={6} className="mt-3">
                {progress == 1 ? null : (
                  <Button variant="contained" onClick={handlePrevious}>
                    Previous
                  </Button>
                )}
              </Col>
              <Col
                md={6}
                xs={6}
                className=" d-flex justify-content-end align-items-end"
              >
                <Button>
                  {progress == 6 ? (
                    <Button variant="contained" type="Submit">
                      Submit
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={handleContinue}>
                      Continue
                    </Button>
                  )}
                </Button>
              </Col>
            </Row>
          </footer>
        </Form>
      </Container>
      {/* <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleCategory,
          sx: {
            width: '100%', // Full width
            maxWidth: '500px', // Custom max-width
          }
        //   style: { maxWidth: 'none' } 
      }}
    
      >
        <DialogTitle className='dialog-clr'>Add Category</DialogTitle>
        <DialogContent className='dialog-content'>
 
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="category"
            label="Enter new category"
            type="longtext"
            value={category.category}
            onChange={handleInputCategory}
                         
            fullWidth
            
            variant="standard"
            // style={{margin:'10px'}}
          />
         
 
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
      </React.Fragment> */}

      {/* <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: handleCategory,
            sx: {
              width: '100%', // Full width
              maxWidth: '500px', // Custom max-width
            }
          }}
        >
          <DialogTitle className='dialog-clr'>Add Category</DialogTitle>
          <DialogContent className='dialog-content'>
            <TextField
              autoFocus

              margin="dense"
              id="name"
              name="category"
              label="Enter new category"
              type="longtext"
              value={category.category}
              onChange={handleInputCategory}
              fullWidth
              variant="standard"
            />
            {categoryErrors.category && <p className="error">{categoryErrors.category}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment> */}
      <Modal show={open} onHide={handleClose} centered>
        <Form onSubmit={handleCategory}>
          <Modal.Header closeButton>
            <Modal.Title>Add Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="category">
              <Form.Label>Enter new category</Form.Label>
              <Form.Control
                name="category"
                type="text"
                autoFocus
                value={category.category}
                onChange={handleInputCategory}
                isInvalid={!!categoryErrors.category}
              />
              <Form.Control.Feedback type="invalid">
                {categoryErrors.category}
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddCourse;

// import React, { useState, useEffect } from "react";
// // import "../../../style/Course/Course/AddCourse.css";
// import '../../../Styles/Course/Course/AddCourse.css'
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Modal,

//   Image,
//   CloseButton,
//   CardHeader,
// } from "react-bootstrap";
// import { useDispatch, connect, useSelector } from "react-redux";
// // import {
// //   createCoursesRequest,
// //   createCoursesSuccess,
// //   fetchLevelRequest,
// // } from "../../../action/Course/Course/AddCourseAction"; // Assuming this is your action creator

// import {
//   createCoursesRequest,
//   createCoursesSuccess,
//   fetchLevelRequest,
//   RESET_EXISTEDCOURSE_MESSAGE,
//   RESET_SUCCESSCOURSE_MESSAGE
// } from '../../../actions/Course/Course/AddCourseAction'
// import { GiCancel } from "react-icons/gi";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { validateForm } from "../../../utils/Course/Course/AddCourseValidation";
// // import { createCategoryrequest } from "../../../action/Course/Category/AddCategoryAction";
// import { createCategoryrequest, RESET_THE_SUBMITTED_MESSGAE, RESET_EXISTED_MESSAGE } from '../../../actions/Course/Category/AddCategoryAction';
// import { useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { Dialog, TextField, DialogContent, DialogTitle, DialogActions, Button, Alert, Stack, Box, MenuItem, FormControl, FormHelperText, CardContent } from "@mui/material";
// import CheckIcon from '@mui/icons-material/Check';
// import { validateCategory } from "../../../utils/Course/Course/AddCourseValidation";
// // import { fetchCategoryRequest } from "../../../action/Course/Category/FetchCategoryAction";
// import { fetchCategoryRequest } from '../../../actions/Course/Category/FetchCategoryAction';
// import Swal from "sweetalert2";

// const AddCourse = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [coursecategory, setCategory] = useState([]);
//   const [courselevel, setLevel] = useState([]);
//   const [categoryErrors, setCategoryErrors] = useState({});
//   const [category, setAddCategory] = useState({
//     category: "",
//     createdBy: "Asha",
//   });
//   const [open, setOpen] = React.useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [course, setCourse] = useState({
//     title: "",
//     level: "",
//     category: "",
//     description: "",
//     createdby: "Asha",
//     duration: "",
//     thumbnailimage: null,
//   });
//   //If course is created then navigate to course creation  page\
//   const courseid = useSelector((state) => state.addcourse.course_id);

//   //  const isSubmits = useSelector((state) => state.addcourse);
//   const isSubmit = useSelector((state) => state.addcourse.isSubmitted);
//   //  const CourseId= useSelector((state)=>state.AddCourse.course_id)
//   //  console.log("checkcoursecontent",isSubmits);
//   useEffect(() => {
//     if (isSubmit) {
//       // console.log("oppp",courseid);
//       // const courseid = useSelector((state) => state.addcourse.course_id);
//       dispatch({ type: RESET_SUCCESSCOURSE_MESSAGE });
//       navigate(`/coursecontent/${courseid}`); // Navigate to the next page on success
//     }
//   }, [isSubmit, navigate]);
//   //success message for adding category
//   const addCategorySuccessState = useSelector((state) => state.addCategory.isSuccess);
//   const addCategoryFailureState = useSelector((state) => state.addCategory.isFailure);
//   //   const categorySuccessMsg=useSelector((state)=>state.addCategory.message)
//   const [successMsg, setSuccessMsg] = useState('')
//   useEffect(() => {
//     if (addCategorySuccessState) {
//       handleClose();

//       const Toast = Swal.mixin({
//         toast: true, position: "top-end",
//         showConfirmButton: false, timer: 3000, timerProgressBar: true,
//         didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; }
//       });
//       Toast.fire({
//         icon: "success", title: "Category added successfully"
//       });
//       dispatch({ type: RESET_THE_SUBMITTED_MESSGAE });

//       // setSuccessMsg('Category added successfully');

//       // const timer = setTimeout(() => {
//       //   setSuccessMsg('');
//       // }, 7000);

//       // // Clear the timeout if the component unmounts
//       // return () => clearTimeout(timer);

//     }
//   }, [addCategorySuccessState])
//   const [failurMsg, setFailureMsg] = useState('');
//   useEffect(() => {
//     if (addCategoryFailureState) {
//       handleClose();
//       // setFailureMsg('Category already exists');
//       // const timer = setTimeout(() => {
//       //   setFailureMsg('');
//       // }, 7000);

//       // // Clear the timeout if the component unmounts
//       // return () => clearTimeout(timer);

//       const Toast = Swal.mixin({
//         toast: true, position: "top-end",
//         showConfirmButton: false, timer: 3000, timerProgressBar: true,
//         didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; }
//       });
//       Toast.fire({
//         icon: "warning", title: "Category already exists"
//       });
//       dispatch({ type: RESET_EXISTED_MESSAGE });

//     }
//   }, [addCategoryFailureState])

//   const [servererror, setserverrError] = useState('');
//   const InternalError = useSelector((state) => state.addCategory.isError);
//   useEffect(() => {
//     if (InternalError) {
//       handleClose();
//       // setserverrError('Internal Server error occured');
//       // const timer = setTimeout(() => {
//       //   setserverrError('');
//       // }, 7000);

//       // // Clear the timeout if the component unmounts
//       // return () => clearTimeout(timer);
//       const Toast = Swal.mixin({
//         toast: true, position: "top-end",
//         showConfirmButton: false, timer: 3000, timerProgressBar: true,
//         didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; }
//       });
//       Toast.fire({
//         icon: "error", title: "Internal Server error occured"
//       });
//     }
//   }, [InternalError])

//   //If course is already exists
//   const isExist = useSelector((state) => state.addcourse.isExists);
//   console.log("isEx", isExist);

//   const [existMsg, setExistMsg] = useState('');
//   useEffect(() => {
//     if (isExist) {
//       const Toast = Swal.mixin({
//         toast: true, position: "top-end",
//         showConfirmButton: false, timer: 3000, timerProgressBar: true,
//         didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; }
//       });
//       Toast.fire({
//         icon: "warning", title: "Course already exists"
//       });
//       dispatch({ type: RESET_EXISTEDCOURSE_MESSAGE });

//     }
//   }, [isExist])

//   //if internal message occurs for creating course
//   const [failure, setFailure] = useState('');
//   const isFailure = useSelector((state) => state.course.isError);
//   useEffect(() => {
//     if (isFailure) {
//       // setFailure('Internal Server error occured');
//       const Toast = Swal.mixin({
//         toast: true, position: "top-end",
//         showConfirmButton: false, timer: 3000, timerProgressBar: true,
//         didOpen: (toast) => { toast.onmouseenter = Swal.stopTimer; toast.onmouseleave = Swal.resumeTimer; }
//       });
//       Toast.fire({
//         icon: "error", title: "Internal Server error occured"
//       });

//     }
//   }, [isFailure])

//   const fetchCategory = useSelector((state) => state.category.courses);

//   const fetchLevel = useSelector((state) => state.level.courses);

//   const fetchData = async () => {
//     // try {
//     //   const categoryResponse = await axios.get(
//     //     "http://localhost:5199/lxp/course/category"
//     //   );
//     //   setCategory(categoryResponse.data.data);
//     //   const levelResponse = await axios.get(
//     //     "http://localhost:5199/lxp/course/courselevel/ash"
//     //   );
//     //   setLevel(levelResponse.data.data);
//     // } catch (error) {
//     //   console.error("Error fetching data:", error);
//     // }
//     dispatch(fetchCategoryRequest());
//   };
//   useEffect(() => {

//     fetchData();
//     dispatch(fetchLevelRequest());

//   }, []);

//   const handleClickOpen = async () => {
//     setOpen(true);

//   };

//   const handleClose = () => {
//     setOpen(false);
//     setAddCategory('');

//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const isFormValid = validateForm(course, setErrors);

//     if (isFormValid) {
//       try {
//         console.log("form", course);
//         dispatch(createCoursesRequest(course));
//       } catch (error) {
//         console.error("Error creating course:", error);
//       }
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCourse({ ...course, [name]: value });
//     //  setCourse({ ...course, [e.target.name]: e.target.value });
//     if (name === "category" && value === "Add category") {
//       // Show modal for adding a new category
//       handleClickOpen();
//     }
//   };
//   const handleInputCategory = (e) => {
//     setAddCategory({ ...category, [e.target.name]: e.target.value });
//   };
//   // const handleCategory = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     console.log("category add", category);
//   //     dispatch(createCategoryrequest(category));

//   //   } catch (error) {
//   //     window.alert("Error occured in adding category", error);
//   //   }
//   // };

//   const handleCategory = async (e) => {
//     e.preventDefault();
//     const isCategoryValid = validateCategory(category, setCategoryErrors);

//     if (isCategoryValid) {
//       // fetchData();
//       handleClose(); // This will close the modal

//       try {
//         console.log("category add", category);
//         dispatch(createCategoryrequest(category));
//       } catch (error) {
//         window.alert("Error occurred in adding category", error);
//       }

//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [category]); // Dependency array with category to re-run fetchData when category changes

//   const handleThumbnailChange = (event) => {
//     if (event.target.files && event.target.files[0]) {
//       setCourse((prevCourse) => ({
//         ...prevCourse,
//         thumbnailimage: event.target.files[0],
//       }));
//       const file = event.target.files[0];
//       setSelectedImage(URL.createObjectURL(file));
//     }
//   };

//   const removeThumbnail = () => {

//     setSelectedImage(null);
//   };

//   const onDrop = useCallback((acceptedFiles) => {
//     console.log(acceptedFiles);
//     // Handle the files
//     const file = acceptedFiles[0];
//     // Create a URL for the file
//     const fileUrl = URL.createObjectURL(file);
//     setSelectedImage(fileUrl);
//     handleThumbnailChange({ target: { files: [file] } });
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: "image/*",
//   });

//   const [progress, setProgress] = useState(1);
//   const percentage = Math.round((progress / 6) * 100);

//   const containerStyles = {
//     height: 5,
//     width: '100%',
//     backgroundColor: 'white',
//     borderRadius: 20,
//     // marginLeft:'10px'

//     //margin: 50,
//   };

//   const fillerStyles = {
//     height: '100%',
//     width: `${percentage}%`,
//     backgroundColor: 'blue', // Change this color as needed
//     borderRadius: 'inherit',
//     textAlign: 'right',
//     // marginLeft:'10px'
//   };

//   const labelStyles = {
//     padding: 5,
//     color: 'white',
//     fontWeight: 'bold',
//   };
//   const [step, setStep] = useState(1);
//   const handleContinue = () => {
//     // const isFormValid = alidateForm(course, setErrors);

//     // if (isFormValid) {
//     setProgress(progress + 1);

//     setStep(step + 1);
//     // }else{

//     //   setErrors({})

//     // }
//   }
//   const handlePrevious = () => {
//     setProgress(progress - 1);
//     setStep(step - 1);
//   }

//   return (
//     <>
//       <Container style={{ background: "white" }}>
//         <Form onSubmit={handleSubmit}>
//           <Row>
//             <Row className="mt-5" style={{ boxShadow: '1px 2px 9px #F0F0F0', height: '60px', marginLeft: '10px' }}>
//               <h6 style={{ paddingTop: '20px', fontWeight: 'bold' }}>Step {progress} of 6</h6>
//               <Row style={containerStyles} className="mt-1">
//                 <Row style={fillerStyles}>
//                   <span style={labelStyles}>{`${percentage}%`}</span>
//                 </Row>
//               </Row>
//             </Row>

//             <Row style={{ height: '70vh' }} className="mt-1 d-flex justify-content-center align-items-center">
//               {/* <Col></Col> */}

//               {step == 1 && (<Row className="d-flex justify-content-center align-items-center">
//                 <h1 className="mb-3 d-flex justify-content-center align-items-center">How about a Course title</h1>
//                 <h6 className="mb-5 d-flex justify-content-center align-items-center">It's ok if you can't think of a good title now. You can change it later.</h6>
//                 <Col></Col>
//                 <Col>

//                   <FormControl className="mt-3" fullWidth>
//                     {/* <Form.Label>Course Title</Form.Label> */}
//                     <TextField
//                       type="text"
//                       name="title"
//                       placeholder="eg : Learn Reactjs from scratch"
//                       label="Course title"
//                       fullWidth
//                       autoFocus
//                       error={Boolean(errors.title)}
//                       helperText={errors.title}
//                       value={course.title}
//                       onChange={handleInputChange}
//                     />
//                     {/* {errors.title && <p className="error">{errors.title}</p>} */}
//                   </FormControl>
//                 </Col>
//                 <Col></Col>

//               </Row>)}
//               {step == 2 && (<Row className="d-flex justify-content-center align-items-center">
//                 <h1 className="mb-3 d-flex justify-content-center align-items-center">What category best fits the knowledge you'll share?</h1>
//                 <h6 className="mb-5 d-flex justify-content-center align-items-center">If you're not sure about the right category, you can change it later.You can add new category also.</h6>
//                 <Col></Col>
//                 <Col>

//                   <FormControl className="mt-3" fullWidth>

//                     <TextField select name="category" onChange={handleInputChange} fullWidth label="Course Catagory" placeholder="Select Catagory" error={Boolean(errors.category)} helperText={errors.category}>
//                       {/* <b>Select Category</b> */}
//                       {fetchCategory.map((category) => (
//                         <MenuItem
//                           key={category.categoryId}
//                           value={category.categoryId}
//                         >
//                           {category.category}
//                         </MenuItem>
//                       ))}
//                       <MenuItem value="Add category" style={{ color: "#050C9C" }}>+ Add Category</MenuItem>
//                     </TextField>

//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>)}
//               {step == 3 && (<Row className="d-flex justify-content-center align-items-center">
//                 <h1 className="mb-3 d-flex justify-content-center align-items-center">What level best fits the knowledge you'll share?</h1>
//                 <h6 className="mb-5 d-flex justify-content-center align-items-center">If you're not sure about the right category, you can change it later.</h6>
//                 <Col></Col>
//                 <Col>
//                   <FormControl className="mb-3" fullWidth>

//                     <TextField name="level" select onChange={handleInputChange} label="Course Level" fullWidth error={Boolean(errors.level)} helperText={errors.level} placeholder="Select Level">
//                       {/* <MenuItem>Select Level</MenuItem> */}
//                       {fetchLevel.map((level) => (
//                         <MenuItem key={level.levelId} value={level.levelId}>
//                           {level.level}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>)}
//               {step == 4 && (<Row className="d-flex justify-content-center align-items-center">
//                 <h1 className="mb-3 d-flex justify-content-center align-items-center">Choose your course duration</h1>
//                 <h6 className="mb-5 d-flex justify-content-center align-items-center">If you're not sure about the course duration, you can change it later.</h6>
//                 <Col></Col>
//                 <Col>
//                   <FormControl className="mb-3" fullWidth>

//                     {/* <TextField
//    margin="dense"
//    id="name"
//    label="Course Duration (in hrs)"
//    fullWidth
//    type="time"
//    helperText={errors.duration}
//    error={Boolean(errors.duration)}

//    placeholder="CourseDuration (in hrs)"
//    name="duration"
//    value={course.duration}
//    onChange={handleInputChange}
//  /> */}
//                     <TextField name="duration" select onChange={handleInputChange} label="Course duration" fullWidth error={Boolean(errors.duration)} helperText={errors.duration} placeholder="Select Level">
//                       <MenuItem>Select Duration</MenuItem>

//                       <MenuItem value="01:00:00">
//                         1 hour
//                       </MenuItem>
//                       <MenuItem value="02:00:00">
//                         2 hour
//                       </MenuItem>
//                       <MenuItem value="03:00:00">
//                         3 hour
//                       </MenuItem>
//                       <MenuItem value="04:00:00">
//                         4 hour
//                       </MenuItem>
//                       <MenuItem value="05:00:00">
//                         5 hour
//                       </MenuItem>
//                       <MenuItem value="06:00:00">
//                         6 hour
//                       </MenuItem>
//                       <MenuItem value="07:00:00">
//                         7 hour
//                       </MenuItem>
//                       <MenuItem value="08:00:00">
//                         8 hour
//                       </MenuItem>
//                       <MenuItem value="09:00:00">
//                         9 hour
//                       </MenuItem>
//                       <MenuItem value="10:00:00">
//                         10 hour
//                       </MenuItem>
//                       <MenuItem value="11:00:00">
//                         11 hour
//                       </MenuItem>
//                       <MenuItem value="12:00:00">
//                         12 hour
//                       </MenuItem>
//                       <MenuItem value="13:00:00">
//                         13 hour
//                       </MenuItem>
//                       <MenuItem value="14:00:00">
//                         14 hour
//                       </MenuItem>
//                       <MenuItem value="15:00:00">
//                         15 hour
//                       </MenuItem>
//                       <MenuItem value="16:00:00">
//                         16 hour
//                       </MenuItem>
//                       <MenuItem value="17:00:00">
//                         17 hour
//                       </MenuItem>
//                       <MenuItem value="18:00:00">
//                         18 hour
//                       </MenuItem>
//                       <MenuItem value="19:00:00">
//                         19 hour
//                       </MenuItem>
//                       <MenuItem value="20:00:00">
//                         20 hour
//                       </MenuItem>
//                       <MenuItem value="21:00:00">
//                         21 hour
//                       </MenuItem>
//                       <MenuItem value="22:00:00">
//                         22 hour
//                       </MenuItem>
//                       <MenuItem value="23:00:00">
//                         23 hour
//                       </MenuItem>
//                       <MenuItem value="24:00:00">
//                         24 hour
//                       </MenuItem>
//                       <MenuItem value="25:00:00">
//                         25 hour
//                       </MenuItem>
//                       <MenuItem value="26:00:00">
//                         26 hour
//                       </MenuItem>
//                       <MenuItem value="27:00:00">
//                         27 hour
//                       </MenuItem>
//                       <MenuItem value="28:00:00">
//                         28 hour
//                       </MenuItem>
//                       <MenuItem value="29:00:00">
//                         29 hour
//                       </MenuItem>
//                       <MenuItem value="30:00:00">
//                         30 hour
//                       </MenuItem>

//                     </TextField>

//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>)}
//               {step == 5 && (<Row className="d-flex justify-content-center align-items-center">
//                 <h1 className="mb-3 d-flex justify-content-center align-items-center">Describe about your course</h1>
//                 <h6 className="mb-5 d-flex justify-content-center align-items-center">If you're not sure, you can change it later.</h6>
//                 <Col></Col>
//                 <Col>
//                   <FormControl className="mb-3" fullWidth >
//                     <TextField
//                       type="text"
//                       label="Description"
//                       multiline
//                       rows={3}
//                       placeholder="eg :This course covers key React concepts such as JSX, components, state, props, and hooks. You’ll learn how to build powerful interactive web applications using React. The syllabus includes 11 lessons, 7 projects, and quizzes1."
//                       name="description"
//                       value={course.description}
//                       error={(errors.description)}
//                       helperText={(errors.description)}
//                       onChange={handleInputChange}
//                     />

//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>)}
//               {step == 6 && (<Row> <Row className="d-flex justify-content-center align-items-center">
//                 <h1 className="mb-3 d-flex justify-content-center align-items-center">Provide a best thumbnail for your course</h1>
//                 <h6 className="mb-5 d-flex justify-content-center align-items-center">If you're not sure, you can change it later.</h6>
//                 <Col></Col>
//                 <Col>

//                   <FormControl controlId="formFile" className="mb-3" fullWidth>

//                     <Box {...getRootProps()} className="course-thumbnail">
//                       <Card.Body className="text-center">
//                         <input {...getInputProps()} type="file" />
//                         {selectedImage ? (

//                           <Card >
//                             <CloseButton
//                               className="position-absolute top-0 end-0"
//                               style={{ color: 'red' }}
//                               onClick={removeThumbnail}
//                               aria-label="Remove image"
//                             />

//                             <img
//                               className="thumbnail-image"
//                               src={selectedImage}
//                               alt="Course thumbnail"
//                             />
//                           </Card>
//                         ) : (
//                           <p >
//                             {isDragActive
//                               ? "Drag the course thumbnail here ..."
//                               : <span>Click to select thumbnail image or <span className="upload-link">Click to upload</span></span>
//                             }
//                           </p>
//                         )}
//                       </Card.Body>
//                     </Box>
//                     {errors.thumbnailimage && (
//                       <p className="error">{errors.thumbnailimage}</p>
//                     )}
//                   </FormControl>
//                 </Col>
//                 <Col></Col>
//               </Row>
//                 <Row>
//                   <Row className=" mb-3 d-flex justify-content-center align-items-center"> {errors.title && <h6 className="error mb-2 d-flex justify-content-center align-items-center">*{errors.title}</h6>}</Row>
//                   <Row className=" mb-3 d-flex justify-content-center align-items-center"> {errors.description && <h6 className="error mb-2 d-flex justify-content-center align-items-center">*{errors.description}</h6>}</Row>
//                   <Row className=" mb-3 d-flex justify-content-center align-items-center">{errors.thumbnailimage && <h6 className="error mb-2 d-flex justify-content-center align-items-center">*{errors.thumbnailimage}</h6>}</Row>
//                   <Row className=" mb-3 d-flex justify-content-center align-items-center">{errors.category && (
//                     <h6 className="error mb-2 d-flex justify-content-center align-items-center">*{errors.category}</h6>
//                   )}</Row>
//                   <Row className=" mb-3 d-flex justify-content-center align-items-center">  {errors.level && <h6 className="error mb-2 d-flex justify-content-center align-items-center">*{errors.level}</h6>}  </Row>
//                   <Row className=" mb-3 d-flex justify-content-center align-items-center"> {errors.duration && (
//                     <h6 className="error mb-2 d-flex justify-content-center align-items-center">*{errors.duration}</h6>
//                   )}   </Row>
//                 </Row>
//               </Row>
//               )}

//             </Row>
//           </Row>

//           {/* <Row>
//           <Col xs={2} sm={3} md={3} ></Col>
//           <Col xs={12} sm={12} md={6} >
//             <Card className="mt-5" id="Course-custom-card" >
//               <Card.Header style={{ backgroundColor: '#23275C', color: 'white' }} className="Course-header">
//                 CREATE COURSE
//               </Card.Header>
//               <CardContent className="Course-scrollable-body">
//                 <Form onSubmit={handleSubmit}>
//                   <FormControl className="mb-3" fullWidth> */}
//           {/* <Form.Label>Course Title</Form.Label> */}
//           {/* <TextField
//                       type="text"
//                       name="title"
//                       placeholder="Course title"
//                       label="Course title"
//                       fullWidth
//                       autoFocus
//                       error={Boolean(errors.title)}
//                       helperText={errors.title}
//                       value={course.title}
//                       onChange={handleInputChange}
//                     /> */}
//           {/* {errors.title && <p className="error">{errors.title}</p>} */}
//           {/* </FormControl>

//                   <FormControl className="mb-3" fullWidth> */}
//           {/* <Form.Label required>Course Category</Form.Label> */}

//           {/* <TextField select name="category" onChange={handleInputChange} fullWidth label="Course Catagory" placeholder="Select Catagory" error={Boolean(errors.category)} helperText={errors.category}>
//                       <b>Select Category</b>
//                       {fetchCategory.map((category) => (
//                         <MenuItem
//                           key={category.categoryId}
//                           value={category.categoryId}
//                         >
//                           {category.category}
//                         </MenuItem>
//                       ))}
//                       <MenuItem value="Add category" style={{ color: "#050C9C" }}>+ Add Category</MenuItem>
//                     </TextField> */}
//           {/* {errors.category && (
//                       <p className="error">{errors.category}</p>
//                     )} */}

//           {/* </FormControl>
//                   <FormControl className="mb-3" fullWidth> */}
//           {/* <Form.Label>Course Level</Form.Label> */}
//           {/* <TextField name="level" select onChange={handleInputChange} label="Course Level" fullWidth error={Boolean(errors.level)} helperText={errors.level} placeholder="Select Level">
//                       <MenuItem>Select Level</MenuItem>
//                       {fetchLevel.map((level) => (
//                         <MenuItem key={level.levelId} value={level.levelId}>
//                           {level.level}
//                         </MenuItem>
//                       ))}
//                     </TextField> */}
//           {/* {errors.level && <p className="error">{errors.level}</p>} */}
//           {/* </FormControl>

//                   <FormControl className="mb-3" fullWidth>

//                     <TextField
//                       margin="dense"
//                       id="name"
//                       label="Course Duration (in hrs)"
//                       fullWidth
//                       type="time"
//                       helperText={errors.duration}
//                       error={Boolean(errors.duration)} */}
//           {/* // step="0.1"
//                       // min="0" */}
//           {/* placeholder="CourseDuration (in hrs)"
//                       name="duration"
//                       value={course.duration}
//                       onChange={handleInputChange}
//                     /> */}
//           {/* {errors.duration && (
//                       <p className="error">{errors.duration}</p>
//                     )} */}

//           {/* </FormControl>

//                   <FormControl className="mb-3" fullWidth >
//                     <TextField
//                       type="text"
//                       label="Description"
//                       multiline
//                       rows={3}
//                       placeholder="Enter your description"
//                       name="description"
//                       value={course.description}
//                       error={(errors.description)}
//                       helperText={(errors.description)}
//                       onChange={handleInputChange}
//                     /> */}
//           {/* {errors.description && (
//                       <p className="error">{errors.description}</p>
//                     )} */}
//           {/* </FormControl>

//                   <FormControl controlId="formFile" className="mb-3" fullWidth>
//                     <Form.Label>Course Thumbnail</Form.Label>

//                     <Box {...getRootProps()} className="course-thumbnail">
//                       <Card.Body className="text-center">
//                         <input {...getInputProps()} type="file" />
//                         {selectedImage ? (

//                           <Card > */}
//           {/* <Card.Header> */}
//           {/* <CloseButton
//                               className="position-absolute top-0 end-0"
//                               style={{ color: 'red' }}
//                               onClick={removeThumbnail}
//                               aria-label="Remove image"
//                             /> */}
//           {/* </Card.Header> */}

//           {/* <img
//                               className="thumbnail-image"
//                               src={selectedImage}
//                               alt="Course thumbnail"                               // modified lines
//                             />
//                           </Card>
//                         ) : (
//                           <p >
//                             {isDragActive
//                               ? "Drag the course thumbnail here ..."
//                               : <span>Click to select thumbnail image or <span className="upload-link">Click to upload</span></span>
//                             }
//                           </p>
//                         )}
//                       </Card.Body>
//                     </Box>
//                     {errors.thumbnailimage && (
//                       <p className="error">{errors.thumbnailimage}</p>
//                     )}
//                   </FormControl> */}

//           {/* {selectedImage && (
//           <Row>
//             <Col></Col>
//             <Col xs={4} md={4}>
//               <Image src={selectedImage} thumbnail />
//             </Col>
//             <Col></Col>
//           </Row>
//         )} */}
//           {/* <Row className="mt-3">
//                     <Col md={4} ></Col>
//                     <Col md={8}>
//                       <Button type="submit" value="CREATE COURSE" style={{ backgroundColor: '#23275C', color: 'white',paddingLeft:'30px',paddingRight:'30px' }} className="align-items-center justify-content-center">
//                         CREATE COURSE
//                       </Button></Col>
//                     <Col md={2}></Col>

//                   </Row>
//                 </Form>
//               </CardContent>

//             </Card>
//           </Col>
//           <Col xs={0} sm={1} md={1}></Col>
//         </Row> */}
//           <footer>
//             <Row style={{ boxShadow: '1px 2px 9px #F0F0F0', height: '60px', marginLeft: '10px' }}>
//               <Col md={6} xs={6} className="mt-3">{progress == 1 ? null : (<Button variant="contained" onClick={handlePrevious}>Previous</Button>)}</Col>
//               <Col md={6} xs={6} className=" d-flex justify-content-end align-items-end"><Button>{progress == 6 ? (<Button variant="contained" type="Submit">Submit</Button>) : (<Button variant="contained" onClick={handleContinue}>Continue</Button>)}</Button></Col>

//             </Row>
//           </footer>
//         </Form>
//       </Container>
//       {/* <React.Fragment>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form',
//           onSubmit: handleCategory,
//           sx: {
//             width: '100%', // Full width
//             maxWidth: '500px', // Custom max-width
//           }
//         //   style: { maxWidth: 'none' }
//       }}

//       >
//         <DialogTitle className='dialog-clr'>Add Category</DialogTitle>
//         <DialogContent className='dialog-content'>

//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="name"
//             name="category"
//             label="Enter new category"
//             type="longtext"
//             value={category.category}
//             onChange={handleInputCategory}

//             fullWidth

//             variant="standard"
//             // style={{margin:'10px'}}
//           />

//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit">Add</Button>
//         </DialogActions>
//       </Dialog>
//       </React.Fragment> */}

//       {/* <React.Fragment>
//         <Dialog
//           open={open}
//           onClose={handleClose}
//           PaperProps={{
//             component: 'form',
//             onSubmit: handleCategory,
//             sx: {
//               width: '100%', // Full width
//               maxWidth: '500px', // Custom max-width
//             }
//           }}
//         >
//           <DialogTitle className='dialog-clr'>Add Category</DialogTitle>
//           <DialogContent className='dialog-content'>
//             <TextField
//               autoFocus

//               margin="dense"
//               id="name"
//               name="category"
//               label="Enter new category"
//               type="longtext"
//               value={category.category}
//               onChange={handleInputCategory}
//               fullWidth
//               variant="standard"
//             />
//             {categoryErrors.category && <p className="error">{categoryErrors.category}</p>}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button type="submit">Add</Button>
//           </DialogActions>
//         </Dialog>
//       </React.Fragment> */}
//       <Modal show={open} onHide={handleClose} centered>
//         <Form onSubmit={handleCategory}>
//           <Modal.Header closeButton>
//             <Modal.Title>Add Category</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form.Group className="mb-3" controlId="category" >
//               <Form.Label>Enter new category</Form.Label>
//               <Form.Control
//                 name="category"
//                 type="text"
//                 autoFocus
//                 value={category.category}
//                 onChange={handleInputCategory}
//                 isInvalid={!!categoryErrors.category}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {categoryErrors.category}
//               </Form.Control.Feedback>
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button variant="primary" type="submit">
//               Add
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>

//     </>
//   );
// };

// export default AddCourse;
