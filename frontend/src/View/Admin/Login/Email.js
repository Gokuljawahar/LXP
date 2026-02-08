import React, { useEffect } from 'react';
import { set, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { emailRegex, validationMessages } from '../../../utils/Admin/Validation';
import { RESET_EMAIL_UPDATED_FAILURE_MESSAGE, RESET_EMAIL_UPDATED_SUCCESS_MESSAGE, emailRequest } from '../../../actions/Admin/EmailAction';
import { useDispatch, useSelector } from 'react-redux';
import Relevantz from '../../../assets/Admin/Images/Relevantz.png';
import '../../../Styles/Admin/Loginpage.css';
import { Col, Container, Row } from 'react-bootstrap';
import ForgotPasssword from '../../../assets/Admin/Images/Sent Message-bro (1).png'
import LXPlogo from '../../../assets/Admin/Images/Relevantz.png'
import { useState } from 'react';
import Swal from 'sweetalert2';
import { SpinnerComponent } from '../../../components/Admin/SpinnerComponent';

function Email() {
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const isSuccessemail = useSelector((state) => state.email.isSuccessemail);

    const isFailureEmail = useSelector((state) => state.email.isFailureEmail);

    console.log("isfailuremessage", isFailureEmail);

    const email = useSelector((state) => state.email.email);


    const [loading, setLoading] = useState(false);



    useEffect(() => {
        if (isFailureEmail) {
            setTimeout(() => {
                setLoading(false);

            }, 2000);
            const Toast = Swal.mixin({
                toast: true, position: "top",
                showConfirmButton: false, timer: 2000, timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({ icon: "error", title: "Please Enter the valid Email Address" });

        }

        dispatch({ type: RESET_EMAIL_UPDATED_FAILURE_MESSAGE });
    }, [isFailureEmail, dispatch, setTimeout])


    useEffect(() => {
        if (isSuccessemail) {
            setLoading(false);  // for false the spinner state 
            const Toast = Swal.mixin({
                toast: true, position: "top",
                showConfirmButton: false, timer: 1000, timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({ icon: "success", title: "Email Sended successfully" });

            setTimeout(() => {
                navigate('/forgotpassword', { state: { email: email } });
            }, 2000);

            dispatch({ type: RESET_EMAIL_UPDATED_SUCCESS_MESSAGE })
        }
    }, [isSuccessemail, navigate, dispatch]);



    const onSubmit = (data) => {
        setLoading(true);   // for True the spinner state 

        dispatch(emailRequest(data));
    };

    const [sendemailbutton, SetsendEmailButton] = useState('');


    return (
        <>
            <Container fluid className='d-flex'>
                <Row>
                    <Col xs={12} md={6}>

                        <img style={{ height: 'auto', width: '100%' }} className='img-fluid' src={ForgotPasssword} alt='logo' />
                    </Col>
                    <Col id='Email-Form-column' xs={12} md={6}>

                        <div id='Email-Submitting-form'>

                            <div className="login-header">
                                <img src={LXPlogo} alt="Logo" />
                            </div>
                            {

                                // loading?<SpinnerComponent/>:
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* <div>
                                        <input
                                            {...register('email', {
                                                required: validationMessages.email.required,
                                                pattern: {
                                                    value: emailRegex,
                                                    message: validationMessages.email.pattern
                                                }
                                            })}
                                            type='text'
                                            placeholder='Enter Your Email'
                                            className='form-control'
                                            id='Email-input'

                                            onChange={(e) => SetsendEmailButton(e.target.value)}
                                        />
                                    </div> */}

                                    <div>
                                        <input
                                            {...register('email', {
                                                required: validationMessages.email.required, // This checks if the email field is required
                                                pattern: {
                                                    value: emailRegex, // This is the regular expression pattern that the email must match
                                                    message: validationMessages.email.pattern // This message will show if the pattern does not match
                                                }
                                            })}
                                            type='text'
                                            placeholder='Enter Your Email'
                                            className='form-control'
                                            id='Email-input'
                                            onChange={(e) => SetsendEmailButton(e.target.value)} // This updates the state when the email is typed
                                        />
                                    </div>
                                    <p id='loginerrormessage'>{errors.email?.message}</p>
                                    {/* {
                                    loading?
                                    <SpinnerComponent/>: */}
                                    {/* <div className='button-login'>
                                 {
                                     sendemailbutton.length > 0 ?
                                         <button type='submit' className='btn btn-primary'>Send Email</button> 
                                         : <button type='submit' id='Button-Disabled' className='btn btn-primary' disabled>Send Email</button>         
                                 }
                             </div> */}

                                    {/* } */}
                                    {/* {loading ? (
                                        <SpinnerComponent /> // Render the spinner when loading is true
                                    ) : (
                                        sendemailbutton.length > 0 && isSuccessemail===false ? ( 
                                            <button type='submit' className='btn btn-primary'>Send Email</button>
                                        ) : (
                                            <button type='submit' id='Button-Disabled' className='btn btn-primary' disabled >Send Email</button>
                                        )
                                    )} */}

                                    {loading ? (
                                        <SpinnerComponent /> // Render the spinner when loading is true
                                    ) : (
                                        <button
                                            type='submit'
                                            className='btn btn-primary'
                                            disabled={isSuccessemail || sendemailbutton.length === 0} // Automatically disable the button if isSuccessemail is true
                                        >
                                            Send Email
                                        </button>
                                    )}
                                </form>
                            }
                        </div>
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default Email;