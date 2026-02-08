export const EMAIL_REQUEST = 'EMAIL_REQUEST';
export const EMAIL_SUCCESS = 'EMAIL_SUCCESS';
export const EMAIL_ERROR = 'EMAIL_ERROR';
export const EMAIL_FAILURE = 'EMAIL_FAILURE'

export const emailRequest = (emailrequest) =>
({
  type: EMAIL_REQUEST,
  payload: emailrequest
});

export const emailSuccess = (email) => ({
  type: EMAIL_SUCCESS,
  payload: email
});

export const emailFailure = (email) => ({
  type: EMAIL_FAILURE,
  payload: email
});



export const emailError = (error) =>
({
  type: EMAIL_ERROR,
  payload: error

});

// Setting flag for the stop the email-successfull-message

export const RESET_EMAIL_UPDATED_SUCCESS_MESSAGE = 'RESET_EMAIL_UPDATED_SUCCESS_MESSAGE';



export const RESET_EMAIL_UPDATED_FAILURE_MESSAGE = 'RESET_EMAIL_UPDATED_FAILURE_MESSAGE';