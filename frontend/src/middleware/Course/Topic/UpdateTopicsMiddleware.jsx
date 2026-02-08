import axios from 'axios';
import { UPDATE_TOPICS_REQUEST, updateTopicsSuccess, updateTopicsFailure, UpdateTopicsExists } from '../../../actions/Course/Topic/UpdateTopicsAction';



const API_URL = 'http://localhost:5199/lxp/course/topic';

const updateTopicsApi = ({ dispatch }) => (next) => async (action) => {



  if (action.type === UPDATE_TOPICS_REQUEST) {
    try {
      console.log("update api", action.payload)
      // Assuming 'action.payload' contains the data you want to senda
      const response = await axios.put(API_URL, action.payload);
      console.log('API Response:', response.data); // Log the response data

      if (response.data === null) {
        // Handle the case when the response data is null
        dispatch(UpdateTopicsExists());
      } else {
        // Dispatch success action with the courseId
        dispatch(updateTopicsSuccess(response.data));
      }


    } catch (error) {

      console.error('API Error:', error.message);
      dispatch(updateTopicsFailure(error.message));

    }

  }
  return next(action);

};

export default updateTopicsApi;