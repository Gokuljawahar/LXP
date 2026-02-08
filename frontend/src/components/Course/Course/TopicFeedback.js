import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTopicsRequest } from "../../../actions/Course/Topic/FetchTopicsAction";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  CircularProgress,
  Box,
  Grid,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { deepOrange, teal, yellow } from "@mui/material/colors";

function TopicFeedback() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [topicsDetail, setTopicsDetails] = useState([]);
  const selectorTopicsDetail = useSelector(
    (state) => state.fetchTopic.topics[0]
  );

  useEffect(() => {
    fetchTopics();
    setLoading(true);
  }, []);

  useEffect(() => {
    if (selectorTopicsDetail && Array.isArray(selectorTopicsDetail.topics)) {
      setTopicsDetails(selectorTopicsDetail.topics);
    } else {
      setTopicsDetails([]);
    }
  }, [selectorTopicsDetail]);

  const fetchTopics = async () => {
    try {
      await dispatch(fetchTopicsRequest(id));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching topics:", error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      {loading ? (
        <Box display="flex" justifyContent="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {topicsDetail.map((topic, index) =>
            topic.feddbackResponses.map(
              (feedback, index) =>
                feedback.response !== "NULL" && (
                  <Grid item xs={12} key={index}>
                    <Card style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
                        }
                        title={
                          <Typography variant="h6" component="div">
                            Anonymous User - {topic.topicName}
                          </Typography>
                        }
                      />
                      <CardContent>
                        <Box display="flex" alignItems="center">
                          <ChatIcon
                            sx={{ color: yellow[700], marginRight: 1 }}
                          />
                          <Typography variant="body1">
                            {feedback.response}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                )
            )
          )}
        </Grid>
      )}
    </Container>
  );
}

export default TopicFeedback;
