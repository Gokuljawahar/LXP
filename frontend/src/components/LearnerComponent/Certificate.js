

import React from 'react';
import "../../Styles/Learner/Certificate.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState , useRef } from 'react';
import { fetchenrollCourse } from '../../actions/LearnerAction/EnrolledCourseAction';
import { useParams } from 'react-router-dom';
import { FetchuserDataRequest } from '../../actions/LearnerAction/FetchRegisterAction';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button , Dialog , DialogActions , DialogTitle } from '@mui/material';
import award from "../../assets/Learner/award.png";
import sign from "../../assets/Learner/Sign.png";
import sign1 from "../../assets/Learner/Sign1.png";

const Certificate = () => {

    const certificateRef = useRef(null);
    const learnerId = sessionStorage.getItem('UserSessionID')
    const [viewDate, setViewDate] = useState(null);
    const { enrollmentid } = useParams()
    console.log("eid", enrollmentid)
    const dispatch = useDispatch();
    const id = sessionStorage.getItem("UserSessionID");
    const enrolledCourses = useSelector((state) => state.enroll.course[0]);

    const certificatedetails = enrolledCourses?.filter(course => course.completedStatus === 1 && course.enrollmentid === enrollmentid) || [];
    console.log("certificate", certificatedetails)


    useEffect(() => {
        dispatch(fetchenrollCourse(id));
        setViewDate(new Date().toLocaleDateString());
    }, [dispatch, id]);


    useEffect(() => {
        fetchData((learnerId));

    }, [dispatch]);


    const firstname = useSelector((state) => state.fetchlearner.userData.firstName);
    console.log("firstname", firstname);

    const lastname = useSelector((state) => state.fetchlearner.userData.lastName);
    console.log("lastname", lastname);


    const fetchData = async (learnerId) => {
        try {

            dispatch(FetchuserDataRequest(learnerId));



        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const [openDialog , setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDownloadPNG = () => {
        if (certificateRef.current) {
            html2canvas(certificateRef.current).then((canvas) => {
                const link = document.createElement('a');
                link.download = 'CertificateofCompletion.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        }
        handleCloseDialog();
    };

    const handleDownloadPDF = () => {
        if (certificateRef.current) {
            html2canvas(certificateRef.current).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('l', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('CertificateofCompletion.pdf');
            });
        }
        handleCloseDialog();
    };

    return (
        <div className="completioncertificate" ref={certificateRef}>
            <div className="corner top-left"></div>
            <div className="corner top-right"></div>
            <div className="contentcompletioncertificate">
                <h1 id="CertificateTitle">CERTIFICATE</h1>
                <h2 id="CompletionTitle" style={{ marginLeft: "-5px" }}>OF COMPLETION</h2>
                {certificatedetails.map((course) => (
                    <div>
                        <p>THIS IS TO CERTIFY THAT</p>
                        <h3 id="UserName" style={{color:"#97247E"}}>{firstname} {lastname}</h3>
                        <p>For Successfully completing</p>
                        <h4 id="CourseName" style={{color:"#97247E"}}>{course.enrolledCoursename} Course</h4>
                    </div>
                ))}
                <div className="signatures">
                    <div className="signature">
                    <div><img src={sign} style={{width:"80%",height:"10%" , marginTop:"-70%"}}></img></div>
                        <div className="line"></div>
                        <p className="title">Product Owner</p>
                        <i style={{color:"#97247E"}}>Senathipathi Kannusamy</i>
                    </div>
                    {/* <div className="medal"> <FaMedal style={{ fontSize: "80px", color: "gold", marginTop: "-80px" }} /></div> */}
                    <div><img src={award} style={{width:"50%",height:"30%" , marginTop:"-23%"}}></img></div>
                    <div className="signature">
                    <div><img src={sign1} style={{width:"85%",height:"30%" , marginTop:"-60%"}}></img></div>
                        <div className="line"></div>
                        <p className="title">Manager</p>
                        <i style={{color:"#97247E"}}>Gowtham Sridharan</i>
                    </div>
                </div>
            </div>
            <div className="corner bottom-left"></div>
            <div className="corner bottom-right"></div>
            <div className="download-options">
            <Button style={{marginTop:"-2%",marginLeft:"10%"}} onClick={handleOpenDialog}>Download Certificate</Button>
            </div>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Choose Download Format</DialogTitle>
                <DialogActions>
                    <Button onClick={handleDownloadPNG}>PNG</Button>
                    <Button onClick={handleDownloadPDF}>PDF</Button>
                </DialogActions>
            </Dialog>
        </div>
    //   </div>
    );
};

export default Certificate;