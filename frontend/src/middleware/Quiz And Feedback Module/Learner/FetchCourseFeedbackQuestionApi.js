import axios from 'axios';

export const FetchCourseFeedbackQuestionApi =  async (action) => {
        try {
            const response = await axios.get(`http://localhost:5199/api/CourseFeedback/course/${action}`);
            console.log("FetchingCourseFeedbackQuestions:", response.data);
            return response.data.data;
        } catch (error) {
            console.log("Error fetching question: ", error.message);
        }
}