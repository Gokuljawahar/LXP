import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Styles/Learner/LearnerCourse.css";
// import {  } from '../../actions/LearnerAction/LearnerGetCourseAction';
import { getCoursesRequest } from "../../actions/LearnerAction/LearnerGetCourseAction";
import { enrollRequest } from "../../actions/LearnerAction/LearnerPostEnrollAction";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
import Stack from "@mui/material/Stack";
import LearnerNavbar from "../LearnerComponent/LearnerNavbar";
import enrollmentMiddleware from "../../middleware/LearnerMiddleware/LearnerPostEnroll";
import {
  fetchenrollCourse,
  selectCourse,
} from "../../actions/LearnerAction/EnrolledCourseAction";
import Alert from "@mui/material/Alert";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import { Modal, Button, Container } from "react-bootstrap";
import { maxWidth } from "@mui/system";
import { CardActionArea } from "@mui/material";
import { BeatLoader } from "react-spinners";

const CourseComponent = ({ loading, error, search }) => {
  const courses = useSelector((state) => state.fetchcourse.courses);
  const Enrolledcourseslength = useSelector((state) => state.enroll.course[0]);
  const dispatch = useDispatch();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(new Set());
  const learnerId = sessionStorage.getItem("UserSessionID"); // Retrieve learner ID from session storage
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const alertsuccess = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleViewCourseClick = (courseId) => {
    navigate(`/LearnerCourseLandingPage/${courseId}`);
  };

  const alertdisplayenrollment = () => {
    const Toast = Swal.mixin({
      toast: true,
      background: "#21903d",
      position: "top",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    Toast.fire({
      icon: "success",
      iconColor: "white",
      title: "Enrolled successfully",
      customClass: {
        popup: "custom-toast",
      },
    });

    // Set a flag in localStorage indicating the user has just enrolled
    localStorage.setItem("justEnrolled", "true");

    // Reload the page after 2 seconds

    setTimeout(() => {
      setIsLoading(true);
      window.location.reload();
    }, 2000);
  };

  useEffect(() => {
    dispatch(getCoursesRequest(learnerId));
  }, [dispatch, learnerId]);

  useEffect(() => {
    dispatch(fetchenrollCourse(learnerId));
  }, [learnerId]);

  useEffect(() => {
    setFilteredCourses(
      courses.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, courses]);

  useEffect(() => {
    if (Enrolledcourseslength) {
      const enrolledCourseIds = new Set();
      Enrolledcourseslength.forEach((enrolledCourse) => {
        enrolledCourseIds.add(enrolledCourse.enrolledCourseId);
      });
      setIsEnrolled(enrolledCourseIds);
    }
  }, [Enrolledcourseslength]);

  // On the page that's being reloaded
  useEffect(() => {
    // Check if the user has just enrolled
    if (localStorage.getItem("justEnrolled") === "true") {
      // Clear the flag
      localStorage.removeItem("justEnrolled");
      setIsLoading(false);

      // Navigate to "/LearnerenrolledCourse" after a delay
      navigate("/LearnerenrolledCourse");
    }
  }, []);

  const handleOpen = (course) => {
    setOpen(true);
    setSelectedCourse(course);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnrollCourse = (courseId) => {
    const maxCourses = 3;

    if (
      Enrolledcourseslength &&
      typeof Enrolledcourseslength.length === "number"
    ) {
      if (Enrolledcourseslength.length >= maxCourses) {
        const Toast = Swal.mixin({
          toast: true,
          background: "red",
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          customClass: {
            popup: "custom-toast",
            title: "custom-toast-title",
          },
        });

        Toast.fire({
          icon: "error",
          iconColor: "white",
          title: "You have reached the course enrollment limit!",
        });
        setOpen(false);
        return;
      }
    }
    enrollmentMiddleware(courseId, learnerId).then(() => {
      alertdisplayenrollment();
      setIsEnrolled((prevIsEnrolled) => new Set([...prevIsEnrolled, courseId]));
      handleClose();
    });
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginRight: "50%",
        }}
      >
        <BeatLoader color={"#123abc"} loading={isLoading} size={30} />;
      </div>
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <div>
        <h3>No results found.</h3>
      </div>
    );
  }
  return (
    <>
      <div id="Learner-course-page-division">
        <Container fluid id="Learner-course-Langing-Page">
          {filteredCourses.map((course, index) => (
            <div key={index}>
              <Card
                sx={{
                  maxHeight: 320,
                  maxWidth: 350,
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                  height: "auto",
                  // width: 300,
                  // height: 300,
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 200,
                      height: 150,
                      maxHeight: 200,
                      maxWidth: 300,
                    }}
                    style={{
                      width: "250px", // Fixed width
                      height: "150px", // Fixed height
                      objectFit: "cover", // Ensures the image covers the area without stretching
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    image={course.thumbnailimage}
                    alt={course.title}
                  />
                </CardActionArea>
                <Box>
                  <CardContent
                    style={{
                      display: "flex",
                      overflow: "hidden",
                      justifyContent: "start",
                      alignItems: "center",
                      width: "250px",
                    }}
                  >
                    <div>
                      <Typography variant="">
                        <h6>
                          <b>Course:</b> {course.title}
                        </h6>
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Level: {course.level}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Category: {course.catagory}
                      </Typography>
                      <Button
                        variant="outline"
                        style={{ color: "blue" }}
                        onClick={() => handleViewCourseClick(course.courseId)}
                      >
                        View{" "}
                      </Button>
                    </div>
                  </CardContent>
                </Box>
              </Card>
              <Container></Container>
            </div>
          ))}
        </Container>
      </div>
    </>
  );
};

export default CourseComponent;
