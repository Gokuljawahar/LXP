
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  emailRegex,
  passwordRegex,
  validationMessages,
  receivedPasswordRegex,
} from "../../../utils/Admin/Validation";
import { useDispatch, useSelector } from "react-redux";
import { RESET_PASSWORD_FAILURE_MESSAGE, RESET_PASSWORD_SUCCESS_MESSAGE, forgotpasswordrequest } from "../../../actions/Admin/ForgotPasswordAction";
import Relevantz from "../../../assets/Admin/Images/Relevantz.png";
import ForgotPasssword from '../../../assets/Admin/Images/Forgot password-cuate (1).png'
 
import '../../../Styles/Admin/Loginpage.css'
import { Row, Col, Container } from "react-bootstrap";
import Swal from "sweetalert2";
export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
      const handlePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
      };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const location = useLocation();
  const email = location.state?.email || "";
  console.log("verify", email.email);
 
 
  const [LoadinspinnerForgotpage, setLoadingspinnerForgotpage] = useState(false);
 
 
  // Faliure Message  - useselectot and useEffect
 
  const isInvalidReceivePassword = useSelector((state) => state.forgotPassword.invalidreceivepassword)
 
  useEffect(() => {
    if (isInvalidReceivePassword) {
      const Toast = Swal.mixin({
        toast: true, position: "top",
        showConfirmButton: false, timer: 3000, timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({ icon: "error", title: "Please Enter the Valid Receive Password" });
 
      dispatch({ type: RESET_PASSWORD_FAILURE_MESSAGE });
    }
  }, [isInvalidReceivePassword, dispatch])
 
 
  // Successfull Message  - useselectot and useEffect
 
  const isSuccessForgotpassword = useSelector(
    (state) => state.forgotPassword.issuccessforgotpassword
  );
 
  console.log("isSuccessForgotpassword", isSuccessForgotpassword);
 
  useEffect(() => {
    if (isSuccessForgotpassword) {
      const Toast = Swal.mixin({
        toast: true, position: "top",
        showConfirmButton: false, timer: 3000, timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({ icon: "success", title: "Password Updated successfully" });
 
      setTimeout(() => {
        navigate("/");
      }, 3000)
 
      dispatch({ type: RESET_PASSWORD_SUCCESS_MESSAGE });
    }
  }, [isSuccessForgotpassword, navigate, dispatch]);
 
 
  // const location = useLocation();
 
  // const email = location.state?.email || '';
  const onSubmit = (data) => {
    console.log(data);
    dispatch(forgotpasswordrequest(data));
    // window.location.href = "/";
    console.log("called...", data);
  };
 
  // useStates for the Input Types
 
  const [inputRecivePassword, setInputRecivePassword] = useState('');
 
  const [inputUpdatePassword, setInpputUpdatePassword] = useState('');
  return (
    <>
      <Container fluid className="d-flex">
        <Row>
          <Col sx={12} md={6}>
            <img
              style={{ height: "auto", width: "100%" }}
              className="img-fluid"
              src={ForgotPasssword}
              alt="logo"
            />
          </Col>
          <Col id="Forgot-Password-Page" sx={12} md={6}>
            <div id="Forgot-Password-Form-Submission">
              <div className="login-header">
                <img src={Relevantz} alt="Logo" />
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    {...register("email", {
                      required: validationMessages.email.required,
                      pattern: {
                        value: emailRegex,
                        message: validationMessages.email.pattern,
                      },
                    })}
                    type="text"
                    placeholder="Email"
                    value={email.email}
                    readOnly
                  />
                </div>
                <p id='loginerrormessage'>{errors.email?.message}</p>
                <div style={{ position: "relative", marginTop: "5px" }}>
                  <input
                    {...register("oldPassword", {
                      required: validationMessages.password.required,
                      minLength: {
                        value: 6,
                        message: validationMessages.password.receivePassword,
                      },
                      pattern: {
                        value: receivedPasswordRegex,
                        message: validationMessages.password.receivePattern,
                      },
                    })}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Received Password"
                    onChange={(e) => setInputRecivePassword(e.target.value)}
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
                </div>
                <p className="errormessgae">{errors.oldPassword?.message}</p>
                <div style={{ position: "relative", marginTop: "5px" }}>
                  <input
                    {...register("newPassword", {
                      required: validationMessages.password.required,
                      minLength: {
                        value: 6,
                        message: validationMessages.password.minLength,
                      },
                      pattern: {
                        value: passwordRegex,
                        message: validationMessages.password.pattern,
                      },
                    })}
                    type={passwordVisible ? "text" : "password"}
                    placeholder="New Password"
                    onChange={(e) => setInpputUpdatePassword(e.target.value)}
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
                </div>
                <p id='loginerrormessage'>{errors.newPassword?.message}</p>
                <div className="button-login">
                  {inputRecivePassword.length > 0 &&
                  inputUpdatePassword.length > 0 ? (
                    <button className="btn">Update password</button>
                  ) : (
                    <button
                      style={{ backgroundColor: "lightblue" }}
                      className="btn"
                      disabled
                    >
                      Update password
                    </button>
                  )}
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
 