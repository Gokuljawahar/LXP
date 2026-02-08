import { 
   
  UPDATE_CONTENT_REQUEST,
  UPDATE_CONTENT_SUCCESS,
  UPDATE_CONTENT_FAILURE,
  UPDATE_CONTENT_EXISTS,
  RESET_UPDATE_SUCCESS_MESSAGE,
} from '../../../actions/Course/Material/UpdateContentAction';

const initialState = {
  
  content: [],
  loading: false,
  error: null,
  isExists:false,
  contentUpdatedSuccessMessgae:false,
  
};

const updateContentReducer = (state = initialState, action) => {
  
  switch (action.type) {
     
    case UPDATE_CONTENT_REQUEST:
      return{
        ...state,
        loading:true,
      };

    case UPDATE_CONTENT_SUCCESS:
      console.log("updatereducer",action.payload);
      return{
        ...state,
        content:action.payload,
        contentUpdatedSuccessMessgae:true,
        loading:false,
        error:null,
      };
    case UPDATE_CONTENT_FAILURE:
      return{
        ...state,
        loading:false,
        error:action.payload,
      };
    case UPDATE_CONTENT_EXISTS:
      console.log("exists reducer",action.payload);
        return{
          ...state,
          content: [],
          loading: false,
           error: null,
           isExists:true,
        };   
    case RESET_UPDATE_SUCCESS_MESSAGE:                // SETTING FLAG THE CHANGE THE  FALSE STATE OF UPDATE SUCCESS MESSAGE
      return{
        ...state,
        contentUpdatedSuccessMessgae:false
      } 
    default:
      return state;
  }
};

export default updateContentReducer;