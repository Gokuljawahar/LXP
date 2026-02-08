import {
  CREATE_COURSES_REQUEST,
  CREATE_COURSES_SUCCESS,
  CREATE_COURSES_FAILURE,
  CREATE_CONTENT,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_FAILURE,
  CREATE_COURSES_EXISTS,
  SET_COURSE_STATUS,
  RESET_EXISTEDCOURSE_MESSAGE,
  RESET_SUCCESSCOURSE_MESSAGE,
} from '../../../actions/Course/Course/AddCourseAction';
 
const initialState = {
  isRequesting:false,
  loading: false,
  course_id: null,
  isSubmitted:false,
  isError:false,
  isExists:false,
  error: null,
  // course_id:null,
 
};
 
const AddCourseReducer = (state = initialState, action) => {
  switch (action.type) {
     case CREATE_COURSES_REQUEST:
      return {
        ...state,
        // course_id:null,
 
      };
    case CREATE_COURSES_SUCCESS:
      console.log('Coursecaa', action.payload);
      return {
        ...state,
        loading: false,
        course_id: action.payload,
        isSubmitted:true,
        isError:false,
        isExists:false,
        error: null,
      };
     
    case CREATE_COURSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isSubmitted:false,
        isExists:false,
        isError:true,
      };
 
      case CREATE_COURSES_EXISTS:
        console.log("Create_course_Exists");
        return {
          ...state,
          loading: false,
          isExists:true,
          isSubmitted:false,
          isError:false,
        };
        case SET_COURSE_STATUS:
          return{
            ...state,
            isRequesting:action.payload,
          };
       case RESET_EXISTEDCOURSE_MESSAGE:
            return {
              ...state,
              isExists:false,
            } 
        case RESET_SUCCESSCOURSE_MESSAGE:
              return {
                ...state,
                isSubmitted:false,
              }    
   
    default:
      return state;
  }
};
 
export default AddCourseReducer;
 