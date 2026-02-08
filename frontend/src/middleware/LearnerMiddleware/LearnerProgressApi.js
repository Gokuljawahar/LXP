// import { FETCH_LEARNER_PROGRESS_REQUEST,FetchLearnerProgressSucess,FetchLearnerProgressFailure } from "../../actions/LearnerAction/FetchLearnerProgressAction";

// import axios from 'axios';

// import {userData} from './/..//..//../src/components/LearnerComponent/Register';
// import  { useState } from 'react';

// // const BASE_URL = 'http://localhost:5199/lxp/view/learner/ ';

// const LearnerProgressApi=async(learnerId)=>{

//      try{
//       const enrollmentId = sessionStorage.getItem("enrolled");
//       console.log("progressids",learnerId,enrollmentId);
//       const response = await axios.get(`http://localhost:5199/api/LearnerProgress/course-completion-percentage/${learnerId}/${enrollmentId}`);
//       console.log("learnerprogress",response.data);
//       return response.data;
//      }catch(error){
//      }
// }

// export default  LearnerProgressApi;


import { FETCH_LEARNER_PROGRESS_REQUEST,FetchLearnerProgressSucess,FetchLearnerProgressFailure } from "../../actions/LearnerAction/FetchLearnerProgressAction";
 
import axios from 'axios';
 
import {userData} from './/..//..//../src/components/LearnerComponent/Register';
import  { useState } from 'react';
 
// const BASE_URL = 'http://localhost:5199/lxp/view/learner/ ';
 
const LearnerProgressApi = async (learnerId, enrollmentIds) => {
     try {
       const completionPercentages = []; // Initialize an empty array to store percentages
   
       for (const enrollmentId of enrollmentIds) {
         const response = await axios.get(`http://localhost:5199/api/LearnerProgress/course-completion-percentage/${learnerId}/${enrollmentId}`);
         completionPercentages.push(response.data); // Store the percentage in the array
       }
   
       console.log("learnerprogress", completionPercentages);
       return completionPercentages;
     } catch (error) {
       // Handle errors
     }
   }
   export default  LearnerProgressApi;
 
