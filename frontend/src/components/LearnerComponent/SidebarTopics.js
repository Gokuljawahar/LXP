import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../Styles/Learner/Navbarone.css";
import { useDispatch, useSelector } from "react-redux";
import PDFViewer from "./PDFViewer";
import { CiMusicNote1 } from "react-icons/ci";
import { BsFiletypePdf, BsFiletypePpt } from "react-icons/bs";
import { FaFileAlt, FaCheck } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import CourseDescription from "./CourseDescription";
import LearnerAudioViewer from "./LearnerAudioViewer";
import LearnerVideoViewer from "./LearnerVideoViewer";
import { fetchQuizIdRequest } from "../../actions/Quiz And Feedback Module/Learner/FetchQuizIdAction";
import PptViewerComponent from "./Pptxday";
import { getIndividualEnrollCourseRequest } from '../../actions/LearnerAction/FetchIndividualEnrolledCourseAction';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Row, Col } from "react-bootstrap";
import { FaBook, FaBookOpen } from "react-icons/fa";
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from "framer-motion";
 
function SidebarTopics() {
  const [learnerfeedbacks, setlearnerfeedbacks] = useState([false]);
  const [topics, setTopics] = useState();
  const [topic, setTopic] = useState();
  const [allTopicsDisplayed, setAllTopicsDisplayed] = useState(false);
 
  const { courseId } = useParams();
 
  sessionStorage.setItem("courseId", courseId);
  const [topicId, settopicId] = useState();
  const selectedCourseSelector = useSelector((state) => state.fetchEnrolledIndividualCourse.individualcourse);
  const [selectedCourse, setselectedCourse] = useState();
  const quiz = useSelector((state) => state.quizId.quizId);
  const [quizId, setQuizId] = useState();
 
  useEffect(() => {
    setQuizId(quiz);
  }, [quiz]);
 
  const userId = sessionStorage.getItem("UserSessionID");
  const learnertopicfeedback = useSelector((state) => state.learnerfeedbackresult.learnersfeedbackresultdetails?.isTopicFeedbackSubmitted);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(getIndividualEnrollCourseRequest(courseId));
  }, [courseId, dispatch]);
 
  useEffect(() => {
    setselectedCourse(selectedCourseSelector);
  }, [selectedCourseSelector]);
 
  const [folders, setFolders] = useState([
    {
      name: selectedCourse ? selectedCourse.enrolledCoursename : "Loading...",
      isOpen: false,
      topics: selectedCourse && selectedCourse.topics
        ? selectedCourse.topics.map((topic, index) => ({
          name: topic.topicName,
          topicid: topic.topicId,
          isQuiz: topic.isQuiz ? !topic.isAttemptOver : false,
          isFeedBack: topic.isFeedBack,
          isPassed: topic.isPassed,
          isAttemptOver: topic.isAttemptOver,
          isOpen: index === 0,
          isFeedbackGiven: false,
          materials: topic.materials
            ? topic.materials.map((material) => ({
              materialId: material.materialId,
              materialname: material.materialName,
              materiallink: material.material,
              isCompleted: material.isCompleted,
              materialType: material.materialType,
            }))
            : [],
        }))
        : [],
    },
  ]);
 
  useEffect(() => {
    setFolders([
      {
        name: selectedCourse ? selectedCourse.enrolledCoursename : "Loading...",
        isOpen: false,
        topics: selectedCourse && selectedCourse.topics
          ? selectedCourse.topics.map((topic, index) => ({
            name: topic.topicName,
            topicid: topic.topicId,
            isOpen: index === 0,
            isQuiz: topic.isQuiz ? !topic.isAttemptOver : false,
            isFeedBack: topic.isFeedBack,
            isPassed: topic.isPassed,
            isAttemptOver: topic.isAttemptOver,
            isFeedbackGiven: false,
            materials: topic.materials
              ? topic.materials.map((material) => ({
                materialId: material.materialId,
                materialname: material.materialName,
                materiallink: material.material,
                isCompleted: material.isCompleted,
                materialType: material.materialType,
              }))
              : [],
          }))
          : [],
      },
    ]);
  }, [selectedCourse]);
 
  const [selectedComponent, setSelectedComponent] = useState(
    <CourseDescription courseId={courseId} />
  );
  const [openedMaterials, setOpenedMaterials] = useState(() => {
    const storedOpenedMaterials = sessionStorage.getItem(`openedMaterials_${userId}`);
    return storedOpenedMaterials ? new Set(JSON.parse(storedOpenedMaterials)) : new Set();
  });
  const [completedTopics, setCompletedTopics] = useState(() => {
    const storedCompletedTopics = sessionStorage.getItem(
      `completedTopics_${userId}`
    );
    return storedCompletedTopics
      ? new Set(JSON.parse(storedCompletedTopics))
      : new Set();
  });
 
  useEffect(() => {
    const storedOpenedMaterials = sessionStorage.getItem(
      `openedMaterials_${userId}`
    );
    if (storedOpenedMaterials) {
      setOpenedMaterials(new Set(JSON.parse(storedOpenedMaterials)));
    }
  }, [userId]);
 
  const saveOpenedMaterials = (openedMaterials) => {
    sessionStorage.setItem(
      `openedMaterials_${userId}`,
      JSON.stringify(Array.from(openedMaterials))
    );
  };
 
  const saveCompletedTopics = (completedTopics) => {
    sessionStorage.setItem(
      `completedTopics_${userId}`,
      JSON.stringify(Array.from(completedTopics))
    );
  };
 
  const fetchquizid = async (topicindex) => {
    console.log("handleAddQuiz called with topicId:", folders[0].topics[topicindex].topicid);
    settopicId(folders[0].topics[topicindex].topicid);
    await dispatch(fetchQuizIdRequest(folders[0].topics[topicindex].topicid));
  };
 
  const alertdisplayquiz = () => {
    const Toast = Swal.mixin({
      toast: true,
      background: 'red',
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
 
    Toast.fire({
      icon: 'error',
      iconColor: 'white',
      title: 'Please complete the quiz for the previous topic before proceeding.',
      customClass: {
        popup: 'custom-toast',
      },
    });
  };
 
  const folderVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3 } }
  };
 
  const topicVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };
 
  const toggleFolder = (index) => {
    const updatedFolders = [...folders];
    updatedFolders[index].isOpen = !updatedFolders[index].isOpen;
    setFolders(updatedFolders);
    setTopics(selectedCourseSelector.topics);
  };
 
  const toggleTopic = async (folderIndex, topicIndex, e) => {
    e.stopPropagation();
 
    if (topicIndex === 0 || completedTopics.has(folders[folderIndex].topics[topicIndex - 1].name)) {
      const updatedFolders = [...folders];
      updatedFolders[folderIndex].topics = updatedFolders[folderIndex].topics.map(
        (topic, index) => ({
          ...topic,
          isOpen: index === topicIndex,
        })
      );
      setFolders(updatedFolders);
 
      const topic = topics[topicIndex];
      setTopic(topic);
 
      if (topicIndex === folders[folderIndex].topics.length - 1) {
        setAllTopicsDisplayed(true);
      }
    } else {
      alertdisplayquiz();
    }
  };
 
  const allMaterialsOpened = (topic) => {
    return topic.materials.every(material => openedMaterials.has(material.materialId));
  };
 
  const opencontent = (type, materiallink, materialId, materialname) => {
    setOpenedMaterials((prevOpenedMaterials) => {
      const updatedMaterials = new Set(prevOpenedMaterials);
      updatedMaterials.add(materialId);
      saveOpenedMaterials(updatedMaterials);
 
      const currentTopic = folders[0].topics.find(topic =>
        topic.materials.some(material => material.materialId === materialId)
      );
      if (currentTopic && allMaterialsOpened(currentTopic)) {
        console.log("All materials for this topic have been opened");
      }
 
      return updatedMaterials;
    });
 
    // Update the folders state to mark the material as completed
    setFolders(prevFolders => {
      const updatedFolders = prevFolders.map(folder => ({
        ...folder,
        topics: folder.topics.map(topic => ({
          ...topic,
          materials: topic.materials.map(material =>
            material.materialId === materialId
              ? { ...material, isCompleted: true }
              : material
          )
        }))
      }));
      return updatedFolders;
    });
 
    switch (type) {
      case "PPT":
        setSelectedComponent(
          <PptViewerComponent material={materiallink} materialId={materialId} materialName={materialname} />
        );
        break;
      case "PDF":
        setSelectedComponent(
          <PDFViewer material={materiallink} materialId={materialId} />
        );
        break;
      case "AUDIO":
        setSelectedComponent(
          <LearnerAudioViewer material={materiallink} materialId={materialId} materialName={materialname} />
        );
        break;
      case "VIDEO":
        setSelectedComponent(
          <LearnerVideoViewer material={materiallink} materialId={materialId} materialName={materialname} />
        );
        break;
      default:
        break;
    }
  };
 
  const [feedbackGiven, setFeedbackGiven] = useState(false);
 
  const completeTopic = (topicName, topicId) => {
    setCompletedTopics((prevCompletedTopics) => {
      const updatedCompletedTopics = new Set(prevCompletedTopics);
      updatedCompletedTopics.add(topicName);
      saveCompletedTopics(updatedCompletedTopics);
      sessionStorage.setItem("topicId", topicId);
      navigate("/instruction");
      return updatedCompletedTopics;
    });
 
    setFolders(prevFolders => {
      const updatedFolders = [...prevFolders];
      const currentTopicIndex = updatedFolders[0].topics.findIndex(topic => topic.name === topicName);
      if (currentTopicIndex < updatedFolders[0].topics.length - 1) {
        updatedFolders[0].topics[currentTopicIndex + 1].isOpen = true;
      }
      return updatedFolders;
    });
  };
 
  const giveFeedback = (topicId) => {
    setFeedbackGiven(true);
    sessionStorage.setItem("topicId", topicId);
    navigate("/topicfeedbackquestion");
 
    setFolders(prevFolders => {
      const updatedFolders = [...prevFolders];
      updatedFolders[0].topics = updatedFolders[0].topics.map(topic =>
        topic.topicid === topicId ? {...topic, isFeedbackGiven: true} : topic
      );
      return updatedFolders;
    });
  };
 
  useEffect(() => { setlearnerfeedbacks(learnertopicfeedback); }, [learnertopicfeedback]);
 
  return (
    <>
      <Row className="learner_courseView_navbar">
        <AppBar position="static" id="learner_courseView_navbar" >
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                marginLeft: '20px',
              }}
            >
              LXP
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                marginLeft: '20px',
              }}
            >
              LXP
            </Typography>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', marginRight: "100px" }} >
              <Button onClick={() => navigate("/LearnerenrolledCourse")}
                variant="contained"
                sx={{ my: 2, color: 'white', display: 'block' }}
                id="learner_courseView_backbtn"
              >Back</Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Row>
      <Row>
        <Col md={10} xs={8} className="content">
          {selectedComponent}
        </Col>    
        <Col md={2} xs={4} style={{ color: 'white', backgroundColor: '#EEF5FF', height: '100vh' }}>
        <Row className="d-flex">
          <Row className="side">
            <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>Course Contents</h3>
            <ul className="tree">
              <AnimatePresence>
                {folders.map((folder, folderIndex) => (
                  <motion.li
                    key={folderIndex}
                    className={`folder ${folder.isOpen ? "open" : ""}`}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={folderVariants}
                  >
                    <div onClick={() => toggleFolder(folderIndex)}>
                      {folder.isOpen ? <FaBookOpen /> : <FaBook />} {folder.name}
                    </div>
                    <AnimatePresence>
                      {folder.isOpen && (
                        <motion.ul
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={folderVariants}
                        >
                          {folder.topics?.map((topic, topicIndex) => (
                            <motion.li
                              key={topicIndex}
                              className={`folder ${topic.isOpen ? "open" : ""}`}
                              variants={topicVariants}
                            >
                              <div onClick={(e) => toggleTopic(folderIndex, topicIndex, e)}>
                                {topic.isOpen ? <FaBookOpen /> : <FaBook />} {topic.name}
                              </div>
                              <AnimatePresence>
                                {topic.isOpen && (
                                  <motion.ul
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={folderVariants}
                                  >
                                    {topic.materials.map((content, contentIndex) => (
                                      <li key={contentIndex} className="file" onClick={(e) => {
                                        e.stopPropagation();
                                        opencontent(content.materialType, content.materiallink, content.materialId, content.materialname);
                                      }}>
                                        {content.materialType === "VIDEO" ? (
                                          <CiYoutube className="icon" style={{ color: "blue", fontSize: "20px" }} />
                                        ) : content.materialType === "AUDIO" ? (
                                          <CiMusicNote1 className="icon" style={{ color: "blue" }} />
                                        ) : content.materialType === "TEXT" ? (
                                          <FaFileAlt className="icon" style={{ color: "red" }} />
                                        ) : content.materialType === "PDF" ? (
                                          <BsFiletypePdf className="icon" style={{ color: "red" }} />
                                        ) : (
                                          <BsFiletypePpt className="icon" style={{ color: "red" }} />
                                        )}
                                        {content.materialname}
                                        {content.isCompleted && (
                                          <FaCheck className="icon" style={{ color: "green", marginLeft: "5px" }} />
                                        )}
                                      </li>
                                    ))}
                                    {allMaterialsOpened(topic) ? (
                                      <>
                                        {topic.isQuiz ? (
                                          <button
                                            className="btn btn-primary m-2"
                                            onClick={() => completeTopic(topic.name, topic.topicid)}
                                          >
                                            Take Quiz
                                          </button>
                                        ) : (
                                          <button className="btn btn-primary m-2" disabled>
                                            Take Quiz
                                          </button>
                                        )}
                                        {topic.isFeedBack && !topic.isFeedbackGiven && (
                                          <button
                                            className="btn btn-primary m-2"
                                            onClick={() => giveFeedback(topic.topicid)}
                                          >
                                            Give Feedback
                                          </button>
                                        )}
                                      </>
                                    ) : (
                                      <>
                                        <button className="btn btn-primary m-2" disabled>
                                          Take Quiz
                                        </button>
                                        {topic.isFeedBack && !topic.isFeedbackGiven && (
                                          <button className="btn btn-primary m-2" disabled>
                                            Give Feedback
                                          </button>
                                        )}
                                      </>
                                    )}
                                    {topic.isAttemptOver && <p style={{color:'red'}}>Attempt is over</p>}
                                    {topic.isPassed && <p style={{color:'green'}}> You are Passed</p>}
                                    {topicIndex === folder.topics.length - 1 && (
                                      <motion.li
                                        variants={topicVariants}
                                        className="end-message"
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                      >
                                        Topics for this course are over. Thank you!. To explore new courses <a href="/LearnerPage">Click here!!!</a>
                                      </motion.li>
                                    )}
                                  </motion.ul>
                                )}
                              </AnimatePresence>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </Row>
        </Row>
        </Col>
      </Row>
    </>
  );
}
 
export default SidebarTopics;
