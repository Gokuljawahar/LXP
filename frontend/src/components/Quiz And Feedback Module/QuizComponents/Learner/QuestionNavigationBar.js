import React from 'react';
import '../../../../Styles/Quiz And Feedback Module/Learner/QuestionNavigationBar.css';
 
const QuestionNavigationBar = ({ questions, selectedOptions, currentQuestionIndex, onQuestionClick }) => {
    return (
        <div className="question-navigation-bar">
            {questions && questions.length > 0 ? (
                questions.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => onQuestionClick(index)}
                        className={`${currentQuestionIndex === index ? 'active' : ''} ${selectedOptions[questions[index].quizQuestionId]?.length > 0 ? 'answered' : 'unanswered'}`}
                    >
                        {index + 1}
                    </button>
                ))
            ) : (
                <p>No questions available</p>
            )}
        </div>
    );
};
 
export default QuestionNavigationBar;