import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import { FaChartLine } from "react-icons/fa6";
import FeedbackRoundedIcon from "@mui/icons-material/FeedbackRounded";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  Paper,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
} from "@mui/material";
import { connect } from "react-redux";
import { fetchRecentFeedbackResponseRequest } from "../../actions/Admin/AdminDashboardAction";

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

const RecentFeedback = ({
  fetchRecentFeedbackResponseRequest,
  recentFeedback,
}) => {
  useEffect(() => {
    fetchRecentFeedbackResponseRequest();
  }, [fetchRecentFeedbackResponseRequest]);

  // Get the three most recent feedbacks
  const displayedFeedback = recentFeedback.slice(0, 3);

  return (
    <Grid item xs={12} md={5}>
      <Item style={{ borderRadius: "15px" }}>
        <Card variant="">
          <CardContent sx={{ height: "560px" }}>
            <Typography
              sx={{ fontSize: 18, fontWeight: "bold", color: "#059212" }}
              color="text.secondary"
              gutterBottom
            >
              Recent Feedbacks &nbsp;
              <FeedbackRoundedIcon />
            </Typography>
            {
              <Typography variant="h6" gutterBottom sx={{ fontSize: 15 }}>
                <TransitionGroup>
                  {displayedFeedback.map((feedback, index) => (
                    <ListItem
                      key={index}
                      alignItems="flex-start"
                      style={{ marginBottom: "15px" }}
                    >
                      <ListItemAvatar>
                        <Link
                          to={`/individuallearner/${feedback.learnerid}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <Avatar
                            alt="Learner profile"
                            src={feedback.profilephoto}
                          />
                        </Link>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Link
                            to={`/individuallearner/${feedback.learnerid}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Typography variant="h6">
                              {feedback.learnerName}
                            </Typography>
                          </Link>
                        }
                        secondary={
                          <>
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#23275c",
                                fontWeight: "bold",
                                fontStyle: "italic",
                              }}
                            >
                              "{feedback.feedbackresponse}"
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "GrayText",
                                fontWeight: "bold",
                                fontStyle: "italic",
                              }}
                            >
                              {feedback.dateoftheResponse
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-") +
                                " " +
                                feedback.dateoftheResponse.split("T")[1]}
                            </Typography>
                  
                            <Typography
                              variant="body2"
                              sx={{
                                color: "GrayText",
                                fontWeight: "bold",
                           
                              }}
                            >
                              <b >Course:</b> {feedback.coursename} |{" "}
                              <b>Topic:</b> {feedback.topicName}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </TransitionGroup>
              </Typography>
            }
          </CardContent>
        </Card>
      </Item>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  recentFeedback: state.recentfeedbackresponse.recentfeedbackresponse,
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecentFeedbackResponseRequest: () =>
    dispatch(fetchRecentFeedbackResponseRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentFeedback);