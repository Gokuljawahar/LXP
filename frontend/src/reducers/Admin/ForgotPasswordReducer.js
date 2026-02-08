import {
  FORGOTPASSWORD_REQUEST,
  FORGOTPASSWORD_SUCCESS,
  FORGOTPASSWORD_ERROR,
  INVALID_RECEIVE_PASSPWORD,
  RESET_PASSWORD_SUCCESS_MESSAGE,
  RESET_PASSWORD_FAILURE_MESSAGE,
} from "../../actions/Admin/ForgotPasswordAction";

const initialState = {
  updatepassword: null,
  forgotpassword: [],
  loading: false,
  issuccessforgotpassword: false,
  error: null,
  invalidreceivepassword: false
};

const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOTPASSWORD_REQUEST:
      console.log("reducers", action.payload);
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FORGOTPASSWORD_SUCCESS:
      console.log("FORGOTPASSWORD_SUCCESS", action.payload);
      return {
        ...state,
        loading: false,
        forgotpassword: action.payload,
        issuccessforgotpassword: true,
        error: null,
      };

    case FORGOTPASSWORD_ERROR:
      return {
        ...state,
        issuccessforgotpassword: false,
        loading: false,
        error: action.payload,
      };

    case INVALID_RECEIVE_PASSPWORD:
      console.log("Check the Invalid Receive Password", action.payload);
      return {
        ...state,
        forgotpassword: action.payload,
        loading: false,
        error: null,
        invalidreceivepassword: true

      }

    case RESET_PASSWORD_SUCCESS_MESSAGE:
      return {
        ...state,
        issuccessforgotpassword: false,
      }
    case RESET_PASSWORD_FAILURE_MESSAGE:
      return {
        ...state,
        invalidreceivepassword: false,
      }
    default:
      return state;
  }
};

export default forgotPasswordReducer;