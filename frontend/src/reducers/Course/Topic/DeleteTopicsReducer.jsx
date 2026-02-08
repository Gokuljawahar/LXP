import { RESET_DELETE_SUCCESS_COURSES_MESSAGE } from '../../../actions/Admin/DeletecourseAction';
import { 
   
    DELETE_TOPICS_REQUEST,
    DELETE_TOPICS_SUCCESS,
    DELETE_TOPICS_FAILURE,
    RESET_DELETED_MESSAGE,
  } from '../../../actions/Course/Topic/DeleteTopicsAction';
  
  const initialState = {
    
    topics: [],
    loading: false,
    error: null,
    isSuccess:false,
    isFail:false,
    deletesuccessmessgae:false,
    
  };
  
  const deleteTopicsReducer = (state = initialState, action) => {
    
    switch (action.type) {
       
      case DELETE_TOPICS_REQUEST:
        return{
          ...state,
          loading:true,
        };
  
      case DELETE_TOPICS_SUCCESS:
        console.log("TopicsDeletereducer",action.payload);
        return{
          ...state,
         // topics:action.payload,
          topics:state.topics.filter(topic=>topic.topicId !== action.payload),
          isSuccess:true,
          deletesuccessmessgae:true,
          loading:false,
          error:null,
        };
      case DELETE_TOPICS_FAILURE:
        return{
          ...state,
          loading:false,
          error:action.payload,
          isFail:true,
        };
      case RESET_DELETED_MESSAGE:
          return{
            ...state,
            deletesuccessmessgae:false,
          }  
        
        // case RESET_DELETE_SUCCESS_COURSES_MESSAGE:
        //   return{
        //     ...state,
        //     topics:[]

        //   }
      default:
        return state;
    }
  };
  
  export default deleteTopicsReducer;