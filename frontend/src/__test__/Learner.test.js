import axios from 'axios';
import LearnerGetCourse from '../middleware/LearnerMiddleware/LearnerGetCourse';
import {
  GET_COURSES_FAILURE,
  GET_COURSES_REQUEST,
  GET_COURSES_SUCCESS,
} from '../actions/LearnerAction/LearnerGetCourseAction';

jest.mock('axios');

describe('LearnerGetCourse middleware', () => {
  const next = jest.fn();
  let dispatch;
  let invoke;

  beforeEach(() => {
    jest.clearAllMocks();
    dispatch = jest.fn();
    invoke = LearnerGetCourse({ dispatch })(next);
  });

  it('dispatches success when the API returns course data', async () => {
    const action = { type: GET_COURSES_REQUEST, payload: 7 };
    axios.get.mockResolvedValue({
      status: 200,
      data: {
        data: {
          result: {
            result: [{ courseId: 1, title: 'React Basics' }],
          },
        },
      },
    });

    await invoke(action);

    expect(next).toHaveBeenCalledWith(action);
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:5199/lxp/view/Getallcoursebylearnerid/7'
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_COURSES_SUCCESS,
      payload: [{ courseId: 1, title: 'React Basics' }],
    });
  });

  it('dispatches failure when learner id is missing', async () => {
    await invoke({ type: GET_COURSES_REQUEST, payload: '' });

    expect(axios.get).not.toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_COURSES_FAILURE,
      payload: 'Learner id is required to fetch courses',
    });
  });

  it('dispatches failure when API call throws an error', async () => {
    axios.get.mockRejectedValue(new Error('Network down'));

    await invoke({ type: GET_COURSES_REQUEST, payload: 23 });

    expect(dispatch).toHaveBeenCalledWith({
      type: GET_COURSES_FAILURE,
      payload: 'Network down',
    });
  });
});
