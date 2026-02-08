import axios from 'axios';
import { CREATE_CATEGORY_REQUEST, createCategoryInternalfailure, createCategoryfailure, createCategorysuccess,SET_CATEGORY_STATUS } from '../../../actions/Course/Category/AddCategoryAction';



const API_URL = 'http://localhost:5199/lxp/course/category';

 const addCategory = ({ dispatch,getState }) => (next) => async (action) => {
  

  if (action.type === CREATE_CATEGORY_REQUEST) {
    const ReducerData=getState().addCategory;
    if (!ReducerData.isRequesting) {
      dispatch({ type: SET_CATEGORY_STATUS, payload: true });
    try {
      console.log("category Post api",action.payload)
      // Assuming 'action.payload' contains the data you want to senda
      const response = await axios.post(API_URL,action.payload);
      console.log('API Response:', response.data); // Log the response data
       if(response.data.statusCode==200){
        dispatch(createCategorysuccess(response.data.message))
       }
       if(response.data.statusCode==412){
        dispatch(createCategoryfailure())
       }
      
      
    } catch (error) {
      console.error('API Error:', error.message);
      dispatch(createCategoryInternalfailure());
      
    }finally{
      dispatch({type:SET_CATEGORY_STATUS,payload:false})
      
      }
  }
}
  return next(action);
  
};

export default addCategory;
