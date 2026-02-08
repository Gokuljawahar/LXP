// import React from 'react';
// import Avatar from "@mui/material/Avatar";
// import { useDispatch, useSelector } from "react-redux";
// import { useState, useRef } from 'react';
// import { ValidationUpdateUserProfile } from '../../utils/LearnerValidations/ValidationUpdateUserProfile';
// import { useEffect } from 'react';
// import { getUserProfileRequest } from '../../actions/LearnerAction/GetUpdateUserProfileAction';
// import { put_user_profile_request } from '../../actions/LearnerAction/UpdateUserProfileAction';
// import LearnerNavbar from './LearnerNavbar';
// import { fetchUserData } from '../../middleware/LearnerMiddleware/GetUserProfileMiddleware';
// import Select from 'react-select';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import IconButton from '@mui/material/IconButton';
// import '../../Styles/Learner/UpdateProfile.css';
// import { Block } from '@mui/icons-material';
// import Swal from 'sweetalert2';
// import { fetchCoursesRequest } from '../../actions/Admin/courseAction';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import MenuItem from '@mui/material/MenuItem';
// import updateuserprofileimage from '../../assets/Learner/Online page-cuate (2).png'
// import { useNavigate } from 'react-router-dom';
 

// function UpdateUserProfileComponent() {
//   const dispatch = useDispatch();
//   // const[LearnerId]= useState("9b1476aa-11e2-4a2c-9b93-e293a3746489")
//   const [LearnerId] = useState(sessionStorage.getItem('ProfileId'));
//   const [editInfo, setEditInfo] = useState({
//     ProfileId: "",
//     firstName: "",
//     lastName: "",
//     dob: "",
//     gender: "",
//     contactNumber: "",
//     stream: "",
//     profilePhoto: "",
//   });
 
 
//   const streamCourses = useSelector((state) => state.fetchcourse.courses)
//   console.log("scourse", streamCourses)
 
//   const options = streamCourses.map(course => ({
//     value: course.title,
//     label: course.title
//   }));
 
 
//   const [isEditable, setIsEditable] = useState(false);
//   const [file, setFile] = useState(null);
//   const [alerter, setalerter] = useState(false);
 
//   const alertsuccess = useRef();
 
 
 
 
 
//   const calculateMaxDate = () => {
//     const today = new Date();
//     today.setFullYear(today.getFullYear() - 18);
//     return today.toISOString().split("T")[0];
//   };


 
//   const fetch = async (LearnerId) => {
//     try {
//       const userData = await fetchUserData(LearnerId);
//       sessionStorage.setItem("userData", userData.profilePhoto);
//       setEditInfo(userData);
//     // console.log("userdata",userData);
//     } catch (error) {
//       console.error('Error in fetch: ', error);
//     }
//   };
 
  
// useEffect(()=>{
//   console.log("EDIT INFO", editInfo)   // VALUE 
// },[]);
 
//   // const alertdisplay = () => {
 
//   //   alertsuccess.current.style.display = "block";
//   // setTimeout(() => {
//   //   alertsuccess.current.style.display = "none";
//   //   window.location.reload();
//   // }, 3000);
 
//   // }
 
 
 
//   useEffect(() => {
//     const data = fetch(LearnerId);
//     setEditInfo(data);
//   }, [setEditInfo]);
 
//   const updateStatus = async () => {
//     const errors = ValidationUpdateUserProfile(editInfo);
//     if (Object.keys(errors).length > 0) {
//       if (errors.contactNumber) {
//         // alert(errors.contactNumber);
//         alertdisplaywarning(errors.contactNumber);
//       } else {
//         // alert("Please insert all the required fields.");
//         alertmessage();
//       }
//       console.error("Validation errors", errors);
//       return;
//     }
 
//     try {
//       const updatedEditInfo = {
//         ...editInfo,
//         stream: Array.isArray(editInfo.stream) ? editInfo.stream.join(", ") : editInfo.stream,
//       };
 
//       const response = await dispatch(put_user_profile_request(LearnerId, updatedEditInfo));
//       if (response.status === 200) {
 
 
 
//       }
 
//       else {
 
//         alert("Profile failed successfully");
//       }
 
 
//     }
//     catch {
 
//       alertdisplayenrollment();
 
 
 
//     }
 
//   };
 
 
 
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'stream') {
//       const selectedValues = value.map(option => option.value);
//       console.log("selectedValues", selectedValues);
//       setEditInfo((prevEditInfo) => ({ ...prevEditInfo, stream: selectedValues }));
//     } else {
//       setEditInfo((prevEditInfo) => ({ ...prevEditInfo, [name]: value }));
//     }
//   };
 
 
 
//   const handleThumbnailChange = (event) => {
//     event.preventDefault();
//     if (event.target.files && event.target.files[0]) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setFile(e.target.result);
//       };
//       reader.readAsDataURL(event.target.files[0]);
//       setEditInfo({ ...editInfo, profilePhoto: event.target.files[0] });
//     }
//   };
 
 
 
 
//   let streamArray;
//   let editInfoStream;
 
//   if (editInfo && editInfo.stream) {
//     editInfoStream = editInfo.stream;
//     console.log("stream", editInfoStream);
//     if (typeof editInfoStream === 'string') {
//       streamArray = editInfoStream.split(', ').map(stream => ({ value: stream, label: stream }));
//     } else if (Array.isArray(editInfoStream)) {
//       // If it's already an array, map it directly
//       streamArray = editInfoStream.map(stream => ({ value: stream, label: stream }));
//     }
//     // streamArray = editInfoStream.split(', ').map(stream => ({ value: stream, label: stream }));
//     // console.log("Formatted stream array", streamArray);
//   } else {
//     // console.log('editInfo.stream is undefined');
//   }
 
//   const navigate=useNavigate()
 
//   const alertdisplayenrollment = () => {
//     const Toast = Swal.mixin({
//       toast: true, background: '#096C00', position: "top",
//       showConfirmButton: false, timer: 3000, timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.onmouseenter = Swal.stopTimer;
//         toast.onmouseleave = Swal.resumeTimer;
//       }
//     });
//     Toast.fire({
//       icon: "success", iconColor: 'white', title: "Profile Updated Successfully", customClass: {
//         popup: 'custom-toast'
//       }
//     });
 
//    setTimeout(() => {
//     navigate('/LearnerDashboard');
//    }, 3000);
    

//   //  window.location.reload();
//   }

  
 
 
//   useEffect(() => {
//     console.log("effect");
//     dispatch(fetchCoursesRequest(LearnerId));
//   }, [LearnerId]);
 
 
//   const alertdisplaywarning = (errorMessage) => {
//     const Toast = Swal.mixin({
//       toast: true,
//       background: '#FFDB00',
//       position: "top",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.onmouseenter = Swal.stopTimer;
//         toast.onmouseleave = Swal.resumeTimer;
//       }
//     });
 
//     Toast.fire({
//       icon: "warning",
//       iconColor: 'black',
//       title: errorMessage,   // Display the error message here
//       customClass: {
//         popup: 'custom-toast-alert'
//       }
//     });
//     setTimeout(() => {
//       window.location.reload();
//     }, 3200);
//   };
 
 
 
//   const alertmessage = () => {
//     const Toast = Swal.mixin({
//       toast: true,
//       background: '#d7ba03',
//       position: "top",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.onmouseenter = Swal.stopTimer;
//         toast.onmouseleave = Swal.resumeTimer;
//       }
//     });
 
//     Toast.fire({
//       icon: "warning",
//       iconColor: 'black',
//       title: "All the fields are required", // Display the error message here
//       customClass: {
//         popup: 'custom-toast-alert'
//       }
//     });
//     setTimeout(() => {
//       window.location.reload();
//     }, 3200);
//   };
 
 
//   return (
//  <>
//     <LearnerNavbar />
//     <div className='container-fluid' style={{ padding: '5px' }}>
//       <div>
       
//       <div className='container d-flex justify-content-center align-items-start'>
//         <Paper elevation={3} className='mt-4 d-flex flex-row justify-content-between' style={{ width: '100%', padding: '20px', boxSizing: 'border-box', backgroundColor: "#F5F7F8", marginTop:"100px", position: 'relative'  }}>
//           <div className='d-flex flex-column justify-content-center' style={{ width: '70%' }}>
//             <h5 className='text-center' style={{ fontSize: "px", marginBottom: '30px' }}>My Profile</h5>
//             <div className="row">
             
//               <div className="col-md-6 p-5 ">
//               <InputLabel htmlFor="component-outlined" style={{marginLeft:"40px"}}>First Name</InputLabel>
//               <OutlinedInput
//               style={{marginLeft:"30px",width:"100%"}}
//                 id="component-outlined"
//                 type="text"
//                 name="firstName"
//                 value={editInfo.firstName}
//                 onChange={handleInputChange}
//                 // style={{width:"120%"}}
//                 onKeyPress={(event) => {
//                   if (!/^[A-Za-z]+$/.test(event.key)) {
//                     event.preventDefault();
//                   }
//                 }}
//               />
 
 
 
// <InputLabel htmlFor="component-outlined" style={{marginLeft:"40px",marginTop:"10px"}}>Date of Birth</InputLabel>
//               <input
//                 id="component-outlined"
//                 type="date"
//                 name="dob"
//                 value={editInfo.dob}
//                 max={calculateMaxDate()}
//                 onKeyDown={(e) => e.preventDefault()}
//                 onChange={handleInputChange}
               
//                 style={{marginLeft:"30px",width:"100%",backgroundColor:"#F5F7F8"}}
//               />
 
 
 
 
 
// <InputLabel htmlFor="component-outlined" style={{marginLeft:"40px",marginTop:"10px"}}>Contact Number</InputLabel>
//               <OutlinedInput
//                 name="contactNumber"
//                 type="number"
//                 id="component-outlined"
//                 value={editInfo.contactNumber}
//                 onChange={handleInputChange}
//                 // style={{width:"120%"}}
//                 style={{marginLeft:"30px",width:"100%"}}
//               />
 
 
 
 
 
 
 
 
               
//               </div>
//               <div className="col-md-6 p-5">
 
             
//               <InputLabel htmlFor="component-outlined" >Last Name</InputLabel>
//               <OutlinedInput
//                 id="component-outlined"
//                 type='text'
//                 name='lastName'
//                 value={editInfo.lastName}
//                 onChange={handleInputChange}
//                 style={{width:"100%"}}
//                 onKeyPress={(event) => {
//                   if (!/^[A-Za-z]+$/.test(event.key)) {
//                     event.preventDefault();
//                   }
//                 }}
//               />
 
 
// <InputLabel htmlFor="component-outlined"  style={{marginTop:"10px"}}>Gender</InputLabel>
//                <select
//                 name="gender"
//                  id="component-outlined"
//                  value={editInfo.gender}
//                  onChange={handleInputChange}
//                  style={{width:"100%",height:"54px", backgroundColor:"#F5F7F8" }}
//                >
//                  <option value="male">Male</option>
//                  <option value="female">Female</option>
//                  <option value="transgender">Transgender</option>
//                </select>
 
 
//                <InputLabel htmlFor="component-outlined"  style={{marginTop:"10px"}} >Stream</InputLabel>
//               <Select
//                 id="component-outlined"

//                 isMulti
//                 name="stream"
//                 options={options}
//                 value={streamArray}
//                 // styles={{height:"80"}}
//                 styles={{
//                   control: (base) => ({
//                     ...base,
//                     backgroundColor:"#F5F7F8",
//                     height: 'auto', // Set the height of the select field
//                     minHeight: '55px' // Ensure the minimum height is also set
//                   })
//                 }}
//                 onChange={(selectedOption) => handleInputChange({ target: { name: "stream", value: selectedOption } })}
//               />
 
 
 
               
 
 
 
 
           
               
//               </div>
//             </div>
//             <Button
//               variant="contained"
//               type="button"
//               style={{ marginTop: '20px', backgroundColor: '#27235C', color: 'white' ,width:"200px",marginLeft:"400px" }}
//               onClick={updateStatus}
//             >
//               Save
//             </Button>
//           </div>
//           <div className='d-flex flex-column align-items-center' style={{ width: '30%' }}>
//             <Avatar
//               alt="User Avatar"
//               src={file || (editInfo && editInfo.profilePhoto ? editInfo.profilePhoto : "default-avatar.png")}
//               style={{ width: '200px', height: '200px',marginTop:"100px" }}
//             />
//             <IconButton
//               color="primary"
//               aria-label="upload picture"
//               component="label"
//               style={{ marginBottom: '20px' }}
//             >
//               <input
//                 type="file"
//                 id="profile"
//                 name="profilePhoto"
//                 onChange={handleThumbnailChange}
//                 accept="image/*"
//                 style={{ display: "none" }}
//               />
//               <CameraAltIcon sx={{ color: '#27235C' }} />
//             </IconButton>
//           </div>
//         </Paper>
//       </div>
//       </div>
//       <div style={{ position: 'absolute', bottom: '0', left: '0' }}>
//         <img src={updateuserprofileimage} alt='image' style={{ width: '650px', height: '350px',marginLeft:"20px" }}/>
//       </div>
//     </div>
   
//     </>
 
 
 
 
 
 
//   );
// }
 
// export default UpdateUserProfileComponent;


import React from 'react';
import Avatar from "@mui/material/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from 'react';
import { ValidationUpdateUserProfile } from '../../utils/LearnerValidations/ValidationUpdateUserProfile';
import { useEffect } from 'react';
import { getUserProfileRequest } from '../../actions/LearnerAction/GetUpdateUserProfileAction';
import { put_user_profile_request } from '../../actions/LearnerAction/UpdateUserProfileAction';
import LearnerNavbar from './LearnerNavbar';
import { fetchUserData } from '../../middleware/LearnerMiddleware/GetUserProfileMiddleware';
import Select from 'react-select';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import IconButton from '@mui/material/IconButton';
import '../../Styles/Learner/UpdateProfile.css';
import { Block } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { fetchCoursesRequest } from '../../actions/Admin/courseAction';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import updateuserprofileimage from '../../assets/Learner/Online page-cuate (2).png'
import { useNavigate } from 'react-router-dom';
import LearnerDashboard from './LearnerDashboard';
 
 
function UpdateUserProfileComponent() {
  const dispatch = useDispatch();
  const [LearnerId] = useState(sessionStorage.getItem('ProfileId'));
  const [editInfo, setEditInfo] = useState({
    ProfileId: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    contactNumber: "",
    stream: "",
    profilePhoto: "",
  });
 
 
  const streamCourses = useSelector((state) => state.fetchcourse.courses)
  console.log("scourse", streamCourses)
 
  const options = streamCourses.map(course => ({
    value: course.title,
    label: course.title
  }));
 
 
  const [isEditable, setIsEditable] = useState(false);
  const [file, setFile] = useState(null);
  const [alerter, setalerter] = useState(false);
 
  const alertsuccess = useRef();
 
 
 
 
 
  const calculateMaxDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split("T")[0];
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
 
 
  const store = useSelector((state) => state);
  console.log("store",store);
 
  useEffect(() => {
    const data = fetch(LearnerId);
    setEditInfo(data);
  }, [setEditInfo]);
 
  const updateStatus = async () => {
    const errors = ValidationUpdateUserProfile(editInfo);
    if (Object.keys(errors).length > 0) {
      if (errors.contactNumber) {
        // alert(errors.contactNumber);
        alertdisplaywarning(errors.contactNumber);
      } else {
        // alert("Please insert all the required fields.");
        alertmessage();
      }
      console.error("Validation errors", errors);
      return;
    }
 
    try {
      const updatedEditInfo = {
        ...editInfo,
        stream: Array.isArray(editInfo.stream) ? editInfo.stream.join(", ") : editInfo.stream,
      };
 
      const response = await dispatch(put_user_profile_request(LearnerId, updatedEditInfo));
      if (response.status === 200) {
 
 
 
      }
 
      else {
 
        alert("Profile failed successfully");
      }
 
 
    }
    catch {
 
      alertdisplayenrollment();
 
 
 
    }
 
  };
 
 
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'stream') {
      const selectedValues = value.map(option => option.value);
      console.log("selectedValues", selectedValues);
      setEditInfo((prevEditInfo) => ({ ...prevEditInfo, stream: selectedValues }));
    } else {
      setEditInfo((prevEditInfo) => ({ ...prevEditInfo, [name]: value }));
    }
  };
 
 
 
  const handleThumbnailChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setEditInfo({ ...editInfo, profilePhoto: event.target.files[0] });
    }
  };
 
 
 
 
  let streamArray;
  let editInfoStream;
 
  if (editInfo && editInfo.stream) {
    editInfoStream = editInfo.stream;
    console.log("stream", editInfoStream);
    if (typeof editInfoStream === 'string') {
      streamArray = editInfoStream.split(', ').map(stream => ({ value: stream, label: stream }));
    } else if (Array.isArray(editInfoStream)) {
      // If it's already an array, map it directly
      streamArray = editInfoStream.map(stream => ({ value: stream, label: stream }));
    }
    // streamArray = editInfoStream.split(', ').map(stream => ({ value: stream, label: stream }));
    // console.log("Formatted stream array", streamArray);
  } else {
    // console.log('editInfo.stream is undefined');
  }
 
  const navigate=useNavigate()
 
  const alertdisplayenrollment = () => {
    const Toast = Swal.mixin({
      toast: true, background: '#096C00', position: "top",
      showConfirmButton: false, timer: 3000, timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success", iconColor: 'white', title: "Profile Updated Successfully", customClass: {
        popup: 'custom-toast'
      }
    });
 
   setTimeout(() => {
    // navigate('/LearnerDashboard');
   }, 3000);
   
 
  //  window.location.reload();
  }
 
 
  useEffect(() => {
    console.log("effect");
    dispatch(fetchCoursesRequest(LearnerId));
  }, [LearnerId]);
 
 
  const alertdisplaywarning = (errorMessage) => {
    const Toast = Swal.mixin({
      toast: true,
      background: '#FFDB00',
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
 
    Toast.fire({
      icon: "warning",
      iconColor: 'black',
      title: errorMessage,   // Display the error message here
      customClass: {
        popup: 'custom-toast-alert'
      }
    });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 3200);
  };
 
 
 
  const alertmessage = () => {
    const Toast = Swal.mixin({
      toast: true,
      background: '#d7ba03',
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
 
    Toast.fire({
      icon: "warning",
      iconColor: 'black',
      title: "All the fields are required", // Display the error message here
      customClass: {
        popup: 'custom-toast-alert'
      }
    });
    // setTimeout(() => {
    //   window.location.reload();
    // }, 3200);
  };
 
 
  return (
 <>
    <LearnerNavbar />
    <div className='container-fluid' style={{ padding: '5px' }}>
      <div>
       
      <div className='container d-flex justify-content-center align-items-start'>
        <Paper elevation={3} className='mt-4 d-flex flex-row justify-content-between' style={{ width: '100%', padding: '20px', boxSizing: 'border-box', backgroundColor: "#F5F7F8", marginTop:"100px", position: 'relative'  }}>
          <div className='d-flex flex-column justify-content-center' style={{ width: '70%' }}>
            <h5 className='text-center' style={{ fontSize: "px", marginBottom: '30px' }}>My Profile</h5>
            <div className="row">
             
              <div className="col-md-6 p-5 ">
              <InputLabel htmlFor="component-outlined" style={{marginLeft:"40px"}}>First Name</InputLabel>
              <OutlinedInput
              style={{marginLeft:"30px",width:"100%"}}
                id="component-outlined"
                type="text"
                name="firstName"
                value={editInfo.firstName}
                onChange={handleInputChange}
                // style={{width:"120%"}}
                onKeyPress={(event) => {
                  if (!/^[A-Za-z]+$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
 
 
 
<InputLabel htmlFor="component-outlined" style={{marginLeft:"40px",marginTop:"10px"}}>Date of Birth</InputLabel>
              <input
                id="component-outlined"
                type="date"
                name="dob"
                value={editInfo.dob}
                max={calculateMaxDate()}
                onKeyDown={(e) => e.preventDefault()}
                onChange={handleInputChange}
               
                style={{marginLeft:"30px",width:"100%",backgroundColor:"#F5F7F8"}}
              />
 
 
 
 
 
<InputLabel htmlFor="component-outlined" style={{marginLeft:"40px",marginTop:"10px"}}>Contact Number</InputLabel>
              <OutlinedInput
                name="contactNumber"
                type="number"
                id="component-outlined"
                value={editInfo.contactNumber}
                onChange={handleInputChange}
                // style={{width:"120%"}}
                style={{marginLeft:"30px",width:"100%"}}
              />
 
 
 
 
 
 
 
 
               
              </div>
              <div className="col-md-6 p-5">
 
             
              <InputLabel htmlFor="component-outlined" >Last Name</InputLabel>
              <OutlinedInput
                id="component-outlined"
                type='text'
                name='lastName'
                value={editInfo.lastName}
                onChange={handleInputChange}
                style={{width:"100%"}}
                onKeyPress={(event) => {
                  if (!/^[A-Za-z]+$/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
 
 
<InputLabel htmlFor="component-outlined"  style={{marginTop:"10px"}}>Gender</InputLabel>
               <select
                name="gender"
                 id="component-outlined"
                 value={editInfo.gender}
                 onChange={handleInputChange}
                 style={{width:"100%",height:"54px", backgroundColor:"#F5F7F8" }}
               >
                 <option value="male">Male</option>
                 <option value="female">Female</option>
                 <option value="transgender">Transgender</option>
               </select>
 
 
               <InputLabel htmlFor="component-outlined"  style={{marginTop:"10px"}} >Stream</InputLabel>
              <Select
                id="component-outlined"
 
                isMulti
                name="stream"
                options={options}
                value={streamArray}
                // styles={{height:"80"}}
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor:"#F5F7F8",
                    height: 'auto', // Set the height of the select field
                    minHeight: '55px' // Ensure the minimum height is also set
                  })
                }}
                onChange={(selectedOption) => handleInputChange({ target: { name: "stream", value: selectedOption } })}
              />
 
 
 
               
 
 
 
 
           
               
              </div>
            </div>
            <Button
              variant="contained"
              type="button"
              style={{ marginTop: '20px', backgroundColor: '#27235C', color: 'white' ,width:"200px",marginLeft:"400px" }}
              onClick={updateStatus}
            >
              Save
            </Button>
          </div>
          <div className='d-flex flex-column align-items-center' style={{ width: '30%' }}>
            <Avatar
              alt="User Avatar"
              src={file || (editInfo && editInfo.profilePhoto ? editInfo.profilePhoto : "default-avatar.png")}
              style={{ width: '200px', height: '200px',marginTop:"100px" }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              style={{ marginBottom: '20px' }}
            >
              <input
                type="file"
                id="profile"
                name="profilePhoto"
                onChange={handleThumbnailChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <CameraAltIcon sx={{ color: '#27235C' }} />
            </IconButton>
          </div>
        </Paper>
      </div>
      </div>
      <div style={{ position: 'absolute', bottom: '0', left: '0' }}>
        <img src={updateuserprofileimage} alt='image' style={{ width: '650px', height: '350px',marginLeft:"20px" }}/>
      </div>
    </div>
 
   
   
   
    </>
 
 
 
 
 
 
  );
}
 
export default UpdateUserProfileComponent;
 
 