import axios from 'axios';
import {
  GET_COURSES_REQUEST,
  getCoursesFailure,
  getCoursesSuccess,
} from '../../actions/LearnerAction/LearnerGetCourseAction';

const buildCoursesEndpoint = (learnerId) =>
  `http://localhost:5199/lxp/view/Getallcoursebylearnerid/${learnerId}`;

const extractCourses = (responseData) => {
  const courses = responseData?.data?.result?.result;
  return Array.isArray(courses) ? courses : null;
};

const LearnerGetCourse = ({ dispatch }) => (next) => async (action) => {
  next(action);

  if (action.type !== GET_COURSES_REQUEST) {
    return;
  }

  const learnerId = action.payload;
  if (!learnerId) {
    dispatch(getCoursesFailure('Learner id is required to fetch courses'));
    return;
  }

  try {
    const apiUrl = buildCoursesEndpoint(learnerId);
    const response = await axios.get(apiUrl);
    const courses = extractCourses(response.data);

    if (response.status === 200 && courses) {
      dispatch(getCoursesSuccess(courses));
      return;
    }

    dispatch(getCoursesFailure('No valid data received from API'));
  } catch (error) {
    const errorMessage = error?.message || 'Unable to fetch courses';
    dispatch(getCoursesFailure(errorMessage));
  }
};

export { buildCoursesEndpoint, extractCourses };
export default LearnerGetCourse;
