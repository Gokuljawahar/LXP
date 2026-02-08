import {
  DELETE_COURSES_REQUEST,
  DELETE_COURSES_SUCCESS,
  DELETE_COURSES_FAILURE,
  DELETE_COURSES_FAILURE_MESSAGE,
  RESET_DELETE_SUCCESS_COURSES_MESSAGE
} from '../../actions/Admin/DeletecourseAction';

const initialState = {
  courses: [],
  loading: false,
  error: null,
  message:null,
  isdeleted:false,
  isnotdelete:false,
  
};

const DeletecourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_COURSES_SUCCESS:
      console.log("Success", action.payload);
      return {
        ...state,
        loading: false,
        message: action.payload,
        isdeleted:true,
        isnotdelete:false,
        error: null,
      };
      case DELETE_COURSES_FAILURE_MESSAGE:
          console.log("Failure Message",action.payload); 
         return{
              ...state,
              loading: false,
              message: action.payload,
              isnotdelete:true,
              error:null,
          };
    case DELETE_COURSES_FAILURE:
      console.error("Failure", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };  
      case RESET_DELETE_SUCCESS_COURSES_MESSAGE:     // SETTING FLAG OF THE DELETE SUCCESS MESSAGE
        return {
          ...state,
          isdeleted:false,
          isnotdelete:false,
        }
    default:
      return state;
  }
};

export default DeletecourseReducer;
