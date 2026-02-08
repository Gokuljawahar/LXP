// actions.js
export const ENROLL_REQUEST = 'ENROLL_REQUEST';
export const ENROLL_SUCCESS = 'ENROLL_SUCCESS';
export const ENROLL_FAILURE = 'ENROLL_FAILURE';
export const SET_IS_ENROLL_COURSE = 'SET_IS_REQUESTING_OTP';
 
export const enrollRequest = (courseId, learnerId) => ({
    type: ENROLL_REQUEST,
    courseId,
    learnerId,
});
 
export const enrollSuccess = (courseId ,learnerId) => ({
    type: ENROLL_SUCCESS,
    courseId,
    learnerId,
});
 
export const enrollFailure = (error) => ({
    type: ENROLL_FAILURE,
    error,
});
 
export const setIsEnrollCourse = (isRequesting) => ({
    type: SET_IS_ENROLL_COURSE,
    payload: isRequesting,
  });
 
  export const fetchEnrolledCoursesRequest = (learnerId) => ({
    type: 'FETCH_ENROLLED_COURSES_REQUEST',
    payload: learnerId,
  });