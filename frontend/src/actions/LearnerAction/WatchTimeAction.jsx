export const WATCH_TIME_REQUEST='WATCH_TIME_REQUEST';
export const WATCH_TIME_SUCCESS='WATCH_TIME_SUCCESS';
export const WATCH_TIME_FAILURE='WATCH_TIME_FAILURE';
export const WATCH_TIME_EXISTS='WATCH_TIME_EXISTS';
export const WATCH_TIME_STATUS='WATCH_TIME_STATUS';
 
export const watchTimeRequest=(learnerprogressdata)=>({
    type:WATCH_TIME_REQUEST,
    payload:learnerprogressdata,
 
})
 
export const watchTimeSuccess=(watchTime)=>({
     type:WATCH_TIME_SUCCESS,
     payload:watchTime,
})
 
export const watchTimeFailure=(error)=>({
    type:WATCH_TIME_FAILURE,
    payload:error,
})
 
export const watchTimeExists=()=>({
    type:WATCH_TIME_EXISTS,
  });
 
export const watchTimeStatus = (isRequesting) => ({
    type: WATCH_TIME_STATUS,
    payload: isRequesting,
  });