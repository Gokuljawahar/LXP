import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import { Modal } from "react-bootstrap";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTopicsRequest } from "../../../actions/Course/Topic/FetchTopicsAction";
import { useSelector } from "react-redux";
import PDFViewer from "../Material/PDFViewer";
import { CiMusicNote1 } from "react-icons/ci";
import { BsFiletypePdf, BsFiletypePpt } from "react-icons/bs";
import EditIcon from "@mui/icons-material/Edit";
import { FaFileAlt } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import DeleteIcon from "@mui/icons-material/Delete";
//edit
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { FaRegEdit } from "react-icons/fa";
import { LuClipboardEdit } from "react-icons/lu";
import DialogTitle from "@mui/material/DialogTitle";

import { fetchEditTopicsRequest } from "../../../actions/Course/Topic/FetchEditTopicRequest";

import { FaHandPointRight } from "react-icons/fa";
import {
  updateTopicsRequest,
  RESET_EXISTED_MESSAGE,
  RESET_SUBMITTED_MESSAGE,
} from "../../../actions/Course/Topic/UpdateTopicsAction";

import {
  deleteTopicsRequest,
  RESET_DELETED_MESSAGE,
} from "../../../actions/Course/Topic/DeleteTopicsAction";

import { fetchContentUrlSuccess } from "../../../actions/Course/Material/FetchContentUrlAction";
import { useParams, useNavigate, Link } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogContentText from "@mui/material/DialogContentText";
import { validateTopicForm } from "../../../utils/Course/Topic/AddTopicValidation";
import { Container, Tooltip } from "@mui/material";
import { Card, OverlayTrigger } from "react-bootstrap";
import VideoViewer from "../Material/VideoViewer";
import AudioViewer from "../Material/AudioViewer";
import { fetchQuizIdRequest } from "../../../actions/Quiz And Feedback Module/Admin/FetchQuizIdAction";
import Swal from "sweetalert2";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import FeedbackOutlinedIcon from "@mui/icons-material/FeedbackOutlined";
import { VscFeedback } from "react-icons/vsc";
import { IconButton, Stack } from "@mui/material"; // modification for  imports quizteam
import PptViewerComponent from "../Material/PptViewer";
//import { FaHandPointRight } from "react-icons/fa";
import { TiWarningOutline } from "react-icons/ti";
import { RESET_DELETE_SUCCESS_COURSES_MESSAGE } from "../../../actions/Admin/DeletecourseAction";

import { Rating } from "@mui/material";
export default function SavedTopics(props) {
  const selectorTopicsDetail = useSelector(
    (state) => state.fetchTopic.topics[0]
  );
  const [topicsDetail, setTopicsDetails] = useState([]);
  const quizId = useSelector((state) => state.quizId.quizId);

  const isSuccess = useSelector((state) => state.quizId.isSubmitted);

  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [viewerModelHeader, setViewerModelHeader] = useState();
  const [errors, setErrors] = useState({});
  const [selectedComponent, setSelectedComponent] = useState();

  const [show, setShow] = useState(false);

  const [material_id, setMaterialIdl] = useState(false);
  const { id } = useParams();
  sessionStorage.setItem("userName", "karni");

  const [open, setOpen] = React.useState(false);

  const [updateTopic, setUpdateTopic] = useState({
    topicId: "",
    name: "",
    description: "",
    modifiedBy: sessionStorage.getItem("userName"),
  });
  useEffect(() => {
    fetchTopics();
    setLoading(true);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.setItem("courseId", id);
      sessionStorage.setItem("quizId", quizId);
      navigate(`/createquiz`);
    }
  }, [isSuccess, quizId, navigate]);

  const fetchTopics = async () => {
    try {
      await dispatch(fetchTopicsRequest(id));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching topics:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectorTopicsDetail && Array.isArray(selectorTopicsDetail.topics)) {
      setTopicsDetails(selectorTopicsDetail.topics);
    } else {
      setTopicsDetails([]);
    }
  }, [selectorTopicsDetail]);

  //fetch topic details for edit and get using useSelector

  let topicForEdit = useSelector((state) => state.fetchEditTopic.topics);
  // let topicForEdit= selectorTopicById;

  //Edit operation
  const handleEditClickOpen = (topicId) => {
    console.log("topicId", topicId);

    dispatch(fetchEditTopicsRequest(topicId));

    setOpen(true);
  };
  useEffect(() => {
    setUpdateTopic({
      topicId: topicForEdit.topicId,
      name: topicForEdit.name,
      description: topicForEdit.description,
      modifiedBy: sessionStorage.getItem("userName"),
    });
  }, [topicForEdit]);

  const handleClose = () => {
    setOpen(false);
    setUpdateTopic({
      topicId: "",
      name: "",
      description: "",
      modifiedBy: sessionStorage.getItem("userName"),
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUpdateTopic((updateTopic) => ({ ...updateTopic, [name]: value }));
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log("lecec");
    // setTopicForEdit({...topicForEdit, modifiedBy: sessionStorage.getItem("userName")})
    const isFormValid = validateTopicForm(updateTopic, setErrors);

    if (isFormValid) {
      try {
        dispatch(updateTopicsRequest(updateTopic));

        handleClose();
      } catch (error) {
        console.error("Error creating course:", error);
      }
    }
    handleClose();
    dispatch(fetchTopicsRequest(id));
  };
  //----------------------------------------------------DELETE------------------------------------
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openDelete, setOpenDelete] = React.useState(false);

  const deleteSuccess = useSelector(
    (state) => state.deleteTopic.deletesuccessmessgae
  );
  console.log("delete", deleteSuccess);

  useEffect(() => {
    if (deleteSuccess) {
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
      Toast.fire({ icon: "success", title: "Topic deleted successfully" });
      dispatch({ type: RESET_DELETED_MESSAGE });
    }
  }, [deleteSuccess, dispatch]);

  const handleDelete = (topicId) => {
    console.log("delete topic", topicId);
    dispatch(deleteTopicsRequest(topicId));
    handleDeleteClose();
  };

  const handleShow = () => setShow(true);
  const handlePreview = (filePath, materialType, materialName, materialId) => {
    setViewerModelHeader(materialName);
    switch (materialType) {
      case "PDF":
        setSelectedComponent(<PDFViewer material={filePath} />);
        break;
      case "VIDEO":
        // setSelectedComponent(<VideoViewer material={materialId}/>)
        setSelectedComponent(<VideoViewer material={filePath} />);
        break;
      case "AUDIO":
        setSelectedComponent(<AudioViewer material={filePath} />);
        break;
      case "PPT":
        setSelectedComponent(<PptViewerComponent material={filePath} />);
        break;
      case "TEXT":
        setSelectedComponent(<PDFViewer material={filePath} />);
        break;
      default:
        setSelectedComponent(<></>);
    }

    handleShow();
  };
  const handleDeleteClickOpen = (topicId) => {
    setDeleteId(topicId);
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteId("");
    dispatch(fetchTopicsRequest(id));
  };
  const handleModelClose = () => {
    setShow(false);
    dispatch(fetchContentUrlSuccess(null));
  };
  const handleModelShow = () => setShow(true);
  const handlePDFview = (materialId) => {
    console.log(materialId);
    setMaterialIdl(materialId);
    handleModelShow();
  };

  const divStyle = {
    // boxShadow: '0px 4px 8px #23275c',
    // backgroundColor: '#F6F5F5', // Replace #yourShadowColor with your color
    marginLeft: "20px",
  };

  // ... (existing functions and state)

  const handleAddFeedBackButton = (topicId) => {
    sessionStorage.setItem("courseId", id);

    sessionStorage.setItem("topicId", topicId);
    navigate("/topicfeedback");
  };

  const handleAddQuizButton = (topicId) => {
    dispatch(fetchQuizIdRequest(topicId));

    sessionStorage.setItem("topicId", topicId);
  };

  const handleAddFeedBackButtons = (courseId) => {
    sessionStorage.setItem("courseId", id);

    sessionStorage.setItem("courseId", courseId);
    navigate("/coursefeedback");
  };
  const handleAddQuizFeedBackButton = (topicId) => {
    sessionStorage.setItem("topicId", topicId);
    navigate("/quizfeedback");
  };

  const Updated = useSelector((state) => state.updateTopic.isUpdated);
  useEffect(() => {
    if (Updated) {
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
      Toast.fire({ icon: "success", title: "Topic Updated successfully" });
      dispatch({ type: RESET_SUBMITTED_MESSAGE });
    }
  }, [Updated, dispatch]);

  const Exist = useSelector((state) => state.updateTopic.isExist);
  useEffect(() => {
    if (Exist) {
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
      Toast.fire({ icon: "warning", title: "Topic already existed" });
      dispatch({ type: RESET_EXISTED_MESSAGE });
    }
  }, [Updated, dispatch]);

  const deleteFail = useSelector((state) => state.deleteTopic.isFail);
  useEffect(() => {
    if (deleteFail) {
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
      Toast.fire({ icon: "error", title: "Sorry Please try again" });
      dispatch({ type: RESET_DELETED_MESSAGE });
    }
  }, [deleteFail, dispatch]);

  return (
    <Container fluid className="mt-1" style={divStyle}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        topicsDetail.map((topic, index) => (
          <Card
            key={index}
            style={{
              marginBottom: "20px",
              justifyContent: "space-between",
              marginTop: "20px",
              fontSize: "18px",
            }}
          >
            <Card.Header>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <span style={{ fontSize: "20px" }}>
                  <b>{topic.topicName}</b>{" "}
                  <Rating
                    name="star-rating"
                    value={topic.rating}
                    max={5}
                    color="secondary"
                    readOnly
                  />
                </span>

                <div>
                  {topic.isQuiz ? (
                    <Tooltip title="Edit Quiz">
                      <IconButton
                        aria-label="Addquiz"
                        onClick={() => handleAddQuizButton(topic.topicId)}
                      >
                        <LuClipboardEdit style={{ color: "#0074D9" }} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Add Quiz">
                      <IconButton
                        aria-label="Addquiz"
                        onClick={() => handleAddQuizButton(topic.topicId)}
                      >
                        <QuizOutlinedIcon style={{ color: "#0074D9" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                  {/* <Tooltip title="Add Course Feedback">
                                        <IconButton aria-label="Addfeedback" onClick={() => handleAddFeedBackButtons(id)}>
                                            <VscFeedback style={{ color: "#365E32" }} />
                                        </IconButton>
                                    </Tooltip> */}
                  <Tooltip title="Add Topic Feedback">
                    <IconButton
                      aria-label="Addfeedback"
                      onClick={() => handleAddFeedBackButton(topic.topicId)}
                    >
                      <VscFeedback style={{ color: "#FFDC00" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Topic">
                    <IconButton
                      aria-label="Edittopics"
                      onClick={() => handleEditClickOpen(topic.topicId)}
                    >
                      <FaRegEdit
                        style={{ color: "#604CC3" }}
                        variant="outlined"
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Topic">
                    <IconButton
                      aria-label="Deletetopics"
                      onClick={() => handleDeleteClickOpen(topic.topicId)}
                    >
                      <DeleteIcon style={{ color: "#C80036" }} />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <FaHandPointRight
                  style={{
                    fontSize: "20px",
                    color: "gray",
                    marginRight: "10px",
                  }}
                />
                <b>Description :</b> {topic.topicDescription}
              </Card.Text>
              <ul>
                {topic.materials.map((material) => (
                  <li
                    key={material.materialId}
                    onClick={() =>
                      handlePreview(
                        material.filePath,
                        material.materialType,
                        material.materialName,
                        material.materialId
                      )
                    }
                  >
                    {material.materialType === "VIDEO" && (
                      <CiYoutube className="icon" style={{ color: "blue" }} />
                    )}
                    {material.materialType === "AUDIO" && (
                      <CiMusicNote1
                        className="icon"
                        style={{ color: "blue" }}
                      />
                    )}
                    {material.materialType === "TEXT" && (
                      <FaFileAlt className="icon" style={{ color: "red" }} />
                    )}
                    {material.materialType === "PDF" && (
                      <BsFiletypePdf
                        className="icon"
                        style={{ color: "red" }}
                      />
                    )}
                    {material.materialType === "PPT" && (
                      <BsFiletypePpt
                        className="icon"
                        style={{ color: "red" }}
                      />
                    )}
                    {material.materialName}
                  </li>
                ))}
              </ul>
              <Link
                style={{ marginLeft: "450px" }}
                to={`/${selectorTopicsDetail.courseTitle}/${topic.topicName}/addcontent/${topic.topicId}`}
              >
                Add Content
              </Link>
            </Card.Body>
          </Card>
        ))
      )}

      {/* ... (existing Dialog and Modal components) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dialog-clr">Edit Topics</DialogTitle>
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
            // value={topics.topicName}
            value={updateTopic.name}
            onChange={handleInputChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <TextField
            id="outlined-multiline-static"
            label="Description"
            name="description"
            multiline
            rows={4}
            fullWidth
            value={updateTopic.description}
            onChange={handleInputChange}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        // fullScreen={fullScreen}
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
        {/* <DialogTitle id="responsive-dialog-title" ><TiWarningOutline style={{color:'red'}}/>
                   <h4><b> {"Confirm Deletion"}</b></h4>
                </DialogTitle> */}
        <DialogTitle
          id="responsive-dialog-title"
          style={{ display: "flex", alignItems: "center" }}
        >
          <TiWarningOutline
            style={{ marginRight: "10px", color: "red", fontSize: "25px" }}
          />
          <h4 style={{ paddingTop: "10px" }}>
            <b>Confirm Deletion</b>
          </h4>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            <h5>Are you sure you want to delete the topics ?</h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleDeleteClose}
            style={{
              backgroundColor: "#0F62FE",
              color: "white",
              borderRadius: "10px",
              padding: "5px 30px",
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={() => handleDelete(deleteId)}
            style={{
              backgroundColor: "#E01950",
              color: "white",
              borderRadius: "10px",
              padding: "5px 30px",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Modal
        show={show}
        onHide={handleModelClose}
        centered
        size="lg"
        style={{ marginTop: "60px", height: "680px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{viewerModelHeader}</Modal.Title> {/*Modified lines */}
        </Modal.Header>
        <Modal.Body style={{ minHeight: "83vh" }}>
          {selectedComponent}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
