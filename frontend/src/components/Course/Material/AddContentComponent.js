import React from "react";
import {
  CloseButton,
  Form,
  Button,
  Col,
  Row,
  Container,
  Modal,
} from "react-bootstrap";
import { Alert } from "@mui/material";
import { Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
// import { deleteContentRequest } from '../../../action/Course/Material/DeleteContentAction'
import {
  RESET_DELETE_SUCCESS_MESSAGE,
  deleteContentRequest,
} from "../../../actions/Course/Material/DeleteContentAction";
import { useSelector } from "react-redux";
import { IoEyeOutline } from "react-icons/io5";
import IconButton from "@mui/material/IconButton";
import { Box, Tooltip } from "@mui/material";
// import { fetchMaterialTypeRequest } from '../../../action/Course/Material/FetchMaterialTypeAction';
import { fetchMaterialTypeRequest } from "../../../actions/Course/Material/FetchMaterialTypeAction";
// import { fetchContentRequest } from '../../../action/Course/Material/FetchContentAction';
import { fetchContentRequest } from "../../../actions/Course/Material/FetchContentAction";
// import { createContentRequest } from '../../../action/Course/Material/AddContentAction';
import {
  RESET_EXISTED_MESSAGE,
  RESET_SUBMITTED_MESSAGE,
  createContentRequest,
} from "../../../actions/Course/Material/AddContentAction";
import { validateContentForm } from "../../../utils/Course/Material/AddContentValidation";
// import { fetchIndividualContentRequest } from '../../../action/Course/Material/FetchIndividualContentByIdAction'
import { fetchIndividualContentRequest } from "../../../actions/Course/Material/FetchIndividualContentByIdAction";
// import { fetchContentUrlRequest } from '../../action/Course/FetchContentUrlAction';
// import { updateContentRequest } from '../../../action/Course/Material/UpdateContentAction';

import {
  RESET_UPDATE_SUCCESS_MESSAGE,
  updateContentRequest,
  updateContentSuccess,
} from "../../../actions/Course/Material/UpdateContentAction";
import PDFViewer from "./PDFViewer";
import { BackButton } from "../../../View/Course/BackButton";
// import Video from './Video';
import AudioViewer from "./AudioViewer";
import VideoViewer from "./VideoViewer";
import { TiWarningOutline } from "react-icons/ti";
import PptViewerComponent from "./PptViewer";
// IMPORT IMAGES FOR MATERIAL
// import Video from "../../../assets/Video.png"
import Video from "../../../assets/Course/Video.png";
import Audio from "../../../assets/Course/Audio.png";
import Ppt from "../../../assets/Course/ppt.png";
import Pdf from "../../../assets/Course/pdf.png";
import Txt from "../../../assets/Course/txt.png";
import Nocontent from "../../../assets/Course/No_Content_Avaliable.png";
import Swal from "sweetalert2";

import "../../../Styles/Course/Material/CourseContent.css";
import { RESET_DELETE_SUCCESS_COURSES_MESSAGE } from "../../../actions/Admin/DeletecourseAction";
function AddContentComponent() {
  // const { topicId,materialTypeId } = props
  sessionStorage.setItem("userName", "Admin");
  const { MaterialTypeId } = {
    MaterialTypeId: "02950b1f-6bf6-4463-896e-e5319da2fd6f",
  };
  const { courseName, topicName, id } = useParams();
  const EditContent = useSelector((state) => state.fetchIndividualContent);
  const [addupdatebtn, setaddupdatebtn] = useState("Add");
  const [materialType, setMaterialType] = useState(MaterialTypeId);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const [isDisableType, setIsDisableType] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState();
  const [viewerModelHeader, setViewerModelHeader] = useState();
  const [duration, setDuration] = useState();
  const [material, setMaterial] = useState({
    topicId: id,
    materialTypeId: materialType,
    name: "",
    material: null,
    createdBy: sessionStorage.getItem("userName"),
    duration: duration,
  });
  const materialTypeMap = {};
  const [selectedContent, setselectedContent] = useState(null);
  const dispatch = useDispatch();
  const selectorMaterialType = useSelector(
    (state) => state.fetchMaterialType.materialtype
  );
  const selectorContent = useSelector((state) => state.fetchContent.content);
  console.log("Selected material", selectorContent);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [updateExist, setExistsUpdateMsg] = useState("");
  const updateExists = useSelector((state) => state.updateContent.isExists);
  console.log("update IsExists", updateExists);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (updateExists) {
      // setExistsUpdateMsg("Material already exists");
      // const timer = setTimeout(() => {
      //   setExistsUpdateMsg('');
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
      Toast.fire({ icon: "warning", title: "Material already exists" });
    }
  }, [updateExists]);

  useEffect(() => {
    dispatch(fetchMaterialTypeRequest());
    // console.log(TopicId)
    // console.log(MaterialTypeId)
    console.log("ddd", material);
  }, []);
  const handleClearForm = () => {
    setMaterial({
      topicId: id,
      materialTypeId: materialType,
      name: "",
      material: null,
      createdBy: sessionStorage.getItem("userName"),
      duration: duration,
    });
    setErrors({ name: "", material: "" });
    removecontent();
    setIsDisableType(false);
    setaddupdatebtn("Add");
    setIsEditing(false);
  };
  useEffect(() => {
    if (EditContent.isFetched) {
      setaddupdatebtn("Update");
      console.log("editcontent", EditContent);
      const updatedmaterial = {
        materialId: EditContent.content.materialId,
        name: EditContent.content.name,
        material: EditContent.content.filePath,
        modifiedBy: sessionStorage.getItem("userName"),
      };
      setMaterial(updatedmaterial);
      setIsDisableType(true);
      handleEditMaterial(updatedmaterial.material);
    }
  }, [EditContent]);
  useEffect(() => {
    fetchContentByType(id, materialType);
    setMaterial({ ...material, materialTypeId: materialType });
  }, [materialType]);
  // useEffect=(()=>{
  //   console.log("topic"+topicId);
  //   console.log("materialType"+materialType);
  // });
  // useEffect(() => {
  // dispatch(fetchMaterialTypeRequest());
  // });
  const fetchContentByType = async (id, materialTypeId) => {
    console.log("tid" + id);
    console.log("mtid" + materialTypeId);
    const formData = {
      topicId: id,
      materialTypeId: materialTypeId,
    };
    console.log(formData);
    await dispatch(fetchContentRequest(formData));
  };
  const isExist = useSelector((state) => state.addContent.isExisted);
  const [existMsg, setExistMsg] = useState("");
  useEffect(() => {
    if (isExist) {
      // setExistMsg('Material already exists');
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
      Toast.fire({ icon: "warning", title: "Material already exists" });

      dispatch({ type: RESET_EXISTED_MESSAGE });
    }
  }, [isExist, dispatch]);

  const addContentSuccessState = useSelector(
    (state) => state.addContent.isSubmitted
  );

  // -----------Model opening for pdf viewer model opening function---------//

  const handleClose = () => {
    setShow(false);
    setViewerModelHeader("");
  };
  const handleShow = () => setShow(true);
  // -----------Model opening for pdf viewer model opening function end---------//

  const [successMsg, setSuccessMsg] = useState("");
  useEffect(() => {
    if (addContentSuccessState) {
      // setSuccessMsg('Material added successfully');

      // const timer = setTimeout(() => {
      //   setSuccessMsg('');
      // }, 8000);

      // // Clear the timeout if the component unmounts
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
      Toast.fire({ icon: "success", title: "Material added successfully" });
      dispatch({ type: RESET_SUBMITTED_MESSAGE });
    }
  }, [addContentSuccessState, dispatch]);

  const handleDeleteClickOpen = (materialId) => {
    console.log("dia", materialId);
    setDeleteId(materialId);
    setOpenDelete(true);
  };

  // Success Message for After delete course

  // UseSeletor for Fetch the Success True Message

  const MaterialDeleteSuccessMessage = useSelector(
    (state) => state.deleteContent.isDeletSuccessMessage
  );
  useEffect(() => {
    if (MaterialDeleteSuccessMessage) {
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
      Toast.fire({ icon: "success", title: "Material Deleted successfully" });
    }
    dispatch({ type: RESET_DELETE_SUCCESS_MESSAGE });
  }, [MaterialDeleteSuccessMessage, dispatch]);

  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteId("");
    fetchContentByType(id, materialType);
  };
  const handleDelete = (materialId) => {
    console.log("delete material", materialId);
    dispatch(deleteContentRequest(materialId));
    handleDeleteClose();
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setselectedContent(fileUrl);
    handleMaterial({ target: { files: [file] } });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const {name,description,isactive}=e.target;
    setMaterial((material) => ({ ...material, [name]: value }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "*/*",
  });
  const fetchIndividualContentById = async (materialid) => {
    await dispatch(fetchIndividualContentRequest(materialid));
  };

  // UPDATA CONETENT SUCCESS MESSGAE  ---- ALTER AND USE SELECTOR

  const UpdateContentSuccessMessage = useSelector(
    (state) => state.updateContent.contentUpdatedSuccessMessgae
  );

  console.log("updatecontenetmwss", UpdateContentSuccessMessage);

  useEffect(() => {
    if (UpdateContentSuccessMessage) {
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
      Toast.fire({ icon: "success", title: "Material Updated Successfully" });
    }

    dispatch({ type: RESET_UPDATE_SUCCESS_MESSAGE });
    setIsEditing(false);
  }, [UpdateContentSuccessMessage]);

  const handleEditButton = (materialId) => {
    // console.log(materialId);
    // fetchIndividualContentById(materialId)
    dispatch(fetchIndividualContentRequest(materialId));

    console.log("Initiate Editing Content", EditContent);
    if (EditContent.isFetched) {
      setaddupdatebtn("Update");
      console.log("editcontent Sucess", EditContent);
      const updatedmaterial = {
        materialId: EditContent.content.materialId,
        name: EditContent.content.name,
        material: EditContent.content.filePath,
        modifiedBy: sessionStorage.getItem("userName"),
      };
      setMaterial(updatedmaterial);
      setIsDisableType(true);
      handleEditMaterial(updatedmaterial.material);
    }
    setIsEditing(true);
  };

  const handleMaterial = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setMaterial((material) => ({
        ...material,
        material: file,
      }));
      setselectedContent(file.name);

      // Check if the file is audio or video
      if (file.type.includes("audio") || file.type.includes("video")) {
        // Create a temporary HTML5 media element (audio or video) to fetch duration
        const media = document.createElement(
          file.type.includes("audio") ? "audio" : "video"
        );
        media.src = URL.createObjectURL(file);
        media.onloadedmetadata = async () => {
          // Fetch duration and format it as hh:mm:ss
          let duration = media.duration;
          let hours = Math.floor(duration / 3600);
          let minutes = Math.floor((duration - hours * 3600) / 60);
          let seconds = Math.floor(duration - hours * 3600 - minutes * 60);
          hours = hours < 10 ? "0" + hours : hours;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          const fdura=`${hours}:${minutes}:${seconds}` 
          setDuration(fdura);
          setMaterial((material) => ({
            ...material,
            duration: fdura
          }));
          // Revoke the object URL to avoid memory leaks
          URL.revokeObjectURL(media.src);
        };
      } else {
        // Set default duration for non-media files
        setDuration("01:00:00");
      }
    }
  };
  const handleEditMaterial = (file) => {
    setselectedContent(file.name);
    console.log(file);
  };

  const handleMaterialType = (event) => {
    setMaterialType(event.target.value);
    console.log("eventdisplay", event.target.innerText);
  };

  const removecontent = () => {
    setselectedContent(null);
  };

  const handleSubmit = async (event) => {
    console.log("po", material);
    handleMaterial(event);
    event.preventDefault();
    setaddupdatebtn("Add");
    selectorMaterialType.forEach((item) => {
      materialTypeMap[item.materialTypeId] = item.type;
    });
    console.log(materialTypeMap);
    const selectedLabel = materialTypeMap[materialType];
    console.log(selectedLabel);
    const isFormValid = validateContentForm(material, setErrors, selectedLabel);

    if (isFormValid) {
      try {
        if (material.materialId == undefined || material.materialId == "") {
          console.log("materialadd", material);
          await dispatch(createContentRequest(material));
        } else {
          await dispatch(updateContentRequest(material));
          setIsDisableType(false);
        }
        await fetchContentByType(id, materialType);
        setMaterial({
          topicId: id,
          materialTypeId: materialType,
          name: "",
          material: null,
          createdBy: sessionStorage.getItem("userName"),
          duration: duration,
        });
        removecontent();
      } catch (error) {
        console.error("Error creating course:", error);
      }
    }
    console.log("material", material);

    // console.log("createcontentrequest",dispatch(createContentRequest(material)));
  };
  const divStyle = {
    width: "40vw",
    boxShadow: "0px 4px 8px #23275c",
    borderRadius: "20px",
    marginTop: "30px",
    marginLeft: "135px",
    backgroundColor: "#F6F5F5",
  };

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

  {
    /*images based on material type */
  }

  const MaterialImage = ({ materialType }) => {
    switch (materialType) {
      case "VIDEO":
        return <img src={Video} alt="Video" width="80" height="80" />;
      case "AUDIO":
        return <img src={Audio} alt="Audio" width="80" height="80" />;
      case "PDF":
        return <img src={Pdf} alt="pdf" width="80" height="80" />;
      case "PPT":
        return <img src={Ppt} alt="ppt" width="80" height="80" />;
      case "TEXT":
        return <img src={Txt} alt="text" width="80" height="80" />;

      default:
        return null;
    }
  };

  return (
    <>
      <Row className="mt-4">
        <Col sx={10} md={10} className="mt-3">
          <h2>
            <b>
              {courseName} / {topicName}
            </b>
          </h2>
        </Col>
        <Col className="text-end mt-3">
          <BackButton />
        </Col>
      </Row>

      <Box style={{ display: "flex", flexDirection: "row", width: "105%" }}>
        <Container
          style={{
            ...divStyle,
            overflowy: "auto",
            maxHeight: "150vh",
            marginTop: "5vh",
            marginLeft: "20px",
            backgroundColor: "#F6F5F5",
            fontSize: "18px",
          }}
        >
          <Row>
            <Col></Col>
            <Col>
              {!open && successMsg && (
                <Alert severity="success" className="mt-3">
                  {successMsg}
                </Alert>
              )}
              {!open && existMsg && (
                <Alert severity="warning" className="mt-3">
                  {existMsg}
                </Alert>
              )}

              {!open && updateExist && (
                <Alert severity="warning" className="mt-3">
                  {updateExist}
                </Alert>
              )}
            </Col>
            <Col></Col>
          </Row>
          <Row>
            {/* <Col md={3}></Col> */}
            <Col md={6}>
              {/* fetch material type */}
              <section className="pt-5">
                <Form
                  onSubmit={handleSubmit}
                  style={{
                    marginBottom: "80px",
                    width: "160%",
                    marginLeft: "20%",
                  }}
                >
                  <h3>
                    <b>Add Content</b>
                  </h3>
                  <hr />
                  <Form.Label>
                    <b>Material Type</b>
                  </Form.Label>

                  <Form.Select
                    aria-label="Default select example"
                    disabled={isDisableType}
                    value={materialType}
                    onChange={(e) => handleMaterialType(e)}
                  >
                    <option>Select Material Type</option>

                    {selectorMaterialType.map((materialType) => (
                      <option value={materialType.materialTypeId}>
                        {materialType.type}
                      </option>
                    ))}
                    {/* content form */}
                  </Form.Select>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>
                      <b>Content Name</b>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Content Name"
                      name="name"
                      value={material.name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                  {errors.name && <p className="error">{errors.name}</p>}

                  <Form.Group>
                    <Form.Label>
                      <b>Content Upload</b>
                    </Form.Label>

                    <Card {...getRootProps()} className="dropzone">
                      <Card.Body className="text-center">
                        <input {...getInputProps()} type="file" />
                        {selectedContent ? (
                          <p>
                            {" "}
                            {isDragActive ? (
                              "Drag the course thumbnail here ..."
                            ) : (
                              <span>
                                Click to select Material
                                <br /> or <br />
                                <span className="upload-link">
                                  Click to upload
                                </span>
                              </span>
                            )}
                          </p>
                        ) : (
                          <p>
                            {isDragActive ? (
                              "Drag the course thumbnail here ..."
                            ) : (
                              <span>
                                Click to select Material
                                <br /> or <br />
                                <span className="upload-link">
                                  Click to upload
                                </span>
                              </span>
                            )}
                          </p>
                        )}
                      </Card.Body>
                      {selectedContent == null ? (
                        <></>
                      ) : (
                        <Card.Footer>
                          {selectedContent}
                          <CloseButton
                            className="position-absolute right-0 end-0"
                            style={{ color: "red" }}
                            onClick={removecontent}
                            aria-label="remove file"
                          />
                        </Card.Footer>
                      )}
                    </Card>
                    <div className="bg-light mt-1">{}</div>
                    {/* {errors.thumbnailimage && <p className="error">{errors.thumbnailimage}</p>} */}
                  </Form.Group>
                  {errors.material && (
                    <p className="error">{errors.material}</p>
                  )}

                  <Button
                    className="mt-3"
                    style={{ paddingLeft: "25px", paddingRight: "25px" }}
                    type="submit"
                  >
                    {addupdatebtn} Material
                  </Button>
                </Form>
                {/* <Button className="mt-3" style={{ paddingLeft: '25px', paddingRight: '25px', position: 'relative', top: '-16.3vh', left: '22vw' }} type="clear" onClick={() => handleClearForm()}>Clear Material</Button> */}
                {isEditing && (
                  <Button
                    className="mt-3"
                    style={{
                      paddingLeft: "25px",
                      paddingRight: "25px",
                      // marginTop:'20px',
                      position: "relative",
                      top: "-17.8vh",
                      left: "26vw",
                      backgroundColor: "#E01950",
                    }}
                    type="clear"
                    onClick={handleClearForm}
                  >
                    Clear Material
                  </Button>
                )}
              </section>
            </Col>
          </Row>
        </Container>

        {/* fetch contents  */}

        <Box
          style={{
            overflowY: "auto",
            flex: 1,
            marginTop: "50px",
            marginLeft: "30px",
            width: "60vw",
          }}
        >
          {selectorContent == "" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "70px",
              }}
            >
              <img src={Nocontent} alt="No Content Available" />
              <p>
                <b>No Contents available</b>. Please Select any material type
                and add your content
              </p>
            </div>
          ) : (
            selectorContent.map((content) => (
              <Box width={"100%"}>
                <ListGroup className="overflow-auto" style={{}}>
                  <ListGroup.Item style={{ backgroundColor: "#F6F5F5" }}>
                    <div style={{ backgroundColor: "#F6F5F5" }}>
                      <div class="row">
                        <div class="col">
                          <MaterialImage materialType={content.materialType} />
                        </div>
                        <div class="col-7">
                          <h4>{content.name}</h4>
                          <h6>{content.topicName}</h6>
                        </div>
                        <div className="col">
                          <Box display="flex" alignItems="center">
                            <Tooltip title="Preview material" arrow>
                              <IconButton
                                className="ms-1"
                                onClick={() =>
                                  handlePreview(
                                    content.filePath,
                                    content.materialType,
                                    content.name,
                                    content.materialId
                                  )
                                }
                              >
                                <IoEyeOutline
                                  style={{ fontSize: "24px" }}
                                  color="#5dbea3"
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit material" arrow>
                              {" "}
                              <IconButton
                                className="ms-1"
                                onClick={() =>
                                  handleEditButton(content.materialId)
                                }
                              >
                                <FaRegEdit
                                  style={{ fontSize: "24px" }}
                                  color="#604CC3"
                                />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete material" arrow>
                              {" "}
                              <IconButton
                                className="ms-1"
                                onClick={() =>
                                  handleDeleteClickOpen(content.materialId)
                                }
                              >
                                <MdOutlineDelete
                                  style={{ fontSize: "24px" }}
                                  color="#C80036"
                                />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
                <br />
              </Box>
            ))
          )}
        </Box>
      </Box>
      {/*-----------PDF viewer Model -------------------- */}

      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        style={{ marginTop: "60px", height: "680px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{viewerModelHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ minHeight: "83vh" }}>
          {selectedComponent}
        </Modal.Body>
      </Modal>

      {/* -------------------------------------Delete Confirmation Box ------------------------------------------ */}
      <Dialog
        // fullScreen={fullScreen}
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
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
            <h5> Are you sure you want to delete the content ?</h5>
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
          {/* <Button autoFocus onClick={handleDeleteClose}>
                        Cancel
                    </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddContentComponent;
