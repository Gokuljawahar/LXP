import React, { useState, useEffect } from 'react';
import { validateRegistrationForm } from '..//../utils/LearnerValidations/RegisterValidation';
import '..//..//Styles/Learner/Register.css';
// import {  sendOTP } from '../../middleware/RegisterApi.js';
import Select from 'react-select';
import { userDataRequest, userDataSuccess } from '../../actions/LearnerAction/RegisterAction';
import { useDispatch, useSelector } from 'react-redux';
import { FaInfoCircle } from 'react-icons/fa';
import { userEmailRequest } from '../..//actions/LearnerAction/Fetchemail';
import { userOTPRequest } from '../../actions/LearnerAction/OTPAction';
import Modal from 'react-modal';
import { getCoursesRequest } from '../../actions/LearnerAction/LearnerGetCourseAction'
import fetchEmailApi from '../../middleware/LearnerMiddleware/FetchEmailApi';
import { Tooltip } from 'react-tooltip';
import { fetchallCoursesRequest } from '../../actions/Admin/Adnimviewcourse';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import RegisterApi from '../../middleware/LearnerMiddleware/RegisterApi';
 
export default function Register() {
    const [errors, setErrors] = useState({});
 
    console.log("checking the Erros",errors);
 
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [recievedOTP, setRecievedOTP] = useState('');
    const navigate = useNavigate();
    const [showOTP, setShowOTP] = useState(false);
    const [enteredOTP, setEnteredOTP] = useState('');
    const [emailVerified, setEmailVerified] = useState(false);
    const [showPasswordRules, setShowPasswordRules] = useState(false);
    const [timer, setTimer] = useState(120);
    const [errorMessage, setErrorMessage] = useState('');
 
    console.log("checkerrormesssage",errorMessage);
    const [ageError, setAgeError] = useState(false);
    const [buttonText, setButtonText] = useState('Send OTP');
    const [showModal, setShowModal] = useState(false);
    const [verifyOTP, setVerifyOTP] = useState('');
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dob: '',
        email: '',
        otp: '',
        contactNumber: '',
        password: '',
        stream: '',
        role: 'Learner',
    });
 
    const streamCourses = useSelector((state) => state.allcourse.courses);
    const options = streamCourses.map((course) => ({
        value: course.title,
        label: course.title,
    }));
 
    const dispatch = useDispatch();
 
    useEffect(() => {
        let interval;
        if (showOTP) {
            interval = setInterval(() => {
                setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [showOTP]);
 
    useEffect(() => {
        if (timer === 0) {
            setShowOTP(false);
        }
    }, [timer]);
 
    const handlePasswordIconHover = () => {
        setShowPasswordRules(true);
    };
 
    const handlePasswordLeave = () => {
        setShowPasswordRules(false);
    };
   
    const alertdisplayotp = () => {
        const Toast = Swal.mixin({
            toast: true,
            background: '#21903d',
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
 
        Toast.fire({
            icon: 'success',
            iconColor: 'white',
            title: 'OTP Send successfully',
            customClass: {
                popup: 'custom-toast',
            },
        });
 
       
    };
 
    const alertdisplayemail = () => {
        const Toast = Swal.mixin({
            toast: true,
            background: '#21903d',
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
 
        Toast.fire({
            icon: 'success',
            iconColor: 'white',
            title: 'Email Verified successfully',
            customClass: {
                popup: 'custom-toast',
            },
        });
 
       
    };
 
 
 
    const handleSendOTP = async () => {
        if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors({ ...errors, email: 'Invalid email address' });
            return;
        }
        setShowOTP(true);
        setErrors('');
        setTimer(120);
        handleOTPSubmit();
        alertdisplayotp();
        const data = await fetchEmailApi(userData.email);
        setRecievedOTP(data);
    };
 
    const handleOTPChange = (event) => {
        setEnteredOTP(event.target.value);
        setErrors({ ...errors, otp: '' });
    };
 
   
const handleOTPSubmit = () => {
        setUserData({ ...userData, otp: recievedOTP });
        setVerifyOTP(recievedOTP);
    };
 
    const SubmitOtp = (event) => {
        event.preventDefault();
        if (enteredOTP === recievedOTP) {
            setEmailVerified(true);
            setShowOTP(false);
            setErrors({ ...errors, otp: '', email: '' });
            dispatch(userOTPRequest(enteredOTP, userData.email));
            alertdisplayemail();
        } else {
            setErrors({ ...errors, otp: 'Invalid OTP' });
        }
    };
 
 
    const alertdisplayregister = () => {
        const Toast = Swal.mixin({
            toast: true,
            background: '#21903d',
            position: 'top',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
 
        Toast.fire({
            icon: 'success',
            iconColor: 'white',
            title: 'Registered successfully',
            customClass: {
                popup: 'custom-toast',
            },
        });
 
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };
 
    const handleChange = (e) => {
        setErrorMessage('');
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
            setUserData({ ...userData, email: value },{...userData, firstName:value},{...userData,lastName:value},
               
                {...userData,contactNumber:value},{...userData,gender:value},{...userData,dob:value},{...userData,password:value});
        } else if (name === 'stream') {
            setUserData({ ...userData, stream: value });
        } else {
            setUserData({ ...userData, [name]: value });
        }
        setErrors({ ...errors, [name]: '' });
 
        setValidationError(false);
    };
 
 
    // const handleSubmit = (e) => {
    //     e.preventDefault();
 
    //     console.log("userdata",userData);
    //     const today = new Date();
    //     const birthDate = new Date(userData.dob);
    //     let age = today.getFullYear() - birthDate.getFullYear();
    //     const month = today.getMonth() - birthDate.getMonth();
 
    //     if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    //         age--;
    //     }
 
    //     const ageLimit = 18;
 
    //     if (age < ageLimit) {
    //         setAgeError(true);
    //         setErrorMessage('You must be at least 18 years old to register');
    //         return;
    //     }
    //     if (!emailVerified) return;
       
    //     const validationErrors = validateRegistrationForm(userData);
 
    //     console.log("validationerros",validationErrors);
 
    //     if (Object.keys(validationErrors).length > 0) {
    //         setErrors(validationErrors);
    //         return;
    //     }
 
    //     if (validationErrors && typeof validationErrors === 'object' && Object.keys(validationErrors).length === 0) {
    //         const updatedUserData = {
    //             ...userData,
    //             stream: userData.stream.map((option) => option.value).join(', '),
    //         };
 
           
    //         dispatch(userDataRequest(updatedUserData));
    //         alertdisplayregister();
    //         setTimeout(() => {
    //                             navigate("/");
    //                           }, 2000);
    //     } else {
    //         setErrors(validationErrors || {});
    //     }
    // };
 
    const [validationformerror,setValidationError]=useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateRegistrationForm(userData,setValidationError);
        console.log("validation",validationErrors);
        // const isFormValid = validateForm(course, setErrors);
        const today = new Date();
        const birthDate = new Date(userData.dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
 
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
 
        const ageLimit = 18;
 
        if (age < ageLimit) {
            setAgeError(true);
            setErrorMessage('You must be at least 18 years old to register');
            return;
        }
        if (!emailVerified) return;
       
 
 
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
 
        if (validationErrors) {
            const updatedUserData = {
                ...userData,
                stream: userData.stream.map((option) => option.value).join(', '),
            };
            await RegisterApi(updatedUserData)
            // dispatch(userDataRequest(updatedUserData));
            alertdisplayregister();
            // setTimeout(() => {
            //                     navigate("/");
            //                   }, 2000);
        } else {
            setErrors(validationErrors || {});
        }
    };
 
 
   
 
    const handleGenderChange = (event) => {
        setGender(event.target.value);
        setErrors({ ...errors, gender: '' });
    };
 
    const closeModal = () => {
        setShowModal(false);
    };
 
    useEffect(() => {
        dispatch(fetchallCoursesRequest());
    }, []);
 
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
 
 
    return (
        <div style={{ height: "100vh" }} class="register">
        <div class="row">
            <div class="col-md-3 register-left">
                <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                <h3>Welcome to Relevantz </h3>
                <h4>Learning Experience Platform</h4>
                <h6>Gain your knowledge with Relevantz</h6>
                {/* <input type="submit" name="" value="Login" /><br /> */}
            </div>
 
            <div class="col-md-9 register-right">
 
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active " id="home" role="tabpanel" aria-labelledby="home-tab">
 
                        <h3 class="register-heading">Join us with an Intellectual Adventure!!!</h3>
                        <Modal
                            isOpen={showModal}
                            onRequestClose={closeModal}
                            contentLabel='Registration Success'
                            className='Modal'
                            overlayClassName='Overlay'
                        >
                            <h2>Registration successfully!</h2>
                            <button onClick={closeModal} >close</button>
 
                        </Modal>
                        <div class="row register-form">
                                <div class="col-md-6">
                                    <div class="form-group">
 
 
                                        <input type="text" class="form-control field" placeholder="First Name *" value={userData.firstName} name="firstName" onChange={handleChange} disabled={showOTP} />
                                        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                                    </div>
                                    <div class="form-group">
 
                                        <input type="number" class="form-control" placeholder="Phone Number *" value={userData.contactNumber} name="contactNumber" onChange={handleChange} disabled={showOTP} />
                                        {errors.contactNumber && <div className="text-danger">{errors.contactNumber}</div>}
                                    </div>
                                    <div className="form-group d-flex">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email *"
                                            value={userData.email}
                                            name="email"
                                            onChange={handleChange}
                                            disabled={showOTP || emailVerified}
 
                                            style={{maxHeight:40}}
                                        />
                                        {emailVerified && <span className="text-success">&#10004;</span>}
                                        {!showOTP && !emailVerified && email.trim() !== '' && (
                                            <button className="btn btn-primary ms-1 otp" onClick={handleSendOTP} style={{maxHeight:40}} >
                                                <a style={{fontSize:'12px'}}>{timer === 0 ? 'Resend OTP' : 'Send OTP'}</a>
                                            </button>
                                        )}
                                        {errors.email && <div style={{ marginLeft: '15px' }}  className="text-danger">{errors.email}</div>}
                                        {showOTP && !emailVerified && (
                                            <div className="form-group" style={{marginTop:'0'}}>
                                                <input
                                                    type="text"
                                                    minLength="6"
                                                    maxLength="6"
                                                    name="enteredOTP"
                                                    className="form-control"
                                                    placeholder="Enter OTP *"
                                                    value={enteredOTP}
                                                    onChange={handleOTPChange}
                                                   
                                                />
                                                <div  style={{ color:'blue' }}>
                                                    {`${minutes}:${seconds < 10 ? '0' : ''}${seconds} remaining`}
                                                </div>
                                                {enteredOTP.length === 6 && (
                                                    <button className="btn btn-primary ms-1 otp" onClick={SubmitOtp}>
                                                        <a>Submit</a>
                                                    </button>
                                                )}
                                                {errors.otp && <div className="text-danger">{errors.otp}</div>}
                                            </div>
                                           
                                           
                                        )}
                                       
                                       
                                    </div>
                               
                                <div style={{marginTop:"-2%"}} class="form-group">
                                    <input style={{width:"425px"}} type="password" class="form-control" placeholder="Password *" value={userData.password} name="password" onChange={handleChange} disabled={showOTP} />
                                    <FaInfoCircle style={{marginLeft:"105%",marginTop:"-26%"}} className='password-icon Red-icon' onMouseEnter={handlePasswordIconHover} onMouseLeave={handlePasswordLeave} />
                                    {validationformerror.password && <div className="text-danger">{validationformerror.password}</div>}
                                </div>
                                {showPasswordRules && <div className='password-rules'>
                                    <p style={{marginLeft:"6%",marginTop:"-10%"}} className='error-message'>Password must be between 8 to 14 characters,must contain one uppercase,must contain one lowercase,and must contain one special character</p>
                                </div>}
                               
 
 
                                <div class="form-group">
                                    <div class="maxl d-flex">
                                        <h6 style={{ marginTop: "25px" }}>Gender:</h6>
                                        <div className="gender-container">
                                            <label class="gender">
                                                <input type="radio" name="gender" value="male" checked={userData.gender === "male"} onChange={handleChange} disabled={showOTP} />
                                                <span>Male</span>
                                            </label>
                                            <label class="gender">
                                                <input type="radio" name="gender" value="female" checked={userData.gender === "female"} onChange={handleChange} disabled={showOTP} />
                                                <span>Female</span>
                                            </label>
                                            <label class="gender">
                                                <input type="radio" name="gender" value="others" checked={userData.gender === "others"} onChange={handleChange} disabled={showOTP} />
                                                <span>Transgender</span>
                                            </label>
                                        </div>
                                    </div>
                                    {validationformerror.gender && <div className="text-danger">{validationformerror.gender}</div>}
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Last Name *" value={userData.lastName} name="lastName" onChange={handleChange} disabled={showOTP} />
                                    {validationformerror.lastName && <div className="text-danger">{validationformerror.lastName}</div>}
                                </div>
 
                                <div class="form-group">
                                    <input type="text" class="form-control" value={userData.dob} name="dob" placeholder="Date Of Birth *" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} max={new Date().toISOString().split('T')[0]} onChange={handleChange} disabled={showOTP} />
                                    {ageError && (<div className='age-error-message'><p className='error-message'>{errorMessage}</p></div>)}
                                    {validationformerror.dob && <div className="text-danger">{validationformerror.dob}</div>}
                                </div>
                                <div class="form-group">
                                    <Select
                                        isMulti
                                        name="stream"
                                        options={options}
                                        className="basic-multi-select"
                                        classNamePrefix="stream"
                                        placeholder="Choose your stream"
                                        value={userData.stream}
                                        onChange={(selectedOption) => handleChange({ target: { name: "stream", value: selectedOption } })}
                                        isDisabled={showOTP}
 
                                    />
                                    {validationformerror.selectedOptions && <div className="text-danger">{validationformerror.selectedOptions}</div>}
 
                                </div>
                                <div class="form-group ">
                                    <input type="password" class="form-control" placeholder="Confirm Password *" value={userData.confirmPassword} name="confirmPassword" onChange={handleChange} disabled={showOTP} />
                                    {validationformerror.confirmPassword && <div className="text-danger">{validationformerror.confirmPassword}</div>}
                                </div>
                                <br></br>
                                <button type="submit" data-testid="ben" className="btnRegister" onClick={handleSubmit} ><a>
                                    Register</a>
                                </button>
 
                                {/* <input type="submit" class="btnRegister" value="Register" onClick={handleSubmit} /> */}
                            </div>
                            {/* {altermessage && <Alert variant="outlined" severity="success">
              Registered successful! Redirecting...
            </Alert>} */}
 
                        </div>
 
                    </div>
                </div>
            </div>
        </div>
 
    </div>
 
    );
}
 