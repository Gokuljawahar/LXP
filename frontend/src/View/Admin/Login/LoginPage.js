
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "../../../Styles/Admin/Loginpage.css";
import Relevantz from "../../../assets/Admin/Images/Relevantz.png";
import { ReactTyped } from "react-typed";
import { Link, useNavigate } from "react-router-dom";
import {
  emailRegex,
  passwordRegex,
  validationMessages,
} from "../../../utils/Admin/Validation";
import {
  loginRequest,
  loginPasswordMessage,
  successdata,
} from "../../../actions/Admin/loginAction";
import { Alert } from "@mui/material";
import Swal from "sweetalert2";
import LoginBackground from "../../../assets/Admin/Images/LmsLogin.png";
import LearnerIdbyProfileId from "../../../middleware/LearnerMiddleware/LearnerIdbyProfileId";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
 
const Loginpage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const isSuccessadmin = useSelector((state) => state.user.isSuccessadmin);
  const isSuccessuser = useSelector((state) => state.user.isSuccessuser);
  const [alertmessage, setAlertmessage] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordfailuremessage, setpasswordfailureAlertmessage] =
    useState(false);
  const isPasswordMessage = useSelector((state) => state.user.failuremessage);
  const isEmailfailuremessage = useSelector(
    (state) => state.user.emailfailuremessage
  );
  const [emailfailurealertmessage, setEmailfailurealertmessage] =
    useState(false);
  const StoreLoginResposeData = useSelector((state) => state.user.user);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
 
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
 
  const handlnavigation = (path) => {
    setAlertmessage(true);
    const timer = setTimeout(() => {
      setAlertmessage(false);
      navigate(path);
    }, 1000);
    return () => clearTimeout(timer);
  };
 
  useEffect(() => {
    if (isSuccessuser) {
      handlnavigation("/LearnerDashboard");
    }
  }, [isSuccessuser]);
 
  useEffect(() => {
    let timer;
    if (isSuccessadmin) {
      setAlertmessage(true);
      timer = setTimeout(() => {
        setAlertmessage(false);
        navigate("/admindashboard");
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [isSuccessadmin, navigate]);
 
  useEffect(() => {
    let times;
    if (isPasswordMessage) {
      setpasswordfailureAlertmessage(true);
      times = setTimeout(() => {
        setpasswordfailureAlertmessage(false);
        const data = "invalid password";
        dispatch(loginPasswordMessage(data));
      }, 2000);
    }
    return () => clearTimeout(times);
  }, [isPasswordMessage]);
 
  useEffect(() => {
    let emailmessgeclosingtime;
    if (isEmailfailuremessage) {
      setEmailfailurealertmessage(true);
      emailmessgeclosingtime = setTimeout(() => {
        setEmailfailurealertmessage(false);
      }, 2000);
    }
    return () => clearTimeout(emailmessgeclosingtime);
  }, [isEmailfailuremessage]);
 
  if (StoreLoginResposeData != null) {
    const { email, password, role, getLearnerId } = StoreLoginResposeData;
    if (email === true && password === true && role === "Admin") {
      const adminId = getLearnerId;
      sessionStorage.setItem("AdminSessionId", adminId);
      sessionStorage.setItem("Role", role);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Welcome!! Back Admin, Successfully Logged In",
      });
      dispatch(successdata(false));
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else if (email === true && password === true && role === "Learner") {
      const learnerId = getLearnerId;
      sessionStorage.setItem("UserSessionID", learnerId);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Welcome Back !!! Futures of Earth,Continue Your Learning.",
      });
      dispatch(successdata(false));
      LearnerIdbyProfileId();
      setTimeout(() => {
        navigate("/LearnerDashboard");
      }, 2000);
    } else if (email === false && password === false) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Please Enter Valid Email",
      });
      dispatch(successdata(false));
    } else if (email === true && password === false) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "error",
        title: "Please Enter correct Password",
      });
      dispatch(successdata(false));
    }
  }
 
  const onSubmit = (data) => {
    dispatch(loginRequest(data));
  };
 
  return (
    <>
      <Container fluid className="d-flex">
        <Row>
          <Col sx={12} md={6}>
            <img
              style={{
                height: "80%",
                width: "80%",
                padding: "5%",
                marginTop: "13%",
                marginLeft: "10%",
              }}
              className="img-fluid"
              src={LoginBackground}
              alt="logo"
            />
          </Col>
          <Col>
            <div className="login-app">
              <Row id="login-message">
                <h3
                  style={{
                    color: "#27235c",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: "30px",
                  }}
                >
                  Welcome to{" "}
                  <ReactTyped
                    strings={[
                      ' Relevantz <span style="color: #97247E ; font-weight: bold; text-transform: uppercase; font-family: cursive;">LXP</span> Platform',
                    ]}
                    typeSpeed={200}
                    loop
                    showCursor={true}
                    contentType="html"
                  />
                </h3>
              </Row>
              <div className="login-container">
                <div className="loginform-container">
                  <div className="login-header">
                    <img src={Relevantz} alt="Logo" />
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      {showAlert && (
                        <Alert severity="error">{alertMessage}</Alert>
                      )}
                    </div>
                    <div style={{ marginTop: "5px" }}>
                      <input
                        {...register("email", {
                          required: validationMessages.email.required,
                          pattern: {
                            value: emailRegex,
                            message: validationMessages.email.receivePattern,
                          },
                        })}
                        type="text"
                        placeholder="Email"
                      />
                    </div>
 
                    <p id="loginerrormessage">{errors.email?.message}</p>
                    <div style={{ position: "relative", marginTop: "5px" }}>
                      <input
                        {...register("password", {
                          required: validationMessages.password.required,
                          minLength: {
                            value: passwordRegex,
                            message: validationMessages.password.minLength,
                          },
                          pattern: {
                            value: passwordRegex,
                            message: validationMessages.password.receivePattern,
                          },
                        })}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                      />
                      <span
                        onClick={handlePasswordVisibility}
                        style={{
                          position: "absolute",
                          right: "10px",
                          top: "40%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </span>
                      <p id="loginerrormessage">{errors.password?.message}</p>
                    </div>
                    <div
                      className="button-login"
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <button className="btn">Login</button>
                    </div>
                    <div
                      style={{
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link
                        to={"/RegisterView"}
                        style={{ textDecoration: "none" }}
                      >
                        New User?
                        <br />
                        Register here...
                      </Link>
                      <Link to={"/email"} style={{ textDecoration: "none" }}>
                        Forgot password?
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
 
export default Loginpage;
 
 