// import { USER_DATA_REQUEST, userDataSuccess, userDataFailure } from '..//../actions/LearnerAction/RegisterAction';
// import axios from 'axios';

// import { userData } from './/..//..//../src/components/LearnerComponent/Register';
// import { useState } from 'react';



// const BASE_URL = 'http://localhost:5199/lxp/learner/registration';


// const RegisterApi = async (action) => {
//   try {
//     console.log("asdads", action);
//     const response = await axios.post(BASE_URL, action);
//     console.log('API Response:', response.data);
//   //   setTimeout(() => {
//   //     // navigate("/");
//   // }, 2000);
    
//   } catch (error) {
//     console.log("error post", error);
//   }
// }

// export default RegisterApi;


// import { USER_DATA_REQUEST, userDataSuccess, userDataFailure } from '..//../actions/LearnerAction/RegisterAction';
// import axios from 'axios';
 
// import { userData } from './/..//..//../src/components/LearnerComponent/Register';
// import { useState } from 'react';
 
 
 
// const BASE_URL = 'http://localhost:5199/lxp/learner/registration';
 
 
// const RegisterApi = async (action) => {
//   try {
//     console.log("asdads", action);
//     const response = await axios.post(BASE_URL, action);
//     console.log('API Response:', response.data);
//   //   setTimeout(() => {
//   //     // navigate("/");
//   // }, 2000);
   
//   } catch (error) {
//     console.log("error post", error);
//   }
// }
 
// export default RegisterApi;


import { USER_DATA_REQUEST, userDataSuccess, userDataFailure } from '../../actions/LearnerAction/RegisterAction';
import axios from 'axios';

import { userData } from '../../../src/components/LearnerComponent/Register';
import { useState } from 'react';

const BASE_URL = 'http://localhost:5199/lxp/learner/registration';

const RegisterApi = async (action) => {
  try {
    console.log("asdads", action);
    const response = await axios.post(BASE_URL, action, {
      headers: {
        // Add CORS headers
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    });
    console.log('API Response:', response.data);
    //   setTimeout(() => {
    //     // navigate("/");
    // }, 2000);

  } catch (error) {
    console.log("error post", error);
  }
}

export default RegisterApi;
