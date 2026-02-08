import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from "react-redux";
import { fetchProfileCoursesRequest } from "../../actions/Admin/LearnersViewAction";
import '../../Styles/Admin/ProfileEnrolledCourses.css';
import { Card, CardContent, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
const ProfileEnrolledCourses = ({ fetchProfileCourses, profilecourses }) => {
  const learnerid = useParams();
  useEffect(() => {
    fetchProfileCourses(learnerid);
  }, [fetchProfileCourses]);
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const rows = profilecourses.profileCourses;
  let completecourse = rows.filter(row => row.status === 1);
  let inprogresscourse = rows.filter(row => row.status === 0);
  return (
    <>
      <div id='profileEnrolledCourses'>
        <div id='profileEnrolledCoursesBtn'>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label={`Enrolled Courses (${rows.length})`} value="1" />
                <Tab label={`Completed Courses (${completecourse.length})`} value="2" />
                <Tab label={`InProgress Courses (${inprogresscourse.length})`} value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div id='profileCourses'>
                {rows.length === 0 ? <>No Courses Enrolled</> : <></>}
                {rows.map(row =>
                  <div key={row.index}>
                    <Card key={row.enrollmentid} id="card" >
                      <img
                        src={row.courseImage}
                        title={row.courseImage}
                      />
                      <CardContent>
                        <span class="tooltiptext">Last Enrolled Course</span>
                        <Typography gutterBottom variant="h5" component="div">
                          {row.enrolledcourse}
                        </Typography>
                        <Typography variant="body2">
                          {row.enrolledCourseCategory}<br />
                          {row.enrolledCourselevels}<br />
                          {row.enrollmentdate.replace('T', ' ')}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div id='profileCourses'>
                {completecourse.length === 0 ? <>No Courses Completed</> : <></>}
                {completecourse.map(row =>
                  <Card key={row.enrollmentid} id="card" >
                    <img
                      src={row.courseImage}
                      title={row.courseImage}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.enrolledcourse}
                      </Typography>
                      <Typography variant="body2">
                        {row.enrolledCourseCategory}<br />
                        {row.enrolledCourselevels}<br />
                        {row.enrollmentdate.replace('T', ' ')}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabPanel>
            <TabPanel value="3">
              <div id='profileCourses'>
                {inprogresscourse.length === 0 ? <>No Courses Available</> : <></>}
                {inprogresscourse.map(row =>
                  <Card key={row.enrollmentid} id="card" >
                    <img
                      src={row.courseImage}
                      title={row.courseImage}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.enrolledcourse}
                      </Typography>
                      <Typography variant="body2" >
                        {row.enrolledCourseCategory}<br />
                        {row.enrolledCourselevels}<br />
                        {row.enrollmentdate.replace('T', ' ')}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </div >
    </>
  );
};

const mapStoreToProps = (state) => ({
  profilecourses: state.profilecourses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfileCourses: (learnerid) => dispatch(fetchProfileCoursesRequest(learnerid))
})
export default connect(mapStoreToProps, mapDispatchToProps)(ProfileEnrolledCourses);