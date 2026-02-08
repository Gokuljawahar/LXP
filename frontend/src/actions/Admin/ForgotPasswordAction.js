export const FORGOTPASSWORD_REQUEST=" fORGOTPASSWORD_REQUEST";
export const FORGOTPASSWORD_SUCCESS="fORGOTPASSWORD_SUCCESS";
export const FORGOTPASSWORD_ERROR="fORGOTPASSWORD_ERROR";
export const INVALID_RECEIVE_PASSPWORD='INVALID_RECEIVE_PASSWORD';

export const forgotpasswordrequest=(data)=>(
{
  type:FORGOTPASSWORD_REQUEST,
  payload:data

});


export const forgotpasswordSuccess=(forgotpassword)=>(
  {
    type:FORGOTPASSWORD_SUCCESS,
    payload:forgotpassword
  }
);

export const invalidReceivePassword=(forgotpassword)=>(
  {
    type:INVALID_RECEIVE_PASSPWORD,
    payload:forgotpassword
  }
)

export const forgotpasswordError=(error)=>(
{
    type:FORGOTPASSWORD_ERROR,
    payload:error
}
);

export const RESET_PASSWORD_SUCCESS_MESSAGE='RESET_PASSWORD_SUCCESS_MESSAGE';

export const RESET_PASSWORD_FAILURE_MESSAGE='RESET_PASSWORD_FAILURE_MESSAGE';