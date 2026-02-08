// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { Container, Row, Col } from "react-bootstrap";
// import { motion } from "framer-motion";
// import enrollmentMiddleware from "../../middleware/LearnerMiddleware/LearnerPostEnroll";
// import { fetchCourseRequest } from "../../actions/Course/Course/FetchCouseDetailsAction";
// import {
//   fetchenrollCourse,
//   selectCourse,
// } from "../../actions/LearnerAction/EnrolledCourseAction";
// import "../../Styles/Learner/LearnerCourseLandingPage.css";
// import Swal from "sweetalert2";
// import { Bluetooth } from "@mui/icons-material";
// import { blueGrey } from "@mui/material/colors";
// const Content = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const course = useSelector((state) => state.fetchindividualCourse.courses);
//   const Enrolledcourseslength = useSelector((state) => state.enroll.course[0]);
//   const learnerId = sessionStorage.getItem("UserSessionID");
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isEnrolled, setIsEnrolled] = useState(new Set());

//   const alertdisplayenrollment = () => {
//     const Toast = Swal.mixin({
//       toast: true,
//       background: "#21903d",
//       position: "top",
//       showConfirmButton: false,
//       timer: 2000,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.onmouseenter = Swal.stopTimer;
//         toast.onmouseleave = Swal.resumeTimer;
//       },
//     });

//     Toast.fire({
//       icon: "success",
//       iconColor: "white",
//       title: "Enrolled successfully",
//       customClass: {
//         popup: "custom-toast",
//       },
//     });
//   };

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchCourseRequest(id));
//     }
//   }, [id, dispatch]);

//   useEffect(() => {
//     dispatch(fetchenrollCourse(learnerId));
//   }, [learnerId]);

//   useEffect(() => {
//     if (Enrolledcourseslength) {
//       const enrolledCourseIds = new Set();
//       Enrolledcourseslength.forEach((enrolledCourse) => {
//         enrolledCourseIds.add(enrolledCourse.enrolledCourseId);
//       });
//       setIsEnrolled(enrolledCourseIds);
//     }
//   }, [Enrolledcourseslength]);

//   const handleEnrollCourse = (courseId) => {
//     const maxCourses = 3;

//     if (
//       Enrolledcourseslength &&
//       typeof Enrolledcourseslength.length === "number"
//     ) {
//       if (Enrolledcourseslength.length >= maxCourses) {
//         const Toast = Swal.mixin({
//           toast: true,
//           background: "red",
//           position: "top",
//           showConfirmButton: false,
//           timer: 3000,
//           timerProgressBar: true,
//           didOpen: (toast) => {
//             toast.onmouseenter = Swal.stopTimer;
//             toast.onmouseleave = Swal.resumeTimer;
//           },
//           customClass: {
//             popup: "custom-toast",
//             title: "custom-toast-title",
//           },
//         });

//         Toast.fire({
//           icon: "error",
//           iconColor: "white",
//           title: "You have reached the course enrollment limit!",
//         });

//         return;
//       }
//     }
//     enrollmentMiddleware(courseId, learnerId).then(() => {
//       alertdisplayenrollment();
//       setIsEnrolled((prevIsEnrolled) => new Set([...prevIsEnrolled, courseId]));
//     });
//   };

//   const handleToggleDescription = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div className="course-page-wrapper">
//       <div className="course-header">
//         <Container>
//           <Row>
//             <Col md={8}>
//               <motion.div
//                 initial={{ y: -50, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <h1 className="course-title">{course.title}</h1>
//               </motion.div>
//             </Col>
//             <Col md={4}>
//               <motion.div
//                 initial={{ y: 50, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="course-thumbnail-wrapper"
//               >
//                 <img
//                   className="course-thumbnail"
//                   style={{ width: "250px", height: "250px" }}
//                   src={course.thumbnail}
//                   alt="Course Thumbnail"
//                 />
//               </motion.div>
//             </Col>
//           </Row>
//         </Container>
//       </div>

//       <Container className="course-content">
//         <Row>
//           <Col md={8}>
//             <motion.div
//               initial={{ x: -100, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.8, delay: 0.5 }}
//             >
//               <div className="course-details">
//                 <div className="course-info-container">
//                   <div className="course-info-item">
//                     <span className="course-info-label">Category</span>
//                     <span className="course-info-value">{course.category}</span>
//                   </div>
//                   <div className="course-info-item">
//                     <span className="course-info-label">Level</span>
//                     <span className="course-info-value">{course.level}</span>
//                   </div>
//                   <div className="course-info-item">
//                     <span className="course-info-label">Duration</span>
//                     <span className="course-info-value">
//                       {course.duration} hrs
//                     </span>
//                   </div>
//                 </div>
//                 <div className="course-description">
//                   <h3>Course Description</h3>
//                   <p>
//                     {isExpanded
//                       ? course.description
//                       : `${course.description?.substring(0, 150)}...`}
//                   </p>
//                   {course.description && course.description.length > 150 && (
//                     <button
//                       className="toggle-description-button"
//                       onClick={handleToggleDescription}
//                     >
//                       {isExpanded ? "Show Less" : "Show More"}
//                     </button>
//                   )}
//                 </div>
//                 <div className="course-actions">
//                   <button
//                     className="btn btn-primary"
//                     disabled={isEnrolled.has(course.courseId)}
//                     style={{ marginLeft: "600px", background: "#182f85" }}
//                     onClick={() => handleEnrollCourse(course.courseId)}
//                   >
//                     {isEnrolled.has(course.courseId) ? "Enrolled" : "Enroll"}
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Content;





























import React, { useState, useEffect } from "react";
import { useParams , useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import enrollmentMiddleware from '../../middleware/LearnerMiddleware/LearnerPostEnroll';
import { fetchCourseRequest } from "../../actions/Course/Course/FetchCouseDetailsAction";
import { fetchenrollCourse, selectCourse, } from "../../actions/LearnerAction/EnrolledCourseAction";
import '../../Styles/Learner/LearnerCourseLandingPage.css';
import Swal from 'sweetalert2';
import { Bluetooth } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
import { BeatLoader } from 'react-spinners';

const Content = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.fetchindividualCourse.courses);
  const Enrolledcourseslength = useSelector((state) => state.enroll.course[0]);
  const learnerId = sessionStorage.getItem('UserSessionID');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [filteredCourses, setFilteredCourses] = useState([]);

  const alertdisplayenrollment = () => {
    const Toast = Swal.mixin({
      toast: true,
      background: '#21903d',
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
 
    Toast.fire({
      icon: "success",
      iconColor: 'white',
      title: "Enrolled successfully",
      customClass: {
        popup: 'custom-toast'
      }
    })

    localStorage.setItem('justEnrolled', 'true');


    setTimeout(() => {
      setIsLoading(true);
      window.location.reload();
    }, 3500);
  
  };


  


  useEffect(() => {
    if (id) {
      dispatch(fetchCourseRequest(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchenrollCourse(learnerId));
  }, [learnerId]);

  useEffect(() => {
    if (Enrolledcourseslength) {
      const enrolledCourseIds = new Set();
      Enrolledcourseslength.forEach(enrolledCourse => {
        enrolledCourseIds.add(enrolledCourse.enrolledCourseId);
      });
      setIsEnrolled(enrolledCourseIds);
    }
  }, [Enrolledcourseslength]);


  useEffect(() => {
    // Check if the user has just enrolled
    if (localStorage.getItem('justEnrolled') === 'true') {
      // Clear the flag
      localStorage.removeItem('justEnrolled');
      setIsLoading(false);
 
      // Navigate to "/LearnerenrolledCourse" after a delay
      navigate("/LearnerenrolledCourse");
 
    }
  }, []);

  const handleEnrollCourse = (courseId) => {
    const maxCourses = 3;
 
    if (Enrolledcourseslength && typeof Enrolledcourseslength.length === 'number') {
      if (Enrolledcourseslength.length >= maxCourses) {
        const Toast = Swal.mixin({
          toast: true,
          background: 'red',
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
 
          },
          customClass: {
            popup: 'custom-toast',
            title: 'custom-toast-title'
          }
        });
 
        Toast.fire({
          icon: "error",
          iconColor: 'white',
          title: "You have reached the course enrollment limit!",
        });
       
        return;
 
 
      }
    }
    enrollmentMiddleware(courseId, learnerId).then(() => {
      alertdisplayenrollment();
      setIsEnrolled(prevIsEnrolled => new Set([...prevIsEnrolled, courseId]));
 
    });
    
  
  };


 

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };


  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginRight: "0%" }}>
        <BeatLoader color={"#123abc"} loading={isLoading} size={30} />;
      </div>
    );
  }
 
 

  
  return (
    <div className="course-page-wrapper">
      <div className="course-header">
        <Container>
          <Row>
            <Col md={8}>
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="course-title">{course.title}</h1>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="course-thumbnail-wrapper"
              >
                <img className="course-thumbnail" style={{width:"250px",height:"250px"}} src={course.thumbnail} alt="Course Thumbnail" />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="course-content">
        <Row>
          <Col md={8}>
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="course-details">
                <div className="course-info-container">
                  <div className="course-info-item">
                    <span className="course-info-label">Category</span>
                    <span className="course-info-value">{course.category}</span>
                  </div>
                  <div className="course-info-item">
                    <span className="course-info-label">Level</span>
                    <span className="course-info-value">{course.level}</span>
                  </div>
                  <div className="course-info-item">
                    <span className="course-info-label">Duration</span>
                    <span className="course-info-value">{course.duration} hrs</span>
                  </div>
                </div>
                <div className="course-description">
                  <h3>Course Description</h3>
                  <p>
                    {isExpanded ? course.description : `${course.description?.substring(0, 150)}...`}
                  </p>
                  {course.description && course.description.length > 150 && (
                    <button className="toggle-description-button" onClick={handleToggleDescription}>
                      {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                  )}
                </div>
                <div className="course-actions">
                  <button className="btn btn-primary" disabled={isEnrolled.has(course.courseId)} style={{marginLeft:"600px",background:"#182f85"}} onClick={() => handleEnrollCourse(course.courseId)}>{isEnrolled.has(course.courseId) ? 'Enrolled' : 'Enroll'}</button>
                 
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Content;