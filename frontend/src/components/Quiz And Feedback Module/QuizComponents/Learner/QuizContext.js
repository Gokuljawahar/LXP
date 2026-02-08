// QuizContext.js
import React from 'react';
 
 
export const QuizContext = React.createContext();
 
export const QuizProvider = ({ children }) => {
  const [isReattempt, setIsReattempt] = React.useState(false);
 
  return (
    <QuizContext.Provider value={{ isReattempt, setIsReattempt }}>
      {children}
 
    </QuizContext.Provider>
  );
};