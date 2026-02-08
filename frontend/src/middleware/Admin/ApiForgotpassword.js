import axios from "axios";
import {
  FORGOTPASSWORD_REQUEST,
  forgotpasswordSuccess,
  forgotpasswordError,
  invalidReceivePassword,
} from "../../actions/Admin/ForgotPasswordAction";
import { baseUrl } from "./api";
import { useNavigate } from "react-router-dom";

const ApiForgotpassword =
  ({ dispatch }) =>
    (next) =>
      async (action) => {
        // console.log(action.type);
        if (action.type === FORGOTPASSWORD_REQUEST) {
          console.log("actiontypesforforgotpasswod", action);
          try {
            const response = await axios.put(
              `${baseUrl}/api/UpdatePassword`,
              action.payload
            );
            console.log("UPdate Password result", response.data);
            //dispatch(forgotpasswordSuccess(response.data));

            if (response.data === "Password Updated Successfully") {
              dispatch(forgotpasswordSuccess(response.data));
            }

            else if (response.data === 'Incorrect Received Password') {
              dispatch(invalidReceivePassword(response.data))
            }

          } catch (error) {
            dispatch(forgotpasswordError(error.message));
            console.log(error.message);
          }
        }
        return next(action);
      };

export default ApiForgotpassword;