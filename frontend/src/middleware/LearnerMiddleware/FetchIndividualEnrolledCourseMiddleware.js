import axios from 'axios';
import { GET_INDIVIDUAL_ENROLL_COURSE_REQUEST,getIndividualEnrollCourseSuccess,getIndividualEnrollCourseFailure, SET_ENROLLCOURSE_STATUS  } from '../../actions/LearnerAction/FetchIndividualEnrolledCourseAction';
 
const IndividualEnrollCourseApi = ({ dispatch,getState }) => (next) => async (action) => {
  next(action);
  // console.log("coursegetapi", action)
  const API_URL = `http://localhost:5199/lxp/enroll/${sessionStorage.getItem("UserSessionID")}/course/${action.payload}/topic`;
 
  if (action.type === GET_INDIVIDUAL_ENROLL_COURSE_REQUEST) {
    const ReducerData = getState().fetchEnrolledIndividualCourse;
    if (!ReducerData.isRequesting) {
      dispatch({ type: SET_ENROLLCOURSE_STATUS, payload: true });
     
    try {
      console.log("learnerapicomponent:", action);
      const response = await axios.get(`${API_URL}`);
      // console.log(`${API_URL}${action.payload}`);
      console.log('API  mycourse Response:', response.data.data[0]); // Log the response data
 
      if (response.data.statusCode == 200 && response.data.data) {
        const courses = response.data.data[0]; // Extract the courses array
        console.log(courses);
        dispatch(getIndividualEnrollCourseSuccess(courses));
      } else {
        console.error('No valid data received from API');
        dispatch(getIndividualEnrollCourseFailure('No valid data received from API'));
      }
    } catch (error) {
      console.error('API Error:', error.message);
      dispatch(getIndividualEnrollCourseFailure(error.message));
    }finally{
      dispatch({type:SET_ENROLLCOURSE_STATUS,payload:false})
     
      }
    }
  }
};
export default IndividualEnrollCourseApi;  //ch