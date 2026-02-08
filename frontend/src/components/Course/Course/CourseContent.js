import React, { useState, useEffect } from "react";
import {
  FaPlay,
  FaVideo,
  FaMusic,
  FaFilePdf,
  FaFilePowerpoint,
  FaFileAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { fetchallCoursesRequest } from "../../../actions/Admin/Adnimviewcourse";
import {
  RESET_UPDATE_COURSES,
  updateCoursesRequest,
  updateCoursesSuccess,
} from "../../../actions/Admin/Updatecourse";

import { enableDisableCourseRequest } from "../../../actions/Admin/EnableDisableAction";
import { Rating } from "@mui/material";
import {
  RESET_DELETE_SUCCESS_COURSES_MESSAGE,
  deleteCoursesRequest,
} from "../../../actions/Admin/DeletecourseAction";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import { Row, Col, Container, Breadcrumb } from "react-bootstrap";
import { fetchCourseRequest } from "../../../actions/Course/Course/FetchCouseDetailsAction";
import { LogoDev } from "@mui/icons-material";
import { FaHandPointRight } from "react-icons/fa";
import { Tooltip } from "@mui/material";
//-------------------------------
import {
  RESET_THE_SUBMITTED_MESSGAE,
  createTopicsRequest,
  RESET_EXISTED_MESSAGE,
} from "../../../actions/Course/Topic/AddTopicAction";
import { validateTopicForm } from "../../../utils/Course/Topic/AddTopicValidation";
// import { fetchTopicsRequest } from '../../../action/Course/Topic/FetchTopicsAction';
import { fetchTopicsRequest } from "../../../actions/Course/Topic/FetchTopicsAction";
import EditIcon from "@mui/icons-material/Edit";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MdFormatListBulletedAdd } from "react-icons/md";

import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import TextField from "@mui/material/TextField";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  // TextField,
  DialogTitle,
} from "@mui/material";
// import DialogContent from '@mui/material/DialogContent';
import { Alert } from "@mui/material";
// import DialogTitle from '@mui/material/DialogTitle';
import AddTopic from "../Topic/AddTopic";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";
import { IconButton, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// import { VscFeedback } from "react-icons/vsc";
import { VscFeedback } from "react-icons/vsc";

import { Switch } from "@mui/material";
import { useDropzone } from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
// import '../../../style/Course/Material/CourseContent.css';
import "../../../Styles/Course/Material/CourseContent.css";
import ClearIcon from "@mui/icons-material/Clear";
import MenuItem from "@mui/material/MenuItem";
//-----------------------------
const Content = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  //const courseid = useSelector((state) => state.addcourse.course_id);
  const course = useSelector((state) => state.fetchindividualCourse.courses);
  const navigate = useNavigate();
  const iscourse = useSelector(
    (state) => state.fetchindividualCourse.isNavigate
  );
  // const fetchCourses= () => dispatch(fetchallCoursesRequest());
  const deleteCourse = (courseId) => dispatch(deleteCoursesRequest(courseId));
  const enableordisable = (enabledisablecourseId, coursestatus) =>
    dispatch(enableDisableCourseRequest(enabledisablecourseId, coursestatus));
  const [isExpanded, setIsExpanded] = useState(false);
  const handleRemoveImage = () => {
    setThumbnailimage(null);
    setSelectedcourse({ ...selectedcourse, thumbnailimage: null });
    setRemoveImage(true);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseRequest(id));
    }
  }, [id]);


  // const handleAddTopic = (e) => {
  //   e.preventDefault();
  //   if (iscourse) {
  //     navigate(`/addtopic/${courseid}`);
  //   }
  // };
  const [dialogMessage, setDialogMessage] = useState("");
  const [showEnableModal, setShowEnableModal] = useState(false);
  const EnableOrDisable = () => {
    enableordisable(enabledisablecourseId, !coursestatus);
    //  fetchCourses();
    setShowEnableModal(false);
    //  fetchCourses();
  };
  const handleToggle = (title, courseId, status) => {
    console.log(courseId, status);
    setCourseTitle(title);
    setenabledisablecourseId(courseId);
    setCourseStatus(status);
    setShowEnableModal(true);
    dispatch(fetchCourseRequest(id));
  };
  const [coursestatus, setCourseStatus] = useState();

  const [enabledisablecourseId, setenabledisablecourseId] = useState("");
  const [coursetitle, setCourseTitle] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const isUpdated = useSelector((state) => state.updatecourse.isUpdated);

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  // useEffect(() => {
  //   fetchCourses();
  // }, [fetchCourses]);
  // const divStyle = {
  //   boxShadow: '0px 4px 8px #23275c',
  //   height: '400px',
  //   width: '1200px',backgroundColor:'#DDDDDD'

  // };
  //**************************************************************************************************** */
  sessionStorage.setItem("userName", "Mano");
  //end
  //const navigate=useNavigate();
  const [errors, setErrors] = useState({});
  //const dispatch = useDispatch();
  //const { id } = useParams();
  //const [courseId,setCourseId]=useState(props.courseId??"273a1881-adb6-498c-9c35-5ba7d4b0c64b")
  // const Id=id;
  //console.log("topic inside courseId",Id);
  const [openDialog, setOpenDialog] = useState(false);
  const closedialog = () => {
    setOpenDialog(false);
    setSelectedcourse({
      courseId: "",
      title: "",
      level: "",
      category: "",
      description: "",
      duration: "",
      modifiedby: "Kavin",
      thumbnail: "",
    });
    setThumbnailimage("");
  };
  useEffect(() => {
    if (isUpdated) {
      // setOpen(true);
      // setDialogMessage(courseupdatesuccessfullmessage);

      const Toast = Swal.mixin({
        toast: true,
        background: "green",
        position: "top",
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
        iconColor: "white",
        title: "Updated Successfully",
        customClass: {
          popup: "updatecourse-toast",
        },
      });
      dispatch({ type: RESET_UPDATE_COURSES });

      // fetchCourses().then(() => {
      //   dispatch({ type: RESET_UPDATE_COURSES })
      // });
    }
    // setOpen(false);
  }, [isUpdated, dispatch]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await axios.get(
          "http://localhost:5199/lxp/course/category"
        );
        setCategory(categoryResponse.data.data);

        const levelResponse = await axios.get(
          "http://localhost:5199/lxp/course/courselevel/kavin"
        );
        setLevel(levelResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    if(!course.thumbnail || course.thumbnail!=""){
      const responseurl = axios.get(course.thumbnail, { responseType: 'blob' }).then((res) =>
      {
        console.log("popo", res)
        const blob = new Blob([res.data], { type: res.data.type });

    const file = new File([blob], "example.txt", {
      type: blob.type,
      lastModified: new Date().getTime(),
    });
    setThumbnailimage(
      blob );
      })
    console.log("responseurl=", responseurl);
    console.log("responseurl=", responseurl);
    console.log("responseurl=", course.thumbnail);
    }
    // const blob = new Blob([responseurl.data], { type: responseurl.data.type });

    // const file = new File([blob], "example.txt", {
    //   type: blob.type,
    //   lastModified: new Date().getTime(),
    // });
    // setThumbnailimage(
    //   Object.assign(file, {
    //     preview: URL.createObjectURL(file),
    //   })
    // );
    // console.log("lololo",URL.createObjectURL(thumbnailimage));
  }, [openDialog]);
  const [open, setOpen] = React.useState(false);
  const [topicopen, setTopicOpen] = React.useState(false);
  const [topics, setTopics] = useState({
    courseId: id,
    name: "",
    description: "",
    createdBy: "Mano",
  });
  const [thumbnailimage, setThumbnailimage] = useState();
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setThumbnailimage(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        })
      );
      setSelectedcourse({
        ...selectedcourse,
        thumbnailimage: acceptedFiles[0],
      });
    },
  });
  const [coursecategory, setCategory] = useState([]);
  const [courselevel, setLevel] = useState([]);
  const [selectedcourse, setSelectedcourse] = useState({
    courseId: "",
    title: "",
    level: "",
    category: "",
    description: "",
    duration: "",
    modifiedby: "Kavin",
    thumbnailimage: "null",
    levelId: "",
    categoryId: "",
  });
  const isExist = useSelector((state) => state.Topic.isExisted);
  const [existMsg, setExistMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  useEffect(() => {
    if (isExist) {
      // setExistMsg('Topic already exists');
      // const timer = setTimeout(() => {
      //   setExistMsg('');
      // }, 5000);

      // return () => clearTimeout(timer);
      const Toast = Swal.mixin({
        customClass: "topic-created-success-messgae",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({ icon: "warning", title: "Topic already exists" });
      dispatch({ type: RESET_EXISTED_MESSAGE });
    }
  }, [isExist]);

  const addSuccessState = useSelector((state) => state.Topic.isSubmitted);

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#2ECA45" : "#23275C",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color:
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#23275C",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));

  const handleupdatecourse = (e, course) => {
    e.preventDefault();
    console.log("check and check", course);

    const blob = new Blob([course.thumbnail]);

    console.log("caadasd", blob);

    // const objecturl = URL.createObjectURL(blob);

    setSelectedcourse({
      courseId: course.courseId,
      title: course.title,
      levelId: course.levelId, //
      categoryId: course.categoryId, //
      description: course.description,
      duration: course.duration,
      modifiedby: "Kavin",
      thumbnailimage: course.thumbnailimage,
    });
  
    // setThumbnailimage( blob );
    setOpenDialog(true);
  };

  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    if (addSuccessState) {
      // setSuccessMsg('Topic added successfully');
      const Toast = Swal.mixin({
        customClass: "topic-created-success-messgae",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({ icon: "success", title: "Topic created Successfuly" });

      dispatch({ type: RESET_THE_SUBMITTED_MESSGAE });

      const timer = setTimeout(() => {
        setSuccessMsg("");
      }, 7000);

      // Clear the timeout if the component unmounts

      return () => clearTimeout(timer);
    }
  }, [addSuccessState]);

  //const[topics,setTopics]=useState([]);

  const handleTopicClickOpen = async () => {
    setTopicOpen(true);
  };
  const handleClickOpen = async () => {
    setOpen(true);
  };
  const handleClose = () => {
    // window.location.reload();
    setOpen(false);
  };
  const handleTopicClose = () => {
    // window.location.reload();
    setTopicOpen(false);
  };
  const handleCourseSubmit = async (event) => {
    event.preventDefault();

    // const checkcoursevalidform = validationform();

    // if (!checkcoursevalidform) {
    //   setDialogMessage("All the fields are required for validation");
    //   setOpen(true);
    //   return;
    // }

    const formData = new FormData();

    formData.append("CourseId", selectedcourse.courseId);
    // console.log("checking the courseID", selectedcourse.courseId);

    formData.append("Title", selectedcourse.title);
    formData.append("LevelId", selectedcourse.levelId);
    formData.append("CategoryId", selectedcourse.categoryId);
    formData.append("Description", selectedcourse.description);
    formData.append("Duration", selectedcourse.duration);
    formData.append("ModifiedBy", selectedcourse.modifiedby);

    // console.log(
    //   "Selected course thumbnail image:",
    //   selectedcourse.thumbnailimage
    // );

    if (thumbnailimage && thumbnailimage.preview) {
      formData.append("Thumbnailimage", selectedcourse.thumbnailimage);
    } else {
      formData.append("Thumbnailimage", selectedcourse.thumbnailimage);
    }

    try {
      console.log("updatecourse", formData);

      // Debugging: Log the formData contents

      for (let [key, value] of formData.entries()) {
        console.log("kkakakakaakakaa", `${key}: ${value}`);
      }

      console.log("Action payload:", {
        courseId: selectedcourse.courseId,
        formData,
      });

      dispatch(
        updateCoursesRequest({ courseId: selectedcourse.courseId, formData })
      );
      closedialog();
    } catch (error) {
      console.error("Error updating course:", error);
    }
    finally {
      dispatch(fetchCourseRequest(id));

    }
  };
  const handleAddFeedBackButtons = (courseId) => {
    sessionStorage.setItem("courseId", id);

    sessionStorage.setItem("courseId", courseId);
    navigate("/coursefeedback");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("createdispatch", topics);
    const isFormValid = validateTopicForm(topics, setErrors);

    if (isFormValid) {
      try {
        dispatch(createTopicsRequest(topics));
        dispatch(fetchTopicsRequest(id));

        // handleClose();
      } catch (error) {
        console.error("Error creating course:", error);
      }
    }
    setTopics({
      courseId: id,
      name: "",
      description: "",
      createdBy: sessionStorage.getItem("userName"),
    });

    // navigate('/savedtopics')
    handleTopicClose();
  };
  useEffect(() => { console.log("thumbnailimage ", thumbnailimage) }, [thumbnailimage])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const {name,description,isactive}=e.target;
    setTopics({ ...topics, [name]: value });
  };
  const handleCourseInputChange = (e) => {
    const { name, value } = e.target;
    // const {name,description,isactive}=e.target;
    setSelectedcourse({ ...selectedcourse, [name]: value });
  };

  const handleClick = () => {
    AddTopic(); // Call the AddTopic function
  };

  //-----------------------------------------------------Delete course---------------

  const handleDeleteClick = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  const confirmDeletion = () => {
    deleteCourse(selectedCourseId);
    setShowModal(false);
    // fetchCourses();
    navigate("/admincourse");
  };
  return (
    <>
      <Container style={{ background: "white" }}>
        <Row className="mt-2">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/admincourse"> Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>View Course Details</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="mt-1">
          <Col md={3} xs={3}>
            <img
              style={{ objectFit: "fit", width: "100%", height: "25vh" }}
              src={course.thumbnail}
              alt="Course-Thumbnail"
              className="mt-2"
            />
          </Col>
          <Col md={9} xs={9}>
            <Card
              sx={{
                display: "flex",
                maxWidth: 1000,
                marginLeft: "20px",
                height: "200px",
                fontSize: "18px",
                border: "1px solid grey",
              }}
              className="mt-2"
            >
              <CardContent sx={{ flex: 1, width: "80%" }}>
                {/* <Row className="mt-1 mx-1">
              <Tooltip title="Delete Topic">
                <IconButton aria-label="Deletecourse" onClick={() => handleDeleteClick(course.courseId)}>
                  <DeleteIcon style={{ color: "#C80036" }} />
                </IconButton>
                 
              </Tooltip> 
              </Row> */}
                {/**Edited codes */}
                <Row>
                  <Box className=" d-flex justify-content-between align-items-end  ">
                    <Box marginBottom="6px" width={"25vw"}>
                      <b style={{ fontSize: "25px" }}>{course.title}</b>
                    </Box>
                    <Box>
                      <Tooltip title="Add topics" arrow>
                        <IconButton
                          onClick={handleTopicClickOpen}
                          variant="text"
                        >
                          <MdFormatListBulletedAdd color="#00008B" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Add Course Feedback" arrow>
                        <IconButton
                          aria-label="Addfeedback"
                          onClick={() => handleAddFeedBackButtons(id)}
                        >
                          <VscFeedback style={{ color: "#365E32" }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Course" arrow>
                        <IconButton
                          onClick={(e) => handleupdatecourse(e, course)}
                          variant="outlined"
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Course" arrow>
                        <IconButton
                          aria-label="Deletecourse"
                          onClick={() => handleDeleteClick(course.courseId)}
                        >
                          <DeleteIcon style={{ color: "#C80036" }} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Disable Course" arrow>
                        <FormControlLabel
                          style={{ marginLeft: "5px" }}
                          control={
                            <IOSSwitch
                              sx={{ mb: 1 }}
                              checked={course.isAvailable}
                              onClick={() =>
                                handleToggle(
                                  course.title,
                                  course.courseId,
                                  course.isAvailable
                                )
                              }
                            />
                          }
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                  {/* <Typography variant="h6" display="block"><FaHandPointRight style={{ fontSize: '20px', color: 'gray', marginRight: '10px' }} />
                  <b>Course Name:</b> {course.title}
                </Typography> */}
                  <Typography variant="h6" display="block">
                    <FaHandPointRight
                      style={{
                        fontSize: "20px",
                        color: "gray",
                        marginRight: "10px",
                      }}
                    />
                    <b>Category:</b> {course.category}
                  </Typography>
                  <Typography variant="h6" display="block">
                    <FaHandPointRight
                      style={{
                        fontSize: "20px",
                        color: "gray",
                        marginRight: "10px",
                      }}
                    />
                    <b>Level:</b> {course.level}
                  </Typography>
                  <Typography variant="h6" display="block">
                    <FaHandPointRight
                      style={{
                        fontSize: "20px",
                        color: "gray",
                        marginRight: "10px",
                      }}
                    />
                    <b>Duration: </b>
                    {course.duration} hrs
                  </Typography>
                  <Typography variant="h6" display="block">
                    <FaHandPointRight
                      style={{
                        fontSize: "20px",
                        color: "gray",
                        marginRight: "10px",
                      }}
                    />
                    <b>
                      Ratings:{" "}
                      <Rating
                        name="star-rating"
                        value={course.averageRating}
                        max={5}
                        color="secondary"
                        readOnly
                      />
                    </b>
                  </Typography>
                  {/* <Typography variant="h6" display="block" className="mt-2"><FaHandPointRight style={{ fontSize: '20px', color: 'gray', marginRight: '10px' }} />
                  <b>Course Description: </b>
                  {course.description ? (isExpanded ? course.description : `${course.description.substring(0, 100)}...`) : 'No description available'}
                </Typography>
                {course.description && course.description.length > 100 && (
                  <Button size="small" color="primary" onClick={handleToggleDescription}>
                    {isExpanded ? 'Show Less' : 'Show More'}
                  </Button>
                )} */}
                </Row>
                <Row>
                  {/* <Button className=" d-flex justify-content-end align-items-end" onClick={handleClickOpen} size="large" variant="text">Add Topic</Button> */}
                </Row>
              </CardContent>
            </Card>
          </Col>
        </Row>

        <Dialog
          open={topicopen}
          onClose={handleTopicClose}
          PaperProps={{
            component: "form",
            onSubmit: handleSubmit,
          }}
        >
          <DialogTitle style={{ backgroundColor: "#1976d2", color: "white" }}>
            Add Topics
          </DialogTitle>
          <DialogContent className="dialog-content">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Course Topic"
              type="longtext"
              fullWidth
              variant="standard"
              value={topics.name}
              onChange={handleInputChange}
              style={{ fontWeight: "700px" }}
            // onChange={(e) => setTopics({ ...topics, name: e.target.value })}
            // style={{margin:'10px'}}
            />
            {errors.name && <p className="error">{errors.name}</p>}
            <TextField
              id="outlined-multiline-static"
              label="Description"
              name="description"
              multiline
              rows={4}
              fullWidth
              value={topics.description}
              onChange={handleInputChange}
              // onChange={(e) => setTopics({ ...topics,description: e.target.value })}
              style={{ marginTop: "45px" }}
            />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleTopicClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Dialog>
      </Container>

      {/* -------------------------------------- */}
      <Modal
        show={showEnableModal}
        onHide={() => setShowEnableModal(false)}
        centered
      >
        {coursestatus !== true ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Enable Course - {coursetitle} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to Enable the course {coursetitle}?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEnableModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={EnableOrDisable}>
                Enable
              </Button>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Disable Course - {coursetitle} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to Disable the course {coursetitle}?
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEnableModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={EnableOrDisable}>
                Disable
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeletion}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Please read the below message"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={(event, reason) => {
          if (reason && reason === "backdropClick") {
            return; // Prevent Dialog from closing on backdrop click
          }
          closedialog();
        }}
        disableEscapeKeyDown
      >
        <DialogTitle>Update Course</DialogTitle>
        <form onSubmit={handleCourseSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Course Title"
              type="text"
              fullWidth
              value={selectedcourse.title}
              onChange={handleCourseInputChange}
            // error={selectedcourse.title.trim() === ""}
            // helperText={
            //   selectedcourse.title.trim() === ""
            //     ? "Course Title cannot be empty"
            //     : " "
            // }
            />
            <FormControl fullWidth style={{ marginTop: "15px" }}>
              <InputLabel id="course-level-id">Course Level</InputLabel>
              <Select
                labelId="course-level-id"
                name="level"
                // id='levelId'
                label="Course Level"
                value={selectedcourse.levelId}
                onChange={handleCourseInputChange}
              // error={selectedcourse.levelId.trim() === ""}
              // helperText={
              //   selectedcourse.levelId.trim() === ""
              //     ? "Course Level cannot be empty"
              //     : ""
              // }
              >
                {courselevel.map((level) => (
                  <MenuItem key={level.levelId} value={level.levelId}>
                    {level.level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth style={{ marginTop: "15px" }}>
              <InputLabel id="course-category-id">Course Category</InputLabel>
              <Select
                labelId="course-category-id"
                name="category"
                label="Course Category"
                value={selectedcourse.categoryId}
                onChange={handleCourseInputChange}
              >
                {coursecategory.map((category) => (
                  <MenuItem
                    key={category.categoryId}
                    value={category.categoryId}
                  >
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              name="description"
              label="Description"
              type="text"
              multiline
              rows={4}
              fullWidth
              value={selectedcourse.description}
              onChange={handleCourseInputChange}
              error={selectedcourse.description === ""}
              helperText={
                selectedcourse.description === " "
                  ? "Description cannot be empty"
                  : ""
              }
            />
            <TextField
              autoFocus
              margin="dense"
              name="duration"
              label="Duration"
              type="time"
              fullWidth
              value={selectedcourse.duration}
              onChange={handleCourseInputChange}
              error={!selectedcourse.duration || selectedcourse.duration <= 1}
              helperText={
                !selectedcourse.duration || selectedcourse.duration <= 1
                  ? "Duration cannot be empty"
                  : ""
              }
            />
            <div
              {...getRootProps()}
              style={{
                border: "2px dashed #eeeeee",
                padding: "20px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              <input {...getInputProps()} />
              {thumbnailimage ? (
                // <img src={thumbnail.preview} alt="Preview" style={{ width: '200px', height: '150px' }} />
                <div>
                  <img
                    src={URL.createObjectURL(thumbnailimage)}
                    alt="Preview"
                    style={{ width: "200px", height: "150px" }}
                  />
                  <Button
                    onClick={handleRemoveImage}
                    variant="danger"
                    style={{ top: "0", right: "0", margin: "10px" }}
                  >
                    <ClearIcon />
                  </Button>
                </div>
              ) : (
                <p>
                  Drag 'n' drop the thumbnail image here, or click to select
                  files
                </p>
              )}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closedialog}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Content;