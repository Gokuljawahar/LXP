import axios from 'axios';
import {EMAIL_REQUEST,emailSuccess,emailError, emailFailure} from '../../actions/Admin/EmailAction'

import { baseUrl } from './api';

const emailMiddleware=({dispatch})=>(next)=>async(action)=>{
    if(action.type===EMAIL_REQUEST){
        try{
            const response=await axios.post(`${baseUrl}/api/RandomPassword`, action.payload)
            console.log('API Response:', response.data.result);
            if(response.data.result===true){
               dispatch(emailSuccess(action.payload));     
                 
            }
            else if(response.data.result===false)
            {
                dispatch(emailFailure(action.payload))
            }
        }
        catch(error){       
            dispatch(emailError(error.message));
            console.log(error.message);
        }
    }

    return next(action)

};

export default emailMiddleware;

// const emailMiddleware = (store) => (next) => (action) => {
//     if (action.type === 'SUBMIT_EMAIL') {
//         store.dispatch({ type: 'SUBMIT_EMAIL_REQUEST' }); // Dispatch a request action (optional)
//         axios.post('/api/sendemail', { email: action.payload.email })
//             .then((response) => {
//                 store.dispatch({ type: 'SUBMIT_EMAIL_SUCCESS' }); // Dispatch a success action (optional)
//             })
//             .catch((error) => {
//                 store.dispatch({ type: 'SUBMIT_EMAIL_FAILURE', payload: { error } }); // Dispatch a failure action with error (optional)
//             });
//     } else {
//         next(action);
//     }
// };
