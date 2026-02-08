import {
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
  GET_COURSES_FAILURE,
  } from '../../actions/LearnerAction/LearnerGetCourseAction';
 
  const initialState = {
    courses: [],
    loading: false,
    error: null,
  };
 
 
  const LearnerGetCourseReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COURSES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case GET_COURSES_SUCCESS:
        return {
          ...state,
          loading: false,
          courses: action.payload,
          error: null,
        };
      case GET_COURSES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
 
  export default LearnerGetCourseReducer;