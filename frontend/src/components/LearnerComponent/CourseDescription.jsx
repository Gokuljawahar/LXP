
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Card, CardContent, CardMedia, Typography,
  Grid, Tabs, Tab, Box, Rating, Chip, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getIndividualEnrollCourseRequest } from '../../actions/LearnerAction/FetchIndividualEnrolledCourseAction';
 
const StyledCard = styled(Card)(({ theme }) => ({
  margin: '60px auto',
  maxWidth: '90%',
  boxShadow: '0px 8px 16px rgba(35, 39, 92, 0.2)',
  borderRadius: '16px',
  overflow: 'hidden',
  background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
}));
 
const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 300,
  objectFit: 'cover',
}));
 
const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));
 
function CourseDescription() {
  const { courseId } = useParams();
  const [tabValue, setTabValue] = useState(0);
 
  const dispatch = useDispatch();
  const course = useSelector((state) => state.fetchEnrolledIndividualCourse.individualcourse);
 
  useEffect(() => {
    dispatch(getIndividualEnrollCourseRequest(courseId));
  }, [courseId, dispatch]);
 
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
 
  return (
    <StyledCard>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledCardMedia
            component="img"
            image={course.thumbnailimage}
            alt="Course Thumbnail"
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {course.enrolledCoursename}
            </Typography>
            {/* <Box display="flex" alignItems="center" mb={2}>
              <Rating value={4.5} readOnly />
              <Typography variant="body2" ml={1}>
                (123 reviews)
              </Typography>
            </Box> */}
            <Typography variant="body1" paragraph>
              {course.enrolledcoursedescription}
            </Typography>
            <Box mb={2}>
              <StyledChip label={`Category: ${course.enrolledcoursecategory}`} />
              <StyledChip label={`Level: ${course.enrolledcourselevels}`} />
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="course tabs">
          <Tab label="Topics" />
         
         
        </Tabs>
      </Box>
            <Box p={3}>
        {tabValue === 0 && (
          <div>
            {course.topics && course.topics.map((topic) => (
              <Accordion key={topic.topicId}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`topic-${topic.topicId}-content`}
                  id={`topic-${topic.topicId}-header`}
                >
                  <Typography variant="h6">{topic.topicName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {topic.topicDescription}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        )}
        {tabValue === 1 && (
          <Typography>Resources content goes here</Typography>
        )}
        {tabValue === 2 && (
          <Typography>Discussion content goes here</Typography>
        )}
      </Box>
          </CardContent>
        </Grid>
      </Grid>
     
     
    </StyledCard>
  );
}
 
export default CourseDescription;
 