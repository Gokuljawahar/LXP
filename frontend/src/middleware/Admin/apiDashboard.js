import {
  FETCH_COUNT_REQUEST,
  fetchCountSuccess,
  fetchCountFailure,
} from "../../actions/Admin/AdminDashboardAction";
import { baseUrl } from "./api";
import axios from "axios";
const FetchdashboardData =
  ({ dispatch }) =>
    (next) =>
      async (action) => {
        if (action.type === FETCH_COUNT_REQUEST) {
          const API_URL = `${baseUrl}/lxp/admin/DashboardDetails`;
          try {
            const response = await axios.get(API_URL);


            if (response.status === 200) {
              dispatch(fetchCountSuccess(response.data.data));
            } else {
              console.error("No Data received");
            }
          } catch (error) {
            console.error(
              "API ERROR",
              error.response ? error.response.data.data : error.message
            );
            dispatch(fetchCountFailure(error.message));
          }
        }
        return next(action);
      };

export default FetchdashboardData;
