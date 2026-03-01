import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { CourseContentComponent, SavedTopics, TopicFeedback } from '../components';

export function CourseContentPage() {
  const course = useSelector((state) => state.fetchindividualCourse.courses);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <Col className="text-end mt-5" />
      <Row style={{ background: 'white' }}>
        <CourseContentComponent />
      </Row>
      <Row style={{ background: 'white' }}>
        <Col md={9} xs={4}>
          <h3 className="mt-5" style={{ paddingLeft: '20px' }}><b /></h3>
          <Tabs aria-label="Basic tabs" defaultValue={0} style={{ width: '1425px', paddingLeft: '90px' }}>
            <TabList>
              <Tab>Description</Tab>
              <Tab style={{ marginLeft: '50px' }}>What we'll learn</Tab>
              <Tab style={{ marginLeft: '50px' }}>Reviews</Tab>
            </TabList>
            <TabPanel value={0}>
              <Typography variant="h6" display="block" className="mt-2">
                <b>Course Description: </b>
                {course.description ? (isExpanded ? course.description : `${course.description.substring(0, 1000)}...`) : 'No description available'}
              </Typography>
              {course.description && course.description.length > 1000 && (
                <Button size="small" color="primary" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
              )}
            </TabPanel>
            <TabPanel value={1}><SavedTopics /></TabPanel>
            <TabPanel value={2}><TopicFeedback /></TabPanel>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
