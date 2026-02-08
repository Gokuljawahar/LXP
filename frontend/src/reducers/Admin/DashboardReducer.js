import {
    FETCH_COUNT_REQUEST,
    FETCH_COUNT_SUCCESS,
    FETCH_COUNT_FAILURE
} from '../../actions/Admin/AdminDashboardAction'

const initialState = {
  data: [],
  loading: false,
  error: null,
  isNavigate: false,
};

const fetchDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_COUNT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        isNavigate: true,
      };
    case FETCH_COUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isNavigate: false,
      };

    default:
      return state;
  }
};

export default fetchDataReducer;
