import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../../Styles/Admin/ReportMainView.css';
import { Button, Container, Row } from "react-bootstrap";
import LocalLibraryTwoToneIcon from '@mui/icons-material/LocalLibraryTwoTone';
import PeopleIcon from '@mui/icons-material/People';
import QuizIcon from '@mui/icons-material/Quiz';
import QuizReportView from "./QuizReportView";
import { useRef, useState } from "react";
import LearnerReportView from "./LearnerReportView";
import CourseReportView from "./CourseReportView";
import CourseEnrollmentReportView from "./CourseEnrollmentReportView";
import SubjectIcon from '@mui/icons-material/Subject';
import CloseIcon from '@mui/icons-material/Close';

// Hook call

import { useEffect } from "react";

export default function ReportMainView() {

    //  SETTING THE SCROLL FOR THE REPORT    (USING THE useRef hook)


    const quizReportRef = useRef(null);
    const learnerReportRef = useRef(null);
    const courseReportRef = useRef(null);
    const enrollmentReportRef = useRef(null);

    const [isReportVisible, setIsReportVisible] = useState(true);

    // SETTING THE STATE FOR DISPAY THE PARTICULAR REPORT ONLY    -- Setting up the all the handle changes


    const [activeReport, setActiveReport] = useState(null);


    const handleViewQuizReport = () => {
        setActiveReport('quiz');
        quizReportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollTo({ top: quizReportRef.current.offsetTop, behavior: 'smooth' });

    };

    const handleViewLearnerReport = () => {
        setActiveReport('learner');
        learnerReportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollTo({ top: learnerReportRef.current.offsetTop, behavior: 'smooth' });
    };

    const handleViewCourseReport = () => {
        setActiveReport('course');
        courseReportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollTo({ top: courseReportRef.current.offsetTop, behavior: 'smooth' });
    };

    const handleViewEnrollmentReport = () => {
        setActiveReport('enrollment');
        enrollmentReportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.scrollTo({ top: enrollmentReportRef.current.offsetTop, behavior: 'smooth' });


    };





    // Handler function to close the active report
    const handleCloseReport = () => {
        setActiveReport(null);
        setIsReportVisible(false); // This will hide the button after it's clicked
        sessionStorage.removeItem("ActiveReport")
        localStorage.removeItem("rowsPerPage")
        localStorage.removeItem("CourserowsPerPage")
        localStorage.removeItem("LearnerrowsPerPage")
        localStorage.removeItem("EnrolledCourserowsPerPage")
    };



    // Store the report active page in the session storage and call in the useEffect 

    // Save the session storage

    useEffect(() => {
        if (activeReport) {
            sessionStorage.setItem("ActiveReport", activeReport)
        }
    }, [activeReport])



    // Restore the active report from sessionStorage when the component mounts

    useEffect(() => {
        const savedReport = sessionStorage.getItem("ActiveReport")

        if (savedReport) {
            setActiveReport(savedReport);
        }
    }, [])


    return (
        <>
            <Container fluid>
                <div className="mt-5">
                    {/* <div id="Report-Page-Title">LXP Report Page</div> */}
                    <Row>
                        <div id="Report-page-description">
                            <div class="div-report-page-description">
                                {/* <div class="row-card">
                                </div> */}
                                <div class="row-card">
                                    <h3><b> Learner Report:<PeopleIcon /> </b></h3><p>Track individual learner progress, engagement, and performance metrics.</p>
                                    <div style={{ float: 'right' }}>
                                        <div>
                                            <button type="button" onClick={handleViewLearnerReport} class="btn btn-outline-primary">View Report</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-card">
                                    <h3><b>Course Report:<LocalLibraryTwoToneIcon /></b></h3><p> Gain detailed overviews of course content utilization and effectiveness.</p>
                                    <div style={{ float: 'right' }}>
                                        <div>
                                            <button onClick={handleViewCourseReport} class="btn btn-outline-primary">View Report</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="row-card">
                                    <h3> <b> Quiz Report:<QuizIcon /></b></h3><p>Evaluate quiz outcomes, question difficulty levels, and learner assessment data.</p>
                                    <div style={{ float: 'right' }}>
                                        <button onClick={handleViewQuizReport} class="btn btn-outline-primary">View Report</button>
                                    </div>
                                </div>
                                <div class="row-card">
                                    <h3> <b> Course Enrollment Report:<SubjectIcon /></b></h3><p> course completion rates to understand the dynamics of course participation.</p>
                                    <div style={{ float: 'right' }}>
                                        <div>
                                            <button onClick={handleViewEnrollmentReport} class="btn btn-outline-primary">View Report</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Row>
                    <Row >
                        <div ref={quizReportRef}>
                            {activeReport === 'quiz' && <QuizReportView />}
                        </div>
                        <div ref={learnerReportRef}>
                            {activeReport === 'learner' && <LearnerReportView />}
                        </div>

                        <div ref={courseReportRef}>
                            {activeReport === 'course' && <CourseReportView />}


                        </div>
                        <div ref={enrollmentReportRef}>
                            {activeReport === 'enrollment' && <CourseEnrollmentReportView />}

                        </div>
                        {
                            activeReport && (
                                <div>
                                    <button style={{ float: 'right' }} onClick={handleCloseReport} className="btn btn-danger">Close<CloseIcon /></button>
                                </div>
                            )
                        }
                    </Row>
                </div >
            </Container>
        </>
    )
}