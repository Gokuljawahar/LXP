import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_INTERNALFAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, SET_CATEGORY_STATUS,RESET_THE_SUBMITTED_MESSGAE,RESET_EXISTED_MESSAGE } from "../../../actions/Course/Category/AddCategoryAction";

const initialState = {

  category: [],
  loading: false,
  error: null,
  message: null,
  isSuccess: false,
  isFailure: false,
  isError: false,
  isRequesting: false,

};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CATEGORY_SUCCESS:
      console.log("category_successreducer", action.payload)
      return {
        message: action.payload,
        loading: false,
        isSuccess: true,
      };
    case CREATE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        isFailure: true,


      };
    case CREATE_CATEGORY_INTERNALFAILURE:
      return {
        isError: true,
      }
    case SET_CATEGORY_STATUS:
      return {
        ...state,
        isRequesting: action.payload,

      };
      case RESET_THE_SUBMITTED_MESSGAE:
        return {
          ...state,
          isSuccess: false,
 
        }
        case RESET_EXISTED_MESSAGE:
          return {
            ...state,
            isFailure: false,
          }    

    default:
      return state;
  }
};

export default categoryReducer;