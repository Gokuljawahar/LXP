// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { fetchenrollCourse } from '../../actions/LearnerAction/EnrolledCourseAction';
// import '../../Styles/Learner/CompletedCourses.css'

// function CompletedCourses() {
//   const dispatch = useDispatch();
//   const id = sessionStorage.getItem("UserSessionID");
//   const enrolledCourses = useSelector((state) => state.enroll.course[0]);

//   useEffect(() => {
//     dispatch(fetchenrollCourse(id));
//   }, [dispatch, id]);

//   const completedCourses = enrolledCourses?.filter(course => course.completedStatus === 1) || [];

//   return (
//     <div className="completed-courses-container">
//       <h2>Completed Courses</h2>
//       <div className="course-grid">
//         {completedCourses.map((course) => (
//           <div key={course.enrollmentid} className="course-card">
//             <img src={course.thumbnailimage} alt={course.enrolledCoursename} className="course-thumbnail" />
//             <div className="course-info">
//               <h3>{course.enrolledCoursename}</h3>
//               <p>{course.enrolledcoursecategory}</p>
//               <p>{course.enrolledcourselevels}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CompletedCourses;

// import React, { useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { fetchenrollCourse } from '../../actions/LearnerAction/EnrolledCourseAction';
// import { useReactToPrint } from 'react-to-print';
// import '../../Styles/Learner/CompletedCourses.css';

// const Certificate = React.forwardRef(({ learnerName, courseName }, ref) => (
//   <div ref={ref} className="certificate">
//     <div className="certificate-content">
//       <div className="certificate-header">
//         <h1>Certificate of Completion</h1>
//       </div>
//       <div className="certificate-body">
//         <p>This is to certify that</p>
//         <h2>{learnerName}</h2>
//         <p>has successfully completed the course</p>
//         <h2>{courseName}</h2>
//         <p>Date: {new Date().toLocaleDateString()}</p>
//       </div>
//       <div className="certificate-footer">
//         <div className="signature">
//           <div className="signature-line"></div>
//           <p>Instructor Signature</p>
//         </div>
//         <div className="seal">
//           <svg width="100" height="100">
//             <circle cx="50" cy="50" r="45" fill="none" stroke="#c9a35b" strokeWidth="2" />
//             <text x="50" y="50" textAnchor="middle" fill="#c9a35b" fontSize="14" fontWeight="bold">
//               SEAL OF
//             </text>
//             <text x="50" y="70" textAnchor="middle" fill="#c9a35b" fontSize="14" fontWeight="bold">
//               EXCELLENCE
//             </text>
//           </svg>
//         </div>
//       </div>
//     </div>
//   </div>
// ));

// function CompletedCourses() {
//     const dispatch = useDispatch();
//     const id = sessionStorage.getItem("UserSessionID");
//     const enrolledCourses = useSelector((state) => state.enroll.course[0]);
//     const learnerName = useSelector((state) => state.user.name); // Assuming you have user info in Redux state

//     useEffect(() => {
//       dispatch(fetchenrollCourse(id));
//     }, [dispatch, id]);

//     const completedCourses = enrolledCourses?.filter(course => course.completedStatus === 1) || [];

//     const certificateRef = useRef();

//     const handlePrint = useReactToPrint({
//       content: () => certificateRef.current,
//     });

//   return (
//     <div className="completed-courses-container">
//       <h2>Completed Courses</h2>
//       <div className="course-grid">
//         {completedCourses.map((course) => (
//           <div key={course.enrollmentid} className="course-card">
//             <img src={course.thumbnailimage} alt={course.enrolledCoursename} className="course-thumbnail" />
//             <div className="course-info">
//               <h3>{course.enrolledCoursename}</h3>
//               <p>{course.enrolledcoursecategory}</p>
//               <p>{course.enrolledcourselevels}</p>
//               <button onClick={() => handlePrint()} className="view-certificate-btn">
//                 View Certificate
//               </button>
//             </div>
//             <div style={{ display: 'none' }}>
//               <Certificate
//                 ref={certificateRef}
//                 learnerName={learnerName}
//                 courseName={course.enrolledCoursename}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CompletedCourses;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchenrollCourse } from "../../actions/LearnerAction/EnrolledCourseAction";
import "../../Styles/Learner/CompletedCourses.css";
import { useNavigate } from "react-router-dom";

function CompletedCourses() {
  const dispatch = useDispatch();
  const id = sessionStorage.getItem("UserSessionID");
  const enrolledCourses = useSelector((state) => state.enroll.course[0]);
  const learnerName = useSelector((state) => state.user.name); // Assuming you have user info in Redux state

  useEffect(() => {
    dispatch(fetchenrollCourse(id));
  }, [dispatch, id]);

  const completedCourses =
    enrolledCourses?.filter((course) => course.completedStatus === 1) || [];

  const navigate = useNavigate();

  const handleNavigate = (enrollmentid) => {
    console.log("ecid", enrollmentid);
    navigate(`/certificate/${enrollmentid}`);
  };

  return (
    <div className="completed-courses-container">
      <h2
        id="Completionheader"
        style={{ fontWeight: "bold", color: "midnightblue", marginLeft: "40%" }}
      >
        Completed Courses
      </h2>
      <div className="course-grid">
        {completedCourses.map((course) => (
          <div key={course.enrollmentid} className="course-card">
            <img
              src={course.thumbnailimage}
              alt={course.enrolledCoursename}
              className="completedcourse-thumbnail"
            />
            <div className="course-info">
              <h3>{course.enrolledCoursename}</h3>
              <p>{course.enrolledcoursecategory}</p>
              <p>{course.enrolledcourselevels}</p>
              <button
                onClick={() => {
                  handleNavigate(course.enrollmentid);
                }}
                className="view-certificate-btn"
              >
                View Certificate
              </button>
              <button
                onClick={() => {
                  navigate(`/coursefeedbackquestion/${course.enrolledCourseId}`);
                }}
                className="view-certificate-btn"
              >
                Add Feedback
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedCourses;