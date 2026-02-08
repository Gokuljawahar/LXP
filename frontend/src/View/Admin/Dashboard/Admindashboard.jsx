import * as React from "react";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountRequest } from "../../../actions/Admin/AdminDashboardAction";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded';
import { CardMedia } from "@mui/material";
import mockdata from '../../../assets/Admin/logo.png'
import Toplearners from "../../../components/Admin/Toplearners";
import HighestEnrolledCourse from "../../../components/Admin/HighestEnrolledCourse";
import Recentfeedbackresponse from '../../../components/Admin/Recentfeedbackresponse';
import RecordVoiceOverRoundedIcon from '@mui/icons-material/RecordVoiceOverRounded';
import VoiceOverOffRoundedIcon from '@mui/icons-material/VoiceOverOffRounded';
import { FaBookOpenReader } from "react-icons/fa6";
import { FaUserGraduate } from "react-icons/fa";
import CourseEnrollmentChart from '../../../components/Admin/CourseEnrollmentChart';
import { FaUserCheck } from "react-icons/fa";
import { FaUserMinus } from "react-icons/fa";
import CourseWiseEnrolledChart from "../../../components/Admin/CourseWiseEnrolledChart";
// import '../../../Styles/Admin/AdminDashboard.css'
import "../../../Styles/Admin/Admin.css";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  transition: "transform 0.3s",
  "&:hover": {
    transform: "scale(1.03)",
  },
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
}));

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const dashboard = useSelector((state) => state.fetchdashboard.data);
  useEffect(() => {
    dispatch(fetchCountRequest());
  }, []);
  return (

      <div className="admindashboard">
        <Box sx={{ flexGrow: 1, mt: 10 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Item style={{ borderRadius: "15px" }}>
                <Card
                  // style={{
                  //   borderBottom: "7px solid #0F62FE",
                  //   // boxShadow: "10px 5px  #378ce7",
                  // }}
                  variant=""
                >
                  <Link
                    to={"/adminviewallcourse"}
                    style={{ textDecoration: "none" }}
                  >
                    <CardContent>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#97247e",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Total Courses
                      </Typography>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Typography marginRight={"14% "}>
                          <div
                            style={{
                              border: "2px solid #97247e",
                              borderRadius: "50%",
                              background: "#97247e",
                            }}
                          >
                            <FaBookOpenReader
                              className="rotatinganimation"
                              style={{
                                fontSize: "380%",
                                color: "#ffffff",
                                padding: "15px",
                              }}
                            />
                          </div>
                        </Typography>
                        <Typography
                          variant="h3"
                          color={"#000000"}
                          gutterBottom
                          paddingRight={"40%"}
                        >
                          <CountUp duration={8} end={dashboard.noOfCourse} />
                        </Typography>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </Item>
            </Grid>

            <Grid item xs={12} md={3}>
              <Item style={{ borderRadius: "15px" }}>
                <Card
                  // style={{
                  //   borderBottom: "7px solid #0F62FE",
                  //   // boxShadow: "10px 5px  #378ce7",
                  // }}
                  variant=""
                >
                  <Link
                    to={"/learnerviewall"}
                    style={{ textDecoration: "none" }}
                  >
                    <CardContent>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#524F7D",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Total Learners
                      </Typography>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Typography marginRight={"14% "}>
                          <div
                            style={{
                              border: "2px solid #524F7D",
                              borderRadius: "50%",
                              background: "#524F7D",
                            }}
                          >
                            <FaUserGraduate
                              className="rotatinganimation"
                              style={{
                                fontSize: "380%",
                                color: "#ffffff",
                                padding: "15px",
                              }}
                            />
                          </div>
                        </Typography>
                        <Typography
                          variant="h3"
                          color={"#000000"}
                          gutterBottom
                          paddingRight={"40%"}
                        >
                          <CountUp duration={8} end={dashboard.noOfLearners} />
                        </Typography>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </Item>
            </Grid>

            <Grid item xs={12} md={3}>
              <Item style={{ borderRadius: "15px" }}>
                <Card
                  style={
                    {
                      // borderBottom: "7px solid #24A148",
                      // boxShadow: "10px 5px 5px #1bde52",
                    }
                  }
                  variant=""
                >
                  <Link
                    to={"/learnerviewall"}
                    style={{ textDecoration: "none" }}
                  >
                    <CardContent>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#24A148",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        Active Learners
                      </Typography>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Typography marginRight={"14% "}>
                          <div
                            style={{
                              border: "2px solid #24A148",
                              borderRadius: "50%",
                              background: "#24A148",
                            }}
                          >
                            <FaUserCheck
                              className="rotatinganimation"
                              style={{
                                fontSize: "380%",
                                color: "#ffffff",
                                padding: "15px",
                              }}
                            />
                          </div>
                        </Typography>
                        <Typography
                          variant="h3"
                          color={"#000000"}
                          gutterBottom
                          paddingRight={"40%"}
                        >
                          <CountUp
                            duration={8}
                            end={dashboard.noOfActiveLearners}
                          />
                        </Typography>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </Item>
            </Grid>

            <Grid item xs={12} md={3}>
              <Item style={{ borderRadius: "15px" }}>
                <Card
                  style={
                    {
                      // borderBottom: "7px solid red",
                    }
                  }
                  variant=""
                >
                  <Link
                    to={"/learnerviewall"}
                    style={{ textDecoration: "none" }}
                  >
                    <CardContent>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "#D20062",
                        }}
                        color="text.secondary"
                        gutterBottom
                      >
                        InActive Learners
                      </Typography>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Typography marginRight={"14% "}>
                          {/* <div className="voice-over-icon">
                      <div className="dotted-ring"></div>
                           <VoiceOverOffRoundedIcon className="rotatinganimation" style={{ fontSize: "320%", color: "#D20062" }}  />
                      </div> */}
                          <div
                            style={{
                              border: "2px solid #D20062",
                              borderRadius: "50%",
                              background: "#D20062",
                            }}
                          >
                            <VoiceOverOffRoundedIcon
                              className="rotatinganimation"
                              style={{
                                fontSize: "420%",
                                color: "#ffffff",
                                padding: "15px",
                              }}
                            />
                          </div>
                        </Typography>
                        <Typography
                          variant="h3"
                          color={"#000000"}
                          gutterBottom
                          paddingRight={"40%"}
                        >
                          <CountUp
                            duration={8}
                            end={dashboard.noofInactiveLearners}
                          />
                        </Typography>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </Item>
            </Grid>
          </Grid>
          <Grid container spacing={2} mt={3}>
            <CourseEnrollmentChart />
            <HighestEnrolledCourse />
            <Toplearners />
          </Grid>
          <Grid container spacing={2} mt={6}>
            <Recentfeedbackresponse />
            <CourseWiseEnrolledChart />
          </Grid>
        </Box>
      </div>
    
  );
}