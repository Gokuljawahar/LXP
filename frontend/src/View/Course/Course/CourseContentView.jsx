import React, { useState, useEffect } from "react";
// import { Sidenavbar } from '../../../Component/SideNavbar';
// import { Header } from '../../../Component/Header';
// import Content from '../../../Components/Course/Course/CourseContent';

import Content from "../../../components/Course/Course/CourseContent";
import { Row, Col, Container } from "react-bootstrap";
import SavedTopics from "../../../components/Course/Topic/SavedTopics";
import AddTopic from "../../../components/Course/Topic/AddTopic";
import { BackButton } from "../BackButton";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { FaHandPointRight } from "react-icons/fa";
import { Button } from "@mui/material";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import TopicFeedback from "../../../components/Course/Course/TopicFeedback";

export const CourseContent = () => {
  const course = useSelector((state) => state.fetchindividualCourse.courses);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <Col className="text-end mt-5">{/* <BackButton/> */}</Col>
      <Row style={{ background: "white" }}>
        {/* <Col md={12}><Header/></Col>
      <Col md={12}><Sidenavbar/> */}
        <Content />

        {/* </Col> */}
      </Row>
      <Row style={{ background: "white" }}>
        <Col md={9} xs={4}>
          <h3 className="mt-5" style={{ paddingLeft: "20px" }}>
            <b></b>
          </h3>

          <Tabs
            aria-label="Basic tabs"
            defaultValue={0}
            style={{ width: "1425px", paddingLeft: "90px" }}
          >
            <TabList>
              <Tab>Description</Tab>
              <Tab style={{ marginLeft: "50px" }}>What we'll learn</Tab>
              <Tab style={{ marginLeft: "50px" }}>Reviews</Tab>
            </TabList>
            <TabPanel value={0}>
              <Typography variant="h6" display="block" className="mt-2">
                <b>Course Description: </b>
                {course.description
                  ? isExpanded
                    ? course.description
                    : `${course.description.substring(0, 1000)}...`
                  : "No description available"}
              </Typography>
              {course.description && course.description.length > 1000 && (
                <Button
                  size="small"
                  color="primary"
                  onClick={handleToggleDescription}
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </Button>
              )}
            </TabPanel>
            <TabPanel value={1}>
              <SavedTopics />
            </TabPanel>
            <TabPanel value={2}>
              <TopicFeedback />
            </TabPanel>
          </Tabs>
        </Col>
      </Row>
      <Row style={{ background: "white" }}></Row>
    </>
  );
};
