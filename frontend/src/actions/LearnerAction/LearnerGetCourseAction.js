export const GET_COURSES_REQUEST = 'GET_COURSES_REQUEST';
export const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';
export const GET_COURSES_FAILURE = 'GET_COURSES_FAILURE';
 
export const getCoursesRequest = (learnerId) => ({
  type: GET_COURSES_REQUEST,
  payload:learnerId,
});
 
export const getCoursesSuccess = (courses) => ({
  type: GET_COURSES_SUCCESS,
  payload: courses,
});
 
export const getCoursesFailure = (error) => ({
  type: GET_COURSES_FAILURE,
  payload: error,
});