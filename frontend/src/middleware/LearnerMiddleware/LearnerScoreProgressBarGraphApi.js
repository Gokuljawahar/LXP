import axios from 'axios';
 
const LearnerScoreProgressBarGraphApi = async (id) => {
 console.log("apiid",id);
    const API_URL = `http://localhost:5199/api/LearnerAttempt/GetScoreByTopicIdAndLearnerId?LearnerId=${id}`;
        try {
            const response = await axios.get(`${API_URL}`);
            console.log('API Response:', response.data); // Log the response data
            return response.data.data;
        } catch (error) {
            console.error('API Error:', error.message);
        }
    }
;
export default LearnerScoreProgressBarGraphApi;


