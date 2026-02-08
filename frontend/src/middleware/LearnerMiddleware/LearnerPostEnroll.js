// import { enrollRequest, enrollSuccess, enrollFailure ,ENROLL_REQUEST,SET_IS_ENROLL_COURSE} from '..//../actions/LearnerAction/LearnerPostEnrollAction';
 
// export default function LearnerPostEnroll({ dispatch, getState }) {
//     return (next) => (action) => {
//         next(action);
 
//         if (action.type === enrollRequest().type) {
//             const { courseId } = action;
//             const learnerId = sessionStorage.getItem('UserSessionID'); // Retrieve learner ID from session storage
//             const enrollmentEndpoint = "http://localhost:5199/lxp/enroll";
//             const request = {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     courseId: courseId,
//                     learnerId: learnerId,
//                     enrollmentDate: new Date().toISOString(),
//                     enrollStatus: true,
//                     enrollRequestStatus: true,
//                 }),
//             };
 
//             fetch(enrollmentEndpoint, request)
//                 .then((response) => {
//                     if (response.ok) {
//                         return response.json().then((data) => {
//                             console.log("enroll success");
//                             dispatch(enrollSuccess(courseId, learnerId)); // Include learnerId
//                             return data;
//                         });
//                     } else {
//                         return response.text().then((errorText) => {
//                             console.error("Server Error Response:", errorText); // Log the error response text
//                             throw new Error(errorText || "Enrollment failed. Please try again later.");
//                         });
//                     }
//                 })
//                 .catch((error) => {
//                     console.error("Enrollment Error:", error);
//                     dispatch(enrollFailure(error));
//                 });
//         }
//     };
// }






import { ENROLL_REQUEST, enrollSuccess, enrollFailure } from '../../actions/LearnerAction/LearnerPostEnrollAction';
 
const enrollmentMiddleware = async (courseId, learnerId) => {
    const enrollmentEndpoint = "http://localhost:5199/lxp/enroll";
 
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseId: courseId,
        learnerId: learnerId,
        enrollmentDate: new Date().toISOString(),
        enrollStatus: true,
        enrollRequestStatus: true,
      }),
    };
 
    try {
      const response = await fetch(enrollmentEndpoint, request);
      if (response.ok) {
        const data = await response.json();
        console.log("Enroll success", data);
      } else {
        const errorText = await response.text();
        console.error("Server Error Response:", errorText);
      }
    } catch (error) {
      console.error("Enrollment Error:", error);
    }
 
};
 
export default enrollmentMiddleware;