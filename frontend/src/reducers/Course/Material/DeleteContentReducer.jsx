import {

  DELETE_CONTENT_REQUEST,
  DELETE_CONTENT_SUCCESS,
  DELETE_CONTENT_FAILURE,
  RESET_DELETE_SUCCESS_MESSAGE,
} from '../../../actions/Course/Material/DeleteContentAction'

const initialState = {

  content: [],
  loading: false,
  error: null,
  isDeletSuccessMessage: false

};

const deleteContentReducer = (state = initialState, action) => {

  switch (action.type) {

    case DELETE_CONTENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_CONTENT_SUCCESS:
      console.log("ContentDeletereducer", action.payload);
      return {
        ...state,
        // topics:action.payload,
        content: state.content.filter(content => content.materialId !== action.payload),
        loading: false,
        isDeletSuccessMessage: true,
        error: null,
      };
    case DELETE_CONTENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case RESET_DELETE_SUCCESS_MESSAGE:
      return {
        ...state,
        isDeletSuccessMessage: false,

      }

    default:
      return state;
  }
};

export default deleteContentReducer;