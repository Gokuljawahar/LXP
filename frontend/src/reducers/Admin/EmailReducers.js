import{EMAIL_REQUEST,EMAIL_SUCCESS,EMAIL_ERROR, RESET_EMAIL_UPDATED_SUCCESS_MESSAGE, EMAIL_FAILURE, RESET_EMAIL_UPDATED_FAILURE_MESSAGE} from '../../actions/Admin/EmailAction';

const initialState={
    email:null,
    loading:false,
    isSuccessemail:false,
    error:null,
    isFailureEmail:false,
};

const emailReducer=(state = initialState,action)=>{
    switch(action.type){
        case EMAIL_REQUEST:
            return{
            ...state,
            loading:true,
            error:null
        }
        case EMAIL_SUCCESS:
            return{
                ...state,
                email:action.payload,
                isSuccessemail:true,
                loading:false,
                isFailureEmail:false,
                error:null

            }
        case EMAIL_FAILURE:
            return{
                ...state,
                loading:false,
                email:action.payload,
                isFailureEmail:true,

            }
        case EMAIL_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        case RESET_EMAIL_UPDATED_SUCCESS_MESSAGE:
            return{
                ...state,
                isSuccessemail:false
            }
            case RESET_EMAIL_UPDATED_FAILURE_MESSAGE:     // Setting up flag for the False the failure message
                return{
                    ...state,
                    isFailureEmail:false
                }
        default:
            return state;
    }

};

export default emailReducer;

// const emailReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case SUBMIT_EMAIL:
//             return {
//                 ...state,
//                 email: action.payload.email,
//                 submitting: true, 
//             };
//         default:
//             return state;
//     }
// };
 
// export default emailReducer;