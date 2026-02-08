import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import "../../../Styles/Admin/Admincourse.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { connect } from "react-redux";
import { fetchCoursesRequest } from "../../../actions/Admin/courseAction";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Rating from '@mui/material/Rating';

const Admincourse = ({ fetchCourses, courses }) => {
  const [loading, setLoading] = useState(true);
  const rootRef = React.useRef(null);

  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //         setLoading(false)
  //     }, 1000);
  //     return () => clearTimeout(timer);

  // }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // if ( loading||courses.length === 0) {
  //     return <div className='spinnerclass'> <Spinner /></div>;
  // }
  return (
    <div id="admin_recentcourse">

      <Container fluid className="coursepagebody">
        <Row className="pt-3 contentbody">
          <Row>
            <Col className="mt-5">
              <h3 style={{ fontWeight: "bold", color: "#27235C" }}>Recently Added Courses</h3>
            </Col>

            <Col className="text-end  mt-5" >
              <Link to="/addcourse">
                <Button >

                  Create New Course</Button>
              </Link>
            </Col>
          </Row>
          <Container className="recentaddedcourse">
            <Col xs={12} md={12} className="landingcoursepage  mb-5">
              <Row>
                <Col className="text-end  mt-2">
                  <Link to="/adminviewallcourse" style={{ color: "#27235C" }}>
                    View All courses
                  </Link>
                </Col>
              </Row>
              <div className="scrollable-content" >
                {courses.map((course) => (
                  // <Card key={index} sx={{ maxWidth: 250, maxHeight: 250, mb:5,borderRadius:1}}>

                  <Card
                    component={Link}
                    to={'/coursecontent/' + course.courseId}
                    key={course.courseId}
                    sx={{
                      maxWidth: 250,
                      maxHeight: 300,
                      mb: 5,
                      borderRadius: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      textDecoration: "none"
                    }}
                  >
                    <CardActionArea>
                      {/* <CardMedia
                                                    component="img"
                                                    height="140"
                                                    // width="80"
                                                    image={course.thumbnailimage}
                                                    alt={course.title || 'Course image'}
                                                    style={{objectFit:"contain"}}
                                                /> */}
                      <CardMedia
                        component="img"
                        height="200"
                        width="240"
                        image={course.thumbnailimage}
                        alt={course.title || "Course image"}
                        style={{
                          objectFit: "cover",
                          height: "140px",
                          width: "240px",
                        }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {course.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <Rating style={{ opacity:"100%" }} name="disabled" value={course.averageRating} disabled />
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </div>
            </Col>
          </Container>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.course.courses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCourses: () => dispatch(fetchCoursesRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admincourse);