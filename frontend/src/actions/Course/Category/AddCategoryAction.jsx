export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS='CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAILURE='CREATE_CATEGORY_FAILURE';
export const CREATE_CATEGORY_INTERNALFAILURE='CREATE_CATEGORY_INTERNALFAILURE';
export const SET_CATEGORY_STATUS='SET_CATEGORY_STATUS';
export const createCategoryrequest = (category) => ({
  type:CREATE_CATEGORY_REQUEST ,
  payload:category,
  
});

export const createCategorysuccess=(category)=>({
  type:CREATE_CATEGORY_SUCCESS,
  payload:category,
})

export const createCategoryfailure=()=>({
  type:CREATE_CATEGORY_FAILURE,
  
})

export const createCategoryInternalfailure=()=>({
  type:CREATE_CATEGORY_INTERNALFAILURE,
})

export const setCategoryStatus = (isRequesting) => ({
  type: SET_CATEGORY_STATUS,
  payload: isRequesting,
});
export const RESET_THE_SUBMITTED_MESSGAE='RESET_THE_SUBMITTED_MESSGAE';
export const RESET_EXISTED_MESSAGE = 'RESER_EXISTED_MESSAGE';