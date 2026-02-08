// import LearnerNavbar from '../LearnerComponent/LearnerNavbar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// import CssBaseline from '@mui/material/CssBaseline';
// import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
// import * as React from 'react';
// import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
// import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
// import { useTheme } from '@mui/material/styles';
// // import { Carousel } from 'react-bootstrap';
// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Avatar from '@mui/material/Avatar';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import Stack from '@mui/material/Stack';
// import { useEffect, useState } from 'react';
// import { connect, useDispatch, useSelector } from 'react-redux';
// import { getCoursesRequest } from '../../actions/LearnerAction/LearnerGetCourseAction';
// import { enrollRequest } from '../../actions/LearnerAction/LearnerPostEnrollAction';
// import '../../Styles/Learner/LearnerCourse.css';
// import { FetchuserDataRequest } from '../../actions/LearnerAction/FetchRegisterAction';
// import '../../Styles/Learner/LearnerDashboard.css';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import IconButton from '@mui/material/IconButton';
// import { indigo } from '@mui/material/colors';
// import DownloadingRoundedIcon from '@mui/icons-material/DownloadingRounded';
// import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
// import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
// import { TopicScoreApi } from '../../middleware/LearnerMiddleware/TopicScoreApi';
// import LinearProgress from '@mui/material/LinearProgress';
// import { FetchDashboardRequest } from '../../actions/LearnerAction/LearnerdashboardAction';
// import { LineChart } from '@mui/x-charts';
// import { getUserProfileRequest } from '../../actions/LearnerAction/GetUpdateUserProfileAction';
// import { FetchLearnerProgressRequest } from '../../actions/LearnerAction/FetchLearnerProgressAction';
// import LearnerProgressApi from '../../middleware/LearnerMiddleware/LearnerProgressApi';
// import LearnerScoreProgressBarGraph from './LearnerScoreProgressBarGraph';
// import profile1 from '../../Images/profile1.png';
// import { useNavigate } from 'react-router-dom';
// import { Center, background } from '@chakra-ui/react';
// import { Block } from '@mui/icons-material';
// import Lxp3 from '../../Images/LXP3.png';
// // import { CircularProgressbar } from 'react-circular-progressbar';
// // import CircularProgress from '@mui/joy/CircularProgress';
// // import { useCountUp } from 'use-count-up';
// import lxp1 from '../../Images/lxp1.jpg';
// import { fetchenrollCourse, selectCourse, } from "../../actions/LearnerAction/EnrolledCourseAction";
// import LearnerScoreProgressBarGraphApi from '../../middleware/LearnerMiddleware/LearnerScoreProgressBarGraphApi';
// import Carousel from 'react-multi-carousel';
// import 'react-multi-carousel/lib/styles.css';
// import Tooltip from '@mui/material/Tooltip';
// import { motion } from 'framer-motion';
// import { styled } from '@mui/material/styles';
 
 
// const LearnerDashboard = ({ enrolledCourses, loading, error, search }) => {
//   const courses = useSelector((state) => state.fetchcourse.courses);
//   console.log('courses ',courses )
//   const dispatch = useDispatch();
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const selectedStream = useSelector((state) => state.fetchlearner.userData.stream);
//   const [profilePic, setProfilePic] = useState("https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg");
//   const [progress, setProgress] = useState(60);
//   const [scoreData, setScoreData] = useState([]);
//   const learnerId = sessionStorage.getItem('UserSessionID'); // Retrieve learner ID from session storage
//   console.log("sads", learnerId);
//   const selectedcount = useSelector((state) => state.learnerdashboard.dashboard);
//   console.log("selectedcount", selectedcount);
//   const selectedenrollcount = selectedcount.enrolledCourseCount || 0;
//   const selectedinprogresscount = selectedcount.inProgressCount || 0;
//   const selectcompletecount = selectedcount.completedCount || 0;
//   const navigate = useNavigate();
//   const [TopicId] = useState("2df47ffa-3fc0-44c7-b869-c403f5542150");
//   const [isLoading, setIsLoading] = useState(false);
 
//   const [overallProgress, setOverallProgress] = useState(0);
 
//   const viewcourse = useSelector((state) => state.enroll.course[0]);

 
 
//   const [scoreProgressSelector, setScoreProgressSelector] = useState([]);
//   console.log("hasscore", scoreProgressSelector);
 
//   // const hasScoreData = scoreProgressSelector.some(item => item.score > 0);
//   const hasScoreData = scoreProgressSelector.some(item => item.score > 0);
//   console.log("hasScoreData", hasScoreData)
 
//   const hasOngoingCourses = viewcourse && viewcourse.length > 0;
 
 
 
//   const selectedprogress = useSelector((state) => state);
//   console.log("selectedprogress", selectedprogress);
 
//   const profilePhoto = sessionStorage.getItem("userData");
//   console.log("userData", profilePhoto)

  
 
//   const enrollmentId = sessionStorage.getItem("enrolled");
//   console.log("enrolleddashbaord", enrollmentId);
 
//   const firstname = useSelector((state) => state.fetchlearner.userData.firstName);
//   console.log("firstname", firstname);
 
//   const lastname = useSelector((state) => state.fetchlearner.userData.lastName);
//   console.log("lastname", lastname);
 
//   const dob = useSelector((state) => state.fetchlearner.userData.dob);
//   console.log("dob", dob);
 
//   const contactNumber = useSelector((state) => state.fetchlearner.userData.contactNumber);
//   console.log("contactNumber", contactNumber);
 
//   const email = useSelector((state) => state.fetchlearner.userData.email);
//   console.log("email", email);
 
//   const RecommendContainer = styled(motion.div)(({ theme }) => ({
//     padding: '40px',
//     background: 'linear-gradient(145deg, #f6f8fa 0%, #e9ecef 100%)',
//     borderRadius: '20px',
//     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
//     marginTop: '40px',
//   }));
 
//   const CourseCard = styled(motion.div)(({ theme }) => ({
//     background: '#ffffff',
//     borderRadius: '15px',
//     overflow: 'hidden',
//     boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
//     transition: 'all 0.3s ease',
//     '&:hover': {
//       transform: 'translateY(-10px)',
//       boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)',
//     },
//   }));
 
//   const CourseImage = styled('img')({
//     width: '100%',
//     height: '200px',
//     objectFit: 'cover',
//     transition: 'transform 0.3s ease',
//     '&:hover': {
//       transform: 'scale(1.05)',
//     },
//   });
 
//   const CourseContent = styled('div')({
//     padding: '20px',
//   });
 
//   const CourseTitle = styled(Typography)({
//     fontWeight: 'bold',
//     color: '#1a237e',
//     marginBottom: '10px',
//   });
 
//   const CourseInfo = styled(Typography)({
//     color: '#546e7a',
//     marginBottom: '5px',
//   });
 
//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };
 
//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: 'spring',
//         stiffness: 100
//       }
//     }
//   };
 
 
//   useEffect(() => {
//     console.log("gghfhgf");
//     fetchCoursesTopicsScores(learnerId);
//   }, [learnerId]);
 
//   useEffect(() => {
//     fetchData((learnerId));
 
//   }, [dispatch]);
 
//   useEffect(() => {
//     fetchCourseScores(learnerId, TopicId);
//   }, [learnerId, TopicId]);
 
//   useEffect(() => {
//     fetchprogress(learnerId, enrollmentId);
//   }, [learnerId, enrollmentId]);
 
//   useEffect(() => {
//     dispatch(fetchenrollCourse(learnerId));
//   }, [learnerId]);
 
//   useEffect(() => {
//     if (selectedStream) {
//       const streams = selectedStream.split(', ');
//       setFilteredCourses(courses.filter(course => streams.map(stream => stream.toLowerCase()).includes(course.title.toLowerCase())));
//     } else {
//       setFilteredCourses(courses);
//     }
//   }, [selectedStream, courses]);
 
//   useEffect(() => {
//     // Replace this with your actual progress calculation
//     const calculatedProgress = 75; // Example: 75%
 
//     setOverallProgress(0); // Start from 0
//     const interval = setInterval(() => {
//       setOverallProgress(prev => {
//         if (prev < calculatedProgress) {
//           return prev + 1;
//         }
//         clearInterval(interval);
//         return prev;
//       });
//     }, 20);
 
//     return () => clearInterval(interval);
//   }, []);
 
//   useEffect(() => {
//     document.documentElement.style.setProperty('--progressValue', overallProgress);
//   }, [overallProgress]);
 
 
//   const [open, setOpen] = useState(false);
 
//   const handleOpen = (course) => {
//     setOpen(true);
//     setSelectedCourse(course);
//   };
//   const fetchCourseScores = async (learnerId) => {
//     const scores = await TopicScoreApi(learnerId);
//     setScoreData(scores);
//   }
 
//   const fetchCoursesTopicsScores = async (learnerId) => {
//     console.log("red", learnerId)
//     const data = await LearnerScoreProgressBarGraphApi(learnerId);
//     console.log("tadytas", data);
//     setScoreProgressSelector(data);
//   }
 
//   const handleClose = () => {
//     setOpen(false);
//   };
 
//   const handleProfilePicChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setProfilePic(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
 
//   const fetchData = async (learnerId) => {
//     try {
//       dispatch(getCoursesRequest(learnerId));
//       await
//         dispatch(FetchDashboardRequest(learnerId));
//       await
//         dispatch(FetchuserDataRequest(learnerId));
//       await
//         dispatch(getUserProfileRequest(learnerId));
 
 
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
//   };
 
//   // const handleCardClick = (status) => {
//   //   navigate('/LearnerenrolledCourse', { state: { status } });
//   // };
 
//   // const handleCourseClick = (courseId) => {
//   //   navigate('/LearnerPage');
//   // }

//   // const courseId=sessionStorage.getItem("")
 
//   const handleCardClick = (status) => {
//     navigate('/LearnerenrolledCourse', { state: { status } });
//   };
 
//   const handleCourseClick = (courseId) => {
//     navigate('/LearnerPage');
//   }

//   const handleongoingClick = (courseId) => {
//     navigate(`/ViewTopics/${courseId}`);
//   }
 
 
 
 
//   const fetchprogress = async (learnerId, enrollmentId) => {
//     try {
//       console.log("enrole success", learnerId, enrollmentId);
//       const data = await LearnerProgressApi(learnerId, enrollmentId);
//       setProgress(data);
 
//     }
//     catch (error) {
//       console.error("Error fetching data", error);
//     }
//   }
 
 
 
//   const handleEnrollCourse = (courseId) => {
//     const maxCourses = 3;
//     const learnerCourses = enrolledCourses.filter(course => course.learnerId === learnerId);
 
//     if (learnerCourses.length >= maxCourses) {
//       alert('You have reached the course enrollment limit!');
//       return;
//     }
 
//     const alreadyEnrolled = enrolledCourses.some(course => course.courseId === courseId && course.learnerId === learnerId);
 
//     if (alreadyEnrolled) {
//       alert('You have already enrolled in this course!');
//       return;
//     }
 
//     try {
//       dispatch(enrollRequest(courseId, learnerId));
//     }
//     catch (error) {
//       console.error("Enrollment error:", error);
//       alert('Failed to enroll in the course.Please try again later.');
//     }
 
//   };
 
//   const isEnrolled = (courseId) => {
//     if (!Array.isArray(enrolledCourses)) {
//       console.error("enrolledCourses is not an array", enrolledCourses);
//       return false;
//     }
//     return enrolledCourses.some(course => course.courseId === courseId && course.learnerId === learnerId);
//   };
 
//   // const style = {
//   //   position: 'absolute',
//   //   top: '50%',
//   //   left: '50%',
//   //   transform: 'translate(-50%, -50%)',
//   //   width: 400,
//   //   bgcolor: 'background.paper',
//   //   border: '2px solid #000',
//   //   boxShadow: 24,
//   //   pt: 2,
//   //   px: 4,
//   //   pb: 3,
//   // };
 
//   const responsive = {
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//       slidesToSlide: 3
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//       slidesToSlide: 2
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//       slidesToSlide: 1
//     }
//   };
 
 
 
//   if (loading) {
//     return <div>Loading...</div>;
//   }
 
//   return (
//     <div>
//       <LearnerNavbar />
//       <div className="dashboard-container">
//         <Card className="profile-card" sx={{ borderRadius: '20px' }}>
//           <div className="profile-header">
//             <Avatar
//               src={profilePhoto || profile1}
//               alt="Profile"
//               className="profile-avatar"
//             />
//             <Typography variant="h5" className="profile-name">
//               {firstname} {lastname}
//             </Typography>
//           </div>
//           <CardContent className="profile-content">
//             <div className="profile-details">
//               <div className="detail-item">
//                 <Tooltip title="Name" arrow>
//                   <PersonOutlineOutlinedIcon />
//                 </Tooltip>
//                 <Typography>{`${firstname} ${lastname}`}</Typography>
//               </div>
//               <div className="detail-item">
//                 <Tooltip title="DOB" arrow>
//                   <CakeOutlinedIcon />
//                 </Tooltip>
//                 <Typography>{dob}</Typography>
//               </div>
//               <div className="detail-item">
//                 <Tooltip title="Contact Number" arrow>
//                   <CallOutlinedIcon />
//                 </Tooltip>
//                 <Typography>{contactNumber}</Typography>
//               </div>
//               <div className="detail-item">
//                 <Tooltip title="Email" arrow>
//                   <AlternateEmailOutlinedIcon />
//                 </Tooltip>
//                 <Typography>{email}</Typography>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
 
//         <div className="dashboard-content">
//           <div className="course-stats">
//             <Card className="stat-card enrolled" onClick={() => handleCardClick('enrolled')}>
//               <div className="stat-content">
//                 <IconButton className="stat-icon">
//                   <SchoolRoundedIcon fontSize="large" />
//                 </IconButton>
//                 <div className="stat-text">
//                   <Typography variant="h6">Enrolled Courses</Typography>
 
//                   <Typography variant="h3" className="stat-number">{selectedenrollcount}</Typography>
//                 </div>
//               </div>
//               <div className="stat-wave"></div>
//             </Card>
//             <Card className="stat-card inprogress" onClick={() => handleCardClick('inprogress')}>
//               <div className="stat-content">
//                 <IconButton className="stat-icon">
//                   <DownloadingRoundedIcon fontSize="large" />
//                 </IconButton>
//                 <div className="stat-text">
//                   <Typography variant="h6">In Progress</Typography>
 
//                   <Typography variant="h3" className="stat-number">{selectedinprogresscount}</Typography>
//                 </div>
//               </div>
//               <div className="stat-wave"></div>
//             </Card>
//             <Card className="stat-card completed">
//               <div className="stat-content">
//                 <IconButton className="stat-icon">
//                   <MilitaryTechRoundedIcon fontSize="large" />
//                 </IconButton>
//                 <div className="stat-text">
//                   <Typography variant="h6">Completed</Typography>
//                   <Typography variant="h3" className="stat-number">{selectcompletecount}</Typography>
//                 </div>
//               </div>
//               <div className="stat-wave"></div>
//             </Card>
//           </div>
 
//           <div className="dashboard-lower-half">
 
//             {hasOngoingCourses && (
//               <div className="overall-progress">
//                 <Typography variant="h6" className="progress-title">Overall Progress</Typography>
//                 <div id='Learner_Progress'>
 
//                   <div className="progress-container">
//                     <div className="circular-progress">
//                       <div className="inner-circle">
//                         <Typography variant="h3" className="progress-percentage">
//                           {`0%`}
//                         </Typography>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="wave-container">
//                     <div className="wave"></div>
//                   </div>
//                 </div>
//               </div>
//             )
 
//             }
 
//             {hasScoreData && (
//               <div className="score-progress">
//                 <>
//                   <Typography variant="h6">Score Progress</Typography>
//                   <LearnerScoreProgressBarGraph />
//                 </>
//               </div>
//             )}
 
 
//             {hasOngoingCourses && (
//               <div className="ongoing-courses">
//                 <>
//                   <Typography variant="h6">Ongoing Courses</Typography>
//                   {viewcourse.map((course, index) => (
//                     <Card key={index} className="ongoing-course-card" style={{ width: 300, height: 90, borderRadius: '20px' }} onClick={() => handleongoingClick(course.enrolledCourseId)}>
//                       <CardMedia
//                         style={{ width: 100 }}
//                         component="img"
//                         image={course.thumbnailimage}
//                         alt={course.enrolledCoursename}
//                         className="dashboard-course-thumbnail"
//                       />
//                       <CardContent className="ongoing-course-content">
//                         <Typography variant="subtitle1">{course.enrolledCoursename}</Typography>
//                         <Typography variant="h6">89%</Typography>
//                         <div className="progress-bar">
//                           <div className="progress-fill" style={{ width: '89%' }}></div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
 
//                 </>
//               </div>
//             )}
 
 
//             {(!hasScoreData && !hasOngoingCourses) && (
//               <div className='row' id='recommend-container'>
//                 <div className=''>
//                   <h3 id='count-recommend' style={{ color: '#27235C' }}>Recommended Courses</h3>
//                 </div>
//                 <Carousel
//                   responsive={responsive}
//                   infinite={true}
//                   removeArrowOnDeviceType={["tablet", "mobile"]}
//                 // containerClass='carousel-container'
//                 // itemClass='carousel-item'
//                 // autoPlay={true}
//                 // autoPlaySpeed={2000}
//                 // customTransition='transform 300ms ease-in-out'
//                 // transitionDuration={300}
//                 >
//                   {filteredCourses.map((course, index) => (
//                     <div key={index} id="rec-course">
//                       <Card id='course-card' onClick={() => handleCourseClick(course.courseId)}>
//                         <CardMedia
//                           className='course-image'
//                           component="img"
//                           sx={{ width: 120 }}
//                           image={course.thumbnailimage}
//                           alt={course.title}
//                         />
//                         <CardContent id='course-content'>
//                           <div id='course-typo'>
//                             <Typography component="div" variant="h5" id='course-name'>
//                               Course: {course.title}
//                             </Typography>
//                             <Typography variant="h6" component="div" id='course-name'>
//                               Level: {course.level}
//                             </Typography>
//                             <Typography variant="subtitle1" component="div" id='course-name'>
//                               Category: {course.catagory}
//                             </Typography>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </div>
//                   ))}
//                 </Carousel>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>);
// };
 
// const mapStateToProps = (state) => ({
//   enrolledCourses: state.enrolledCourses.enrolledCourses || [], // Ensure it's an array
//   loading: state.enrolledCourses.loading,
//   error: state.enrolledCourses.error,
// });
 
// export default connect(mapStateToProps)(LearnerDashboard);
 

import LearnerNavbar from '../LearnerComponent/LearnerNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import * as React from 'react';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { useTheme } from '@mui/material/styles';
// import { Carousel } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getCoursesRequest } from '../../actions/LearnerAction/LearnerGetCourseAction';
import { enrollRequest } from '../../actions/LearnerAction/LearnerPostEnrollAction';
import '../../Styles/Learner/LearnerCourse.css';
import { FetchuserDataRequest } from '../../actions/LearnerAction/FetchRegisterAction';
import '../../Styles/Learner/LearnerDashboard.css';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import IconButton from '@mui/material/IconButton';
import { indigo } from '@mui/material/colors';
import DownloadingRoundedIcon from '@mui/icons-material/DownloadingRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import { TopicScoreApi } from '../../middleware/LearnerMiddleware/TopicScoreApi';
import LinearProgress from '@mui/material/LinearProgress';
import { FetchDashboardRequest } from '../../actions/LearnerAction/LearnerdashboardAction';
import { LineChart } from '@mui/x-charts';
import { getUserProfileRequest } from '../../actions/LearnerAction/GetUpdateUserProfileAction';
import { FetchLearnerProgressRequest } from '../../actions/LearnerAction/FetchLearnerProgressAction';
import LearnerProgressApi from '../../middleware/LearnerMiddleware/LearnerProgressApi';
import LearnerScoreProgressBarGraph from './LearnerScoreProgressBarGraph';
import profile1 from '../../Images/profile1.png';
import { useNavigate } from 'react-router-dom';
import { Center, background } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Block } from '@mui/icons-material';
import Lxp3 from '../../Images/LXP3.png';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import CircularProgress from '@mui/joy/CircularProgress';
// import { useCountUp } from 'use-count-up';
import lxp1 from '../../Images/lxp1.jpg';
import { fetchenrollCourse, selectCourse, } from "../../actions/LearnerAction/EnrolledCourseAction";
import LearnerScoreProgressBarGraphApi from '../../middleware/LearnerMiddleware/LearnerScoreProgressBarGraphApi';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import { fetchUserData } from '../../middleware/LearnerMiddleware/GetUserProfileMiddleware';
 
 
 
 
const LearnerDashboard = ({ enrolledCourses, loading, error, search, profileimage }) => {
  const [editInfo, setEditInfo] = useState({
    profilePhoto:profile1
  });
  const courses = useSelector((state) => state.fetchcourse.courses);
  console.log('courses ',courses )
  const dispatch = useDispatch();
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const selectedStream = useSelector((state) => state.fetchlearner.userData.stream);
  const [profilePic, setProfilePic] = useState("https://codingyaar.com/wp-content/uploads/bootstrap-profile-card-image.jpg");
  const [progress, setProgress] = useState(60);
  const [scoreData, setScoreData] = useState([]);
  const learnerId = sessionStorage.getItem('UserSessionID'); // Retrieve learner ID from session storage
  console.log("sads", learnerId);
  const selectedcount = useSelector((state) => state.learnerdashboard.dashboard);
  console.log("selectedcount", selectedcount);
  const selectedenrollcount = selectedcount.enrolledCourseCount || 0;
  const selectedinprogresscount = selectedcount.inProgressCount || 0;
  const selectcompletecount = selectedcount.completedCount || 0;
  const navigate = useNavigate();
  const [TopicId] = useState("2df47ffa-3fc0-44c7-b869-c403f5542150");
  const [isLoading, setIsLoading] = useState(false);
  const [LearnerId] = useState(sessionStorage.getItem('ProfileId'));
 
  // const LearnerId=sessionStorage.getItem("ProfileId");
 
  const [overallProgress, setOverallProgress] = useState(0);
 
  const viewcourse = useSelector((state) => state.enroll.course[0]);
 
 
 
  const [scoreProgressSelector, setScoreProgressSelector] = useState([]);
  console.log("hasscore", scoreProgressSelector);
 
  // const hasScoreData = scoreProgressSelector.some(item => item.score > 0);
  const hasScoreData = scoreProgressSelector.some(item => item.score > 0);
  console.log("hasScoreData", hasScoreData)
 
  const hasOngoingCourses = viewcourse && viewcourse.length > 0;
 
 
 
  const selectedprogress = useSelector((state) => state);
  console.log("selectedprogress", selectedprogress);
 
 
 
 
 
  const enrollmentId = sessionStorage.getItem("enrolled");
  console.log("enrolleddashbaord", enrollmentId);
 
  const check = useSelector((state)=> state);
  console.log("check", check);
 
  // const firstname = useSelector((state) => state.fetchlearner.userData.firstName);
  const firstname = useSelector((state) => state.fetchlearner.userData.firstName);
  console.log("firstname", firstname);
 
 
  const store = useSelector((state)=>state);
  console.log("store", store);
 
  const lastname = useSelector((state) => state.fetchlearner.userData.lastName);
  console.log("lastname", lastname);
 
  const dob = useSelector((state) => state.fetchlearner.userData.dob);
  console.log("dob", dob);
 
  const contactNumber = useSelector((state) => state.fetchlearner.userData.contactNumber);
  console.log("contactNumber", contactNumber);
 
  const email = useSelector((state) => state.fetchlearner.userData.email);
  console.log("email", email);
 
  const RecommendContainer = styled(motion.div)(({ theme }) => ({
    padding: '40px',
    background: 'linear-gradient(145deg, #f6f8fa 0%, #e9ecef 100%)',
    borderRadius: '20px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    marginTop: '40px',
  }));
 
  const CourseCard = styled(motion.div)(({ theme }) => ({
    background: '#ffffff',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)',
    },
  }));
 
  const CourseImage = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  });
 
  const CourseContent = styled('div')({
    padding: '20px',
  });
 
  const CourseTitle = styled(Typography)({
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: '10px',
  });
 
  const CourseInfo = styled(Typography)({
    color: '#546e7a',
    marginBottom: '5px',
  });
 
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
 
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };
 
 
 
  const fetch = async (LearnerId) => {
    try {
      const userData = await fetchUserData(LearnerId);
      sessionStorage.setItem("userData", userData.profilePhoto);
      setEditInfo(userData);
    } catch (error) {
      console.error('Error in fetch: ', error);
    }
  };
 
 
 
 
 
 
  useEffect(() => {
    const data = fetch(LearnerId);
    setEditInfo(data);
  }, [setEditInfo]);
 
  console.log("edit info", editInfo);
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  useEffect(() => {
    console.log("gghfhgf");
    fetchCoursesTopicsScores(learnerId);
  }, [learnerId]);
 
  useEffect(() => {
    fetchData((learnerId));
 
  }, [dispatch]);
 
  useEffect(() => {
    fetchCourseScores(learnerId, TopicId);
  }, [learnerId, TopicId]);
 
  useEffect(() => {
    fetchprogress(learnerId, enrollmentId);
  }, [learnerId, enrollmentId]);
 
  useEffect(() => {
    dispatch(fetchenrollCourse(learnerId));
  }, [learnerId]);
 
  useEffect(() => {
    if (selectedStream) {
      const streams = selectedStream.split(', ');
      setFilteredCourses(courses.filter(course => streams.map(stream => stream.toLowerCase()).includes(course.title.toLowerCase())));
    } else {
      setFilteredCourses(courses);
    }
  }, [selectedStream, courses]);
 
  useEffect(() => {
    // Replace this with your actual progress calculation
    const calculatedProgress = 75; // Example: 75%
 
    setOverallProgress(0); // Start from 0
    const interval = setInterval(() => {
      setOverallProgress(prev => {
        if (prev < calculatedProgress) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 20);
 
    return () => clearInterval(interval);
  }, []);
 
  useEffect(() => {
    document.documentElement.style.setProperty('--progressValue', overallProgress);
  }, [overallProgress]);
 
 
  const [open, setOpen] = useState(false);
 
  const handleOpen = (course) => {
    setOpen(true);
    setSelectedCourse(course);
  };
  const fetchCourseScores = async (learnerId) => {
    const scores = await TopicScoreApi(learnerId);
    setScoreData(scores);
  }
 
  const fetchCoursesTopicsScores = async (learnerId) => {
    console.log("red", learnerId)
    const data = await LearnerScoreProgressBarGraphApi(learnerId);
    console.log("tadytas", data);
    setScoreProgressSelector(data);
  }
 
  const handleClose = () => {
    setOpen(false);
  };
 
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
 
  const fetchData = async (learnerId) => {
    try {
      dispatch(getCoursesRequest(learnerId));
      await
        dispatch(FetchDashboardRequest(learnerId));
      await
        dispatch(FetchuserDataRequest(learnerId));
      await
        dispatch(getUserProfileRequest(learnerId));
 
 
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
 
  // const handleCardClick = (status) => {
  //   navigate('/LearnerenrolledCourse', { state: { status } });
  // };
 
  // const handleCourseClick = (courseId) => {
  //   navigate('/LearnerPage');
  // }
 
  // const courseId=sessionStorage.getItem("")
 
  const handleCardClick = (status) => {
    navigate('/LearnerenrolledCourse', { state: { status } });
  };
 
  const handleCourseClick = (courseId) => {
    navigate('/LearnerPage');
  }
 
  const handleongoingClick = (courseId) => {
    navigate(`/ViewTopics/${courseId}`);
  }
 
 
 
 
  const fetchprogress = async (learnerId, enrollmentId) => {
    try {
      console.log("enrole success", learnerId, enrollmentId);
      const data = await LearnerProgressApi(learnerId, enrollmentId);
      setProgress(data);
 
    }
    catch (error) {
      console.error("Error fetching data", error);
    }
  }
 
 
 
  const handleEnrollCourse = (courseId) => {
    const maxCourses = 3;
    const learnerCourses = enrolledCourses.filter(course => course.learnerId === learnerId);
 
    if (learnerCourses.length >= maxCourses) {
      alert('You have reached the course enrollment limit!');
      return;
    }
 
    const alreadyEnrolled = enrolledCourses.some(course => course.courseId === courseId && course.learnerId === learnerId);
 
    if (alreadyEnrolled) {
      alert('You have already enrolled in this course!');
      return;
    }
 
    try {
      dispatch(enrollRequest(courseId, learnerId));
    }
    catch (error) {
      console.error("Enrollment error:", error);
      alert('Failed to enroll in the course.Please try again later.');
    }
 
  };
 
  const isEnrolled = (courseId) => {
    if (!Array.isArray(enrolledCourses)) {
      console.error("enrolledCourses is not an array", enrolledCourses);
      return false;
    }
    return enrolledCourses.some(course => course.courseId === courseId && course.learnerId === learnerId);
  };
 
  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   pt: 2,
  //   px: 4,
  //   pb: 3,
  // };
 
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
 
 
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
 
 
 
 
 
 
 
 
 
 
 
 
  return (
    <div>
      <LearnerNavbar />
      <div className="dashboard-container">
        <Card className="profile-card" sx={{ borderRadius: '20px' }}>
          <div className="profile-header">
            <Avatar
              src={ editInfo?.profilePhoto}
              alt="Profile"
              className="profile-avatar"
            />
            <Typography variant="h5" className="profile-name">
              {firstname} {lastname}
            </Typography>
          </div>
          <CardContent className="profile-content">
            <div className="profile-details">
              <div className="detail-item">
                <Tooltip title="Name" arrow>
                  <PersonOutlineOutlinedIcon />
                </Tooltip>
                <Typography>{`${firstname} ${lastname}`}</Typography>
              </div>
              <div className="detail-item">
                <Tooltip title="DOB" arrow>
                  <CakeOutlinedIcon />
                </Tooltip>
                <Typography>{dob}</Typography>
              </div>
              <div className="detail-item">
                <Tooltip title="Contact Number" arrow>
                  <CallOutlinedIcon />
                </Tooltip>
                <Typography>{contactNumber}</Typography>
              </div>
              <div className="detail-item">
                <Tooltip title="Email" arrow>
                  <AlternateEmailOutlinedIcon />
                </Tooltip>
                <Typography>{email}</Typography>
              </div>
            </div>
          </CardContent>
        </Card>
 
        <div className="dashboard-content">
          <div className="course-stats">
            <Card className="stat-card enrolled" onClick={() => handleCardClick('enrolled')}>
              <div className="stat-content">
                <IconButton className="stat-icon">
                  <SchoolRoundedIcon fontSize="large" />
                </IconButton>
                <div className="stat-text">
                  <Typography variant="h6">Enrolled Courses</Typography>
 
                  <Typography variant="h3" className="stat-number">{selectedenrollcount}</Typography>
                </div>
              </div>
              <div className="stat-wave"></div>
            </Card>
            <Card className="stat-card inprogress" onClick={() => handleCardClick('inprogress')}>
              <div className="stat-content">
                <IconButton className="stat-icon">
                  <DownloadingRoundedIcon fontSize="large" />
                </IconButton>
                <div className="stat-text">
                  <Typography variant="h6">In Progress</Typography>
 
                  <Typography variant="h3" className="stat-number">{selectedinprogresscount}</Typography>
                </div>
              </div>
              <div className="stat-wave"></div>
            </Card>
             <Link
                    to={"/completedcourse"}
                    style={{ textDecoration: "none" }}
                  >
            <Card className="stat-card completed">
              <div className="stat-content">
                <IconButton className="stat-icon">
                  <MilitaryTechRoundedIcon fontSize="large" />
                </IconButton>
                <div className="stat-text">
                  <Typography variant="h6">Completed Course</Typography>
                  <Typography variant="h3" className="stat-number">{selectcompletecount}</Typography>
                </div>
              </div>
              <div className="stat-wave"></div>
            </Card>
            </Link>
          </div>
 
          <div className="dashboard-lower-half">
 
            {hasOngoingCourses && (
              <div className="overall-progress">
                <Typography variant="h6" className="progress-title">Overall Progress</Typography>
                <div id='Learner_Progress'>
 
                  <div className="progress-container">
                    <div className="circular-progress">
                      <div className="inner-circle">
                        <Typography variant="h3" className="progress-percentage">
                          {`0%`}
                        </Typography>
                      </div>
                    </div>
                  </div>
                  <div className="wave-container">
                    <div className="wave"></div>
                  </div>
                </div>
              </div>
            )
 
            }
 
            {hasScoreData && (
              <div className="score-progress">
                <>
                  <Typography variant="h6">Score Progress</Typography>
                  <LearnerScoreProgressBarGraph />
                </>
              </div>
            )}
 
 
            {hasOngoingCourses && (
              <div className="ongoing-courses">
                <>
                  <Typography variant="h6">Ongoing Courses</Typography>
                  {viewcourse.map((course, index) => (
                    <Card key={index} className="ongoing-course-card" style={{ width: 300, height: 90, borderRadius: '20px' }} onClick={() => handleongoingClick(course.enrolledCourseId)}>
                      <CardMedia
                        style={{ width: 100 }}
                        component="img"
                        image={course.thumbnailimage}
                        alt={course.enrolledCoursename}
                        className="dashboard-course-thumbnail"
                      />
                      <CardContent className="ongoing-course-content">
                        <Typography variant="subtitle1">{course.enrolledCoursename}</Typography>
                        <Typography variant="h6">89%</Typography>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '89%' }}></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
 
                </>
              </div>
            )}
 
 
            {(!hasScoreData && !hasOngoingCourses) && (
              <div className='row' id='recommend-container'>
                <div className=''>
                  <h3 id='count-recommend' style={{ color: '#27235C' }}>Recommended Courses</h3>
                </div>
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  removeArrowOnDeviceType={["tablet", "mobile"]}
                // containerClass='carousel-container'
                // itemClass='carousel-item'
                // autoPlay={true}
                // autoPlaySpeed={2000}
                // customTransition='transform 300ms ease-in-out'
                // transitionDuration={300}
                >
                  {filteredCourses.map((course, index) => (
                    <div key={index} id="rec-course">
                      <Card id='course-card' onClick={() => handleCourseClick(course.courseId)}>
                        <CardMedia
                          className='course-image'
                          component="img"
                          sx={{ width: 120 }}
                          image={course.thumbnailimage}
                          alt={course.title}
                        />
                        <CardContent id='course-content'>
                          <div id='course-typo'>
                            <Typography component="div" variant="h5" id='course-name'>
                              Course: {course.title}
                            </Typography>
                            <Typography variant="h6" component="div" id='course-name'>
                              Level: {course.level}
                            </Typography>
                            <Typography variant="subtitle1" component="div" id='course-name'>
                              Category: {course.catagory}
                            </Typography>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>);
};
 
const mapStateToProps = (state) => ({
  enrolledCourses: state.enrolledCourses.enrolledCourses || [], // Ensure it's an array
  loading: state.enrolledCourses.loading,
  error: state.enrolledCourses.error,
});
 
export default connect(mapStateToProps)(LearnerDashboard);
 
 
 
 
 