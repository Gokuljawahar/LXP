﻿

//using LXP.Common.DTO;
//using System;
//using System.Collections.Generic;

//namespace LXP.Core.IServices
//{
//    public interface IQuizQuestionService
//    {
//        Guid AddQuestion(QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options);
//        bool UpdateQuestion(Guid quizQuestionId, QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options);
//        bool DeleteQuestion(Guid quizQuestionId);
//        List<QuizQuestionNoDto> GetAllQuestions();
//    }
//}

using LXP.Common.DTO;
using System;
using System.Collections.Generic;

namespace LXP.Core.IServices
{
    public interface IQuizQuestionService
    {
        Guid AddQuestion(QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options);
        bool UpdateQuestion(Guid quizQuestionId, QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options);
        bool DeleteQuestion(Guid quizQuestionId);
        List<QuizQuestionNoDto> GetAllQuestions();
        QuizQuestionNoDto GetQuestionById(Guid quizQuestionId);
    }
}


//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace LXP.Core.IServices
//{
//    internal interface Interface1
//    {
//    }
//}
//public interface IQuizQuestionService
//{
//    IEnumerable<QuizQuestionDto> GetByQuizId(Guid quizId);
//    QuizQuestionDto GetById(Guid questionId);
//    void Create(QuizQuestionDto question);
//    void Update(QuizQuestionDto question);
//    void Delete(Guid questionId);
//}
//public interface IQuizQuestionService
//{
//    Task<IEnumerable<QuizQuestionDto>> GetByQuizId(Guid quizId);
//    Task<QuizQuestionDto> GetById(Guid questionId);
//    Task<QuizQuestionDto> AddQuestionAsync(QuizQuestionDto question);
//    Task UpdateQuestionAsync(QuizQuestionDto question);
//    Task DeleteQuestionAsync(Guid questionId);
//}