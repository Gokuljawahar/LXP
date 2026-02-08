import { GET_INDIVIDUAL_ENROLL_COURSE_REQUEST,GET_INDIVIDUAL_ENROLL_COURSE_SUCCESS,GET_INDIVIDUAL_ENROLL_COURSE_FAILURE ,SET_ENROLLCOURSE_STATUS } from '../../actions/LearnerAction/FetchIndividualEnrolledCourseAction';
 
 
const initialState = {
    individualcourse: [],
    loading: false,
    error: null,
};
 
const FetchIndividualEnrolledCourseReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INDIVIDUAL_ENROLL_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_INDIVIDUAL_ENROLL_COURSE_SUCCESS:
            // console.log("successfull action result:",action.payload)
            return {
                ...state,
                individualcourse: action.payload,
                loading: false,
            };
        case GET_INDIVIDUAL_ENROLL_COURSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case SET_ENROLLCOURSE_STATUS:
                return {
                  ...state,
                  isRequesting: action.payload,
                };
        default:
            return state; // Added default case to handle unrecognized actions
    }
};
 
export default FetchIndividualEnrolledCourseReducer;  