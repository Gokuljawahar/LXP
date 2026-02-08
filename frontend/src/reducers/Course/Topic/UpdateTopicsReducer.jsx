import {

  UPDATE_TOPICS_REQUEST,
  UPDATE_TOPICS_SUCCESS,
  UPDATE_TOPICS_FAILURE,
  UPDATE_TOPICS_EXISTS,
  RESET_SUBMITTED_MESSAGE,
  RESET_EXISTED_MESSAGE,

} from '../../../actions/Course/Topic/UpdateTopicsAction';

const initialState = {

  topics: [],
  loading: false,
  error: null,
  isUpdated: false,
  isExists: false,

};

const updateTopicsReducer = (state = initialState, action) => {

  switch (action.type) {

    case UPDATE_TOPICS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_TOPICS_SUCCESS:
      console.log("updatereducer", action.payload);
      return {
        ...state,
        topics: action.payload,
        isUpdated: true,
        loading: false,
        error: null,
      };
    case UPDATE_TOPICS_FAILURE:
      return {
        ...state,
        loading: false,

        error: action.payload,
      };
    case UPDATE_TOPICS_EXISTS:
      return {
        ...state,
        loading: false,
        isExists: true,

      };
    case RESET_SUBMITTED_MESSAGE:
      return {
        ...state,
        isUpdated: false,
      }
    case RESET_EXISTED_MESSAGE:
      return {
        ...state,
        isExists: false,
      }


    default:
      return state;
  }
};

export default updateTopicsReducer;