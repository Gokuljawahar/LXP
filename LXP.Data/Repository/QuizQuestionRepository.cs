//////////using System;
//////////using System.Collections.Generic;
//////////using System.Linq;
//////////using System.Text;
//////////using System.Threading.Tasks;

//////////namespace LXP.Data.Repository
//////////{
//////////    internal class Class1
//////////    {
//////////    }
//////////}
////////using System;
////////using System.Collections.Generic;
////////using System.Linq;
////////using System.Threading.Tasks;
////////using LXP.Data.IRepository;
//////////using LXP.Core.DTOs;
////////using LXP.Common.DTO;

////////namespace LXP.Data.Repository
////////{
////////    public class QuizQuestionRepository : IQuizQuestionRepository
////////    {
////////        // Replace with actual data access implementation (e.g., Entity Framework)
////////        private readonly List<QuizQuestionDto> _questions = new List<QuizQuestionDto>();

////////        public async Task AddQuestionAsync(QuizQuestionDto question, IEnumerable<QuestionOptionDto> options)
////////        {
////////            _questions.Add(question);
////////            if (options != null)
////////            {
////////                question.Options = options.ToList(); // Assign options to the question object
////////            }
////////        }

////////        public async Task DeleteQuestionAsync(Guid id)
////////        {
////////            var question = _questions.FirstOrDefault(q => q.QuizQuestionId == id);
////////            if (question != null)
////////            {
////////                _questions.Remove(question);
////////            }
////////        }

////////        public async Task UpdateQuestionAsync(QuizQuestionDto question, IEnumerable<QuestionOptionDto> options)
////////        {
////////            var existingQuestion = _questions.FirstOrDefault(q => q.QuizQuestionId == question.QuizQuestionId);
////////            if (existingQuestion == null)
////////            {
////////                throw new Exception("Question with ID not found."); // Handle missing question appropriately
////////            }

////////            existingQuestion.Question = question.Question;
////////            existingQuestion.QuestionType = question.QuestionType;

////////            // Update or add options based on logic (consider using a separate method for clarity)
////////            if (options != null)
////////            {
////////                // Clear existing options
////////                existingQuestion.Options?.Clear();

////////                foreach (var option in options)
////////                {
////////                    existingQuestion.Options?.Add(option); // Add new options
////////                }
////////            }
////////        }

////////        public async Task<IEnumerable<QuizQuestionDto>> GetQuestionsAsync()
////////        {
////////            return _questions.AsEnumerable(); // Return a copy of the internal list to avoid modification
////////        }
////////    }


////////}
//////using LXP.Common.DTO;

//////public class QuizQuestionRepository : IQuizQuestionRepository
//////{

//////    // Replace with actual data access implementation (e.g., Entity Framework)
//////    private readonly List<QuizQuestionDto> _questions = new List<QuizQuestionDto>();

//////    public async Task AddQuestionAsync(QuizQuestionDto question, IEnumerable<QuestionOptionDto> options)
//////    {
//////        _questions.Add(question);
//////        if (options != null)
//////        {
//////            // Iterate through options and add them to the question
//////            foreach (var option in options)
//////            {
//////                question.Options?.Add(option); // Add each option to the question's Options list
//////            }
//////        }
//////    }

//////    public async Task DeleteQuestionAsync(Guid id)
//////    {
//////        var question = _questions.FirstOrDefault(q => q.QuizQuestionId == id);
//////        if (question != null)
//////        {
//////            _questions.Remove(question);
//////        }
//////    }

//////    public async Task UpdateQuestionAsync(QuizQuestionDto question, IEnumerable<QuestionOptionDto> options)
//////    {
//////        var existingQuestion = _questions.FirstOrDefault(q => q.QuizQuestionId == question.QuizQuestionId);
//////        if (existingQuestion == null)
//////        {
//////            throw new Exception("Question with ID not found."); // Handle missing question appropriately
//////        }

//////        existingQuestion.Question = question.Question;
//////        existingQuestion.QuestionType = question.QuestionType;

//////        // Update or add options based on logic
//////        if (options != null)
//////        {
//////            existingQuestion.Options?.Clear(); // Clear existing options from the question object
//////            foreach (var option in options)
//////            {
//////                existingQuestion.Options?.Add(option); // Add new options
//////            }
//////        }
//////    }

//////    public async Task<IEnumerable<QuizQuestionDto>> GetQuestionsAsync()
//////    {
//////        return _questions.AsEnumerable(); // Return a copy of the internal list to avoid modification
//////    }

//////    // Implement missing methods from the interface
//////    public async Task<QuizQuestionDto> GetById(Guid questionId)
//////    {
//////        return _questions.FirstOrDefault(q => q.QuizQuestionId == questionId);
//////    }

//////    public async Task<IEnumerable<QuizQuestionDto>> GetByQuizId(Guid quizId)
//////    {
//////        return _questions.Where(q => q.QuizId == quizId).AsEnumerable(); // Filter questions by QuizId
//////    }
//////}
//////using System;
//////using System.Collections.Generic;
//////using System.Linq;
//////using LXP.Data.IRepository;
//////using System.Threading.Tasks;
//////using LXP.Common.DTO; // Assuming QuizQuestionDto and QuestionOptionDto are defined here

//////namespace LXP.Data.Repository
//////{
//////    public class QuizQuestionRepository : IQuizQuestionRepository
//////    {
//////        // Replace with actual data access implementation (e.g., Entity Framework)
//////        private readonly List<QuizQuestionDto> _questions = new List<QuizQuestionDto>();

//////        public async Task AddQuestionAsync(QuizQuestionDto question, IEnumerable<QuestionOptionDto> options)
//////        {
//////            _questions.Add(question);
//////            if (options != null)
//////            {
//////                // Iterate through options and add them to the question
//////                foreach (var option in options)
//////                {
//////                    question.Options?.Add(option); // Add each option to the question's Options list
//////                }
//////            }
//////        }

//////        public async Task DeleteQuestionAsync(Guid id)
//////        {
//////            var question = _questions.FirstOrDefault(q => q.QuizQuestionId == id);
//////            if (question != null)
//////            {
//////                _questions.Remove(question);
//////            }
//////        }

//////        public async Task UpdateQuestionAsync(QuizQuestionDto question, IEnumerable<QuestionOptionDto> options)
//////        {
//////            var existingQuestion = _questions.FirstOrDefault(q => q.QuizQuestionId == question.QuizQuestionId);
//////            if (existingQuestion == null)
//////            {
//////                throw new Exception("Question with ID not found."); // Handle missing question appropriately
//////            }

//////            existingQuestion.Question = question.Question;
//////            existingQuestion.QuestionType = question.QuestionType;

//////            // Update or add options based on logic
//////            if (options != null)
//////            {
//////                existingQuestion.Options?.Clear(); // Clear existing options from the question object
//////                foreach (var option in options)
//////                {
//////                    existingQuestion.Options?.Add(option); // Add new options
//////                }
//////            }
//////        }

//////        public async Task<IEnumerable<QuizQuestionDto>> GetQuestionsAsync()
//////        {
//////            return _questions.AsEnumerable(); // Return a copy of the internal list to avoid modification
//////        }

//////        public async Task<QuizQuestionDto> GetById(Guid questionId)
//////        {
//////            return _questions.FirstOrDefault(q => q.QuizQuestionId == questionId);
//////        }

//////        public async Task<IEnumerable<QuizQuestionDto>> GetByQuizId(Guid quizId)
//////        {
//////            return _questions.Where(q => q.QuizId == quizId).AsEnumerable(); // Filter questions by QuizId
//////        }
//////    }
//////}
//////using LXP.Common.DTO;
//////using System;
//////using System.Collections.Generic;
//////using LXP.Data.IRepository;

//////namespace LXP.Data.Repository
//////{
//////    public class QuizQuestionRepository : IQuizQuestionRepository
//////    {
//////        // Add implementation for database operations

//////        public Guid AddQuestion(QuizQuestionDto quizQuestionDto)
//////        {
//////            // Implementation to add a new question
//////            // Generate a new Guid for QuizQuestionId
//////            quizQuestionDto.QuizQuestionId = Guid.NewGuid();

//////            // Set random values for QuizId, CreatedBy, and CreatedAt
//////            quizQuestionDto.QuizId = Guid.NewGuid();
//////            quizQuestionDto.CreatedBy = "SystemUser";
//////            quizQuestionDto.CreatedAt = DateTime.Now;

//////            // Add logic to save the question to the database

//////            return quizQuestionDto.QuizQuestionId;
//////        }

//////        public bool UpdateQuestion(QuizQuestionDto quizQuestionDto)
//////        {
//////            // Implementation to update an existing question
//////            // Add logic to update the question in the database
//////            return true;
//////        }

//////        public bool DeleteQuestion(Guid quizQuestionId)
//////        {
//////            // Implementation to delete a question
//////            // Add logic to delete the question from the database
//////            return true;
//////        }

//////        public List<QuizQuestionDto> GetAllQuestions()
//////        {
//////            // Implementation to retrieve all questions
//////            // Add logic to fetch questions from the database
//////            return new List<QuizQuestionDto>();
//////        }

//////        public Guid AddOption(QuestionOptionDto questionOptionDto)
//////        {
//////            // Implementation to add a new option
//////            // Generate a new Guid for QuestionOptionId
//////            questionOptionDto.QuestionOptionId = Guid.NewGuid();

//////            // Set random values for CreatedBy and CreatedAt
//////            questionOptionDto.CreatedBy = "SystemUser";
//////            questionOptionDto.CreatedAt = DateTime.Now;

//////            // Add logic to save the option to the database

//////            return questionOptionDto.QuestionOptionId;
//////        }
//////    }
//////}
////using LXP.Common.DTO;
////using LXP.Data.IRepository;
////using System;
////using System.Collections.Generic;
////using System.Linq;

////namespace LXP.Data.Repository
////{
////    public class QuizQuestionRepository : IQuizQuestionRepository
////    {
////        private List<QuizQuestionDto> _questions = new List<QuizQuestionDto>();
////        private List<QuestionOptionDto> _options = new List<QuestionOptionDto>();

////        public Guid AddQuestion(QuizQuestionDto quizQuestionDto)
////        {
////            // Set random values for QuizId, CreatedBy, and CreatedAt
////            quizQuestionDto.QuizId = Guid.NewGuid();
////            quizQuestionDto.CreatedBy = "SystemUser";
////            quizQuestionDto.CreatedAt = DateTime.Now;

////            _questions.Add(quizQuestionDto);
////            return quizQuestionDto.QuizQuestionId;
////        }

////        public bool UpdateQuestion(QuizQuestionDto quizQuestionDto)
////        {
////            var question = _questions.FirstOrDefault(q => q.QuizQuestionId == quizQuestionDto.QuizQuestionId);
////            if (question != null)
////            {
////                question.Question = quizQuestionDto.Question;
////                question.QuestionType = quizQuestionDto.QuestionType;
////                question.ModifiedBy = "SystemUser";
////                question.ModifiedAt = DateTime.Now;
////                return true;
////            }
////            return false;
////        }

////        public bool DeleteQuestion(Guid quizQuestionId)
////        {
////            var question = _questions.FirstOrDefault(q => q.QuizQuestionId == quizQuestionId);
////            if (question != null)
////            {
////                _questions.Remove(question);
////                return true;
////            }
////            return false;
////        }

////        public List<QuizQuestionDto> GetAllQuestions()
////        {
////            return _questions;
////        }

////        public Guid AddOption(QuestionOptionDto questionOptionDto)
////        {
////            // Set random values for CreatedBy and CreatedAt
////            questionOptionDto.CreatedBy = "SystemUser";
////            questionOptionDto.CreatedAt = DateTime.Now;

////            _options.Add(questionOptionDto);
////            return questionOptionDto.QuestionOptionId;
////        }

////        public int GetNextQuestionNo()
////        {
////            return _questions.Count + 1;
////        }

////        public void DecrementQuestionNos(Guid deletedQuestionId)
////        {
////            var deletedQuestionNo = _questions.FirstOrDefault(q => q.QuizQuestionId == deletedQuestionId)?.QuestionNo;
////            if (deletedQuestionNo.HasValue)
////            {
////                var subsequentQuestions = _questions.Where(q => q.QuestionNo > deletedQuestionNo.Value).ToList();
////                foreach (var question in subsequentQuestions)
////                {
////                    question.QuestionNo--;
////                }
////            }
////        }

////    }
////}
//using LXP.Common.DTO;
//using LXP.Data.IRepository;
//using System;
//using System.Collections.Generic;
//using System.Linq;

//namespace LXP.Data.Repository
//{
//    public class QuizQuestionRepository : IQuizQuestionRepository
//    {
//        private List<QuizQuestionDto> _questions = new List<QuizQuestionDto>();
//        private List<QuestionOptionDto> _options = new List<QuestionOptionDto>();

//        public Guid AddQuestion(QuizQuestionDto quizQuestionDto)
//        {
//            // Set random values for QuizId, CreatedBy, and CreatedAt
//            quizQuestionDto.QuizId = Guid.NewGuid();
//            quizQuestionDto.CreatedBy = "SystemUser";
//            quizQuestionDto.CreatedAt = DateTime.Now;

//            _questions.Add(quizQuestionDto);
//            return quizQuestionDto.QuizQuestionId;
//        }

//        public bool UpdateQuestion(QuizQuestionDto quizQuestionDto)
//        {
//            var question = _questions.FirstOrDefault(q => q.QuizQuestionId == quizQuestionDto.QuizQuestionId);
//            if (question != null)
//            {
//                question.Question = quizQuestionDto.Question;
//                question.QuestionType = quizQuestionDto.QuestionType;
//                question.ModifiedBy = "SystemUser";
//                question.ModifiedAt = DateTime.Now;
//                return true;
//            }
//            return false;
//        }

//        public bool DeleteQuestion(Guid quizQuestionId)
//        {
//            var question = _questions.FirstOrDefault(q => q.QuizQuestionId == quizQuestionId);
//            if (question != null)
//            {
//                _questions.Remove(question);
//                return true;
//            }
//            return false;
//        }

//        public List<QuizQuestionDto> GetAllQuestions()
//        {
//            return _questions;
//        }

//        public Guid AddOption(QuestionOptionDto questionOptionDto)
//        {
//            // Set random values for CreatedBy and CreatedAt
//            questionOptionDto.CreatedBy = "SystemUser";
//            questionOptionDto.CreatedAt = DateTime.Now;

//            _options.Add(questionOptionDto);
//            return questionOptionDto.QuestionOptionId;
//        }

//        public int GetNextQuestionNo()
//        {
//            return _questions.Count + 1;
//        }

//        public void DecrementQuestionNos(Guid deletedQuestionId)
//        {
//            var deletedQuestionNo = _questions.FirstOrDefault(q => q.QuizQuestionId == deletedQuestionId)?.QuestionNo;
//            if (deletedQuestionNo.HasValue)
//            {
//                var subsequentQuestions = _questions.Where(q => q.QuestionNo > deletedQuestionNo.Value).ToList();
//                foreach (var question in subsequentQuestions)
//                {
//                    question.QuestionNo--;
//                }
//            }
//        }

//        public List<QuestionOptionDto> GetOptionsByQuestionId(Guid quizQuestionId)
//        {
//            return _options.Where(o => o.QuizQuestionId == quizQuestionId).ToList();
//        }

//        public bool ValidateOptionsByQuestionType(string questionType, List<QuestionOptionDto> options)
//        {
//            switch (questionType)
//            {
//                case "MSQ":
//                    return options.Count > 4 && options.Count <= 8 && options.Count(o => o.IsCorrect) >= 2 && options.Count(o => o.IsCorrect) <= 3;
//                case "MCQ":
//                    return options.Count == 4 && options.Count(o => o.IsCorrect) == 1;
//                case "T/F":
//                    return options.Count == 2 && options.Count(o => o.IsCorrect) == 1;
//                default:
//                    return false;
//            }
//        }
//    }
//}
//using LXP.Common.DTO;
//using LXP.Data.IRepository;
//using System;
//using System.Collections.Generic;
//using System.Linq;

//namespace LXP.Data.Repository
//{
//    public class QuizQuestionRepository : IQuizQuestionRepository
//    {
//        private List<QuizQuestionDto> _questions = new List<QuizQuestionDto>();
//        private List<QuestionOptionDto> _options = new List<QuestionOptionDto>();

//        public Guid AddQuestion(QuizQuestionDto quizQuestionDto)
//        {
//            // Set random values for CreatedBy and CreatedAt
//            quizQuestionDto.CreatedBy = "SystemUser";
//            quizQuestionDto.CreatedAt = DateTime.Now;

//            _questions.Add(quizQuestionDto);
//            return quizQuestionDto.QuizQuestionId;
//        }

//        public bool UpdateQuestion(QuizQuestionDto quizQuestionDto)
//        {
//            var question = _questions.FirstOrDefault(q => q.QuizQuestionId == quizQuestionDto.QuizQuestionId);
//            if (question != null)
//            {
//                question.Question = quizQuestionDto.Question;
//                question.QuestionType = quizQuestionDto.QuestionType;
//                question.ModifiedBy = "SystemUser";
//                question.ModifiedAt = DateTime.Now;
//                return true;
//            }
//            return false;
//        }

//        public bool DeleteQuestion(Guid quizQuestionId)
//        {
//            var question = _questions.FirstOrDefault(q => q.QuizQuestionId == quizQuestionId);
//            if (question != null)
//            {
//                _questions.Remove(question);
//                return true;
//            }
//            return false;
//        }

//        public List<QuizQuestionDto> GetAllQuestions()
//        {
//            return _questions;
//        }

//        public Guid AddOption(QuestionOptionDto questionOptionDto)
//        {
//            // Set random values for CreatedBy and CreatedAt
//            questionOptionDto.CreatedBy = "SystemUser";
//            questionOptionDto.CreatedAt = DateTime.Now;

//            _options.Add(questionOptionDto);
//            return questionOptionDto.QuestionOptionId;
//        }

//        public int GetNextQuestionNo(Guid quizId)
//        {
//            return _questions.Where(q => q.QuizId == quizId).Count() + 1;
//        }

//        public void DecrementQuestionNos(Guid deletedQuestionId)
//        {
//            var deletedQuestion = _questions.FirstOrDefault(q => q.QuizQuestionId == deletedQuestionId);
//            if (deletedQuestion != null)
//            {
//                var subsequentQuestions = _questions
//                    .Where(q => q.QuizId == deletedQuestion.QuizId && q.QuestionNo > deletedQuestion.QuestionNo)
//                    .ToList();
//                foreach (var question in subsequentQuestions)
//                {
//                    question.QuestionNo--;
//                }
//            }
//        }

//        public List<QuestionOptionDto> GetOptionsByQuestionId(Guid quizQuestionId)
//        {
//            return _options.Where(o => o.QuizQuestionId == quizQuestionId).ToList();
//        }

//        public bool ValidateOptionsByQuestionType(string questionType, List<QuestionOptionDto> options)
//        {
//            switch (questionType)
//            {
//                case "MSQ":
//                    return options.Count > 4 && options.Count <= 8 && options.Count(o => o.IsCorrect) >= 2 && options.Count(o => o.IsCorrect) <= 3;
//                case "MCQ":
//                    return options.Count == 4 && options.Count(o => o.IsCorrect) == 1;
//                case "T/F":
//                    return options.Count == 2 && options.Count(o => o.IsCorrect) == 1;
//                default:
//                    return false;
//            }
//        }
//    }
//}
// Validate the question type
// if (!IsValidQuestionType(quizQuestionDto.QuestionType))
//     throw new Exception("Invalid question type.");

// // Validate the options based on the question type
// if (!ValidateOptionsByQuestionType(quizQuestionDto.QuestionType, options))
//     throw new Exception("Invalid options for the given question type.");

// Validate the required fields
// public Guid AddQuestion(QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options)
// {
//     try
//     {

//         if (string.IsNullOrWhiteSpace(quizQuestionDto.Question))
//             throw new ArgumentException("Question cannot be null or empty.");

//         if (string.IsNullOrWhiteSpace(quizQuestionDto.CreatedBy))
//             throw new ArgumentException("CreatedBy cannot be null or empty.");

//         if (string.IsNullOrWhiteSpace(quizQuestionDto.QuestionType))
//             throw new ArgumentException("QuestionType cannot be null or empty.");

//         // Validate the question type
//         if (!IsValidQuestionType(quizQuestionDto.QuestionType))
//             throw new Exception("Invalid question type.");

//         // Validate the options based on the question type
//         if (!ValidateOptionsByQuestionType(quizQuestionDto.QuestionType, options))
//             throw new Exception("Invalid options for the given question type.");

//         // Get the next question number for the quiz
//         int nextQuestionNo = GetNextQuestionNo(quizQuestionDto.QuizId);

//         var quizQuestionEntity = new QuizQuestion
//         {
//             QuizId = quizQuestionDto.QuizId,
//             QuestionNo = nextQuestionNo,
//             Question = quizQuestionDto.Question,
//             QuestionType = quizQuestionDto.QuestionType,
//             CreatedBy = quizQuestionDto.CreatedBy,
//             CreatedAt = quizQuestionDto.CreatedAt
//         };

//         _LXPDbContext.QuizQuestions.Add(quizQuestionEntity);
//         _LXPDbContext.SaveChanges();

//         // Add options for the question
//         foreach (var option in options)
//         {
//             var questionOptionEntity = new QuestionOption
//             {
//                 QuizQuestionId = quizQuestionEntity.QuizQuestionId,
//                 Option = option.Option,
//                 IsCorrect = option.IsCorrect,
//                 CreatedBy = option.CreatedBy,
//                 CreatedAt = option.CreatedAt
//             };

//             _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//         }

//         _LXPDbContext.SaveChanges();

//         return quizQuestionEntity.QuizQuestionId;
//     }
//     catch (Exception ex)
//     {
//         throw ex;
//     }
// }
// public Guid AddQuestion(QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options)
// {
//     try
//     {
//         if (string.IsNullOrWhiteSpace(quizQuestionDto.Question))
//             throw new ArgumentException("Question cannot be null or empty.");

//         if (string.IsNullOrWhiteSpace(quizQuestionDto.QuestionType))
//             throw new ArgumentException("QuestionType cannot be null or empty.");

//         // Validate the question type
//         if (!IsValidQuestionType(quizQuestionDto.QuestionType))
//             throw new Exception("Invalid question type.");

//         // Validate the options based on the question type
//         if (!ValidateOptionsByQuestionType(quizQuestionDto.QuestionType, options))
//             throw new Exception("Invalid options for the given question type.");

//         var quizQuestionEntity = new QuizQuestion
//         {
//             QuizId = quizQuestionDto.QuizId,
//             Question = quizQuestionDto.Question,
//             QuestionType = quizQuestionDto.QuestionType,
//             CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//             CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//         };

//         _LXPDbContext.QuizQuestions.Add(quizQuestionEntity);
//         _LXPDbContext.SaveChanges();

//         // Add options for the question
//         foreach (var option in options)
//         {
//             var questionOptionEntity = new QuestionOption
//             {
//                 QuizQuestionId = quizQuestionEntity.QuizQuestionId,
//                 Option = option.Option,
//                 IsCorrect = option.IsCorrect,
//                 CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//                 CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//             };

//             _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//         }

//         _LXPDbContext.SaveChanges();

//         return quizQuestionEntity.QuizQuestionId;
//     }
//     catch (Exception ex)
//     {
//         throw ex;
//     }
// }
// public Guid AddOption(QuestionOptionDto questionOptionDto)
// {
//     var questionOptionEntity = new QuestionOption
//     {
//         QuestionOptionId = questionOptionDto.QuestionOptionId,
//         QuizQuestionId = questionOptionDto.QuizQuestionId,
//         Option = questionOptionDto.Option,
//         IsCorrect = questionOptionDto.IsCorrect,
//         CreatedBy = questionOptionDto.CreatedBy,
//         CreatedAt = questionOptionDto.CreatedAt
//     };

//     _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//     _LXPDbContext.SaveChanges();

//     return questionOptionEntity.QuestionOptionId;
// }
// public class QuizQuestionRepository : IQuizQuestionRepository
// {
//     private readonly LXPDbContext _LXPDbContext;



//     public QuizQuestionRepository(LXPDbContext dbContext)
//     {
//         _LXPDbContext = dbContext;
//     }



//     public Guid AddQuestion(QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options)
// {
//     try
//     {
//         if (string.IsNullOrWhiteSpace(quizQuestionDto.Question))
//             throw new ArgumentException("Question cannot be null or empty.");

//         if (string.IsNullOrWhiteSpace(quizQuestionDto.QuestionType))
//             throw new ArgumentException("QuestionType cannot be null or empty.");

//         // Validate the question type
//         if (!IsValidQuestionType(quizQuestionDto.QuestionType))
//             throw new Exception("Invalid question type.");

//         // Validate the options based on the question type
//         if (!ValidateOptionsByQuestionType(quizQuestionDto.QuestionType, options))
//             throw new Exception("Invalid options for the given question type.");

//         var quizQuestionEntity = new QuizQuestion
//         {
//             QuizId = quizQuestionDto.QuizId,
//             Question = quizQuestionDto.Question,
//             QuestionType = quizQuestionDto.QuestionType,
//             CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//             CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//         };

//         _LXPDbContext.QuizQuestions.Add(quizQuestionEntity);
//         _LXPDbContext.SaveChanges();

//         // Add options for the question
//         foreach (var option in options)
//         {
//             var questionOptionEntity = new QuestionOption
//             {
//                 QuizQuestionId = quizQuestionEntity.QuizQuestionId,
//                 Option = option.Option,
//                 IsCorrect = option.IsCorrect,
//                 CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//                 CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//             };

//             _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//         }

//         _LXPDbContext.SaveChanges();

//         return quizQuestionEntity.QuizQuestionId;
//     }
//     catch (Exception ex)
//     {
//         throw ex;
//     }
// }





//     private bool IsValidQuestionType(string questionType)
//     {
//         return questionType == "MSQ" || questionType == "MCQ" || questionType == "T/F";
//     }
//     public bool UpdateQuestion(QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options)
//     {
//         var quizQuestionEntity = _LXPDbContext.QuizQuestions.Find(quizQuestionDto.QuizQuestionId);
//         if (quizQuestionEntity != null)
//         {
//             quizQuestionEntity.Question = quizQuestionDto.Question;
//             quizQuestionEntity.QuestionType = quizQuestionDto.QuestionType;
//             quizQuestionEntity.ModifiedBy = quizQuestionDto.ModifiedBy;
//             quizQuestionEntity.ModifiedAt = quizQuestionDto.ModifiedAt;

//             _LXPDbContext.SaveChanges();

//             // Update options for the question
//             var existingOptions = _LXPDbContext.QuestionOptions.Where(o => o.QuizQuestionId == quizQuestionDto.QuizQuestionId).ToList();
//             _LXPDbContext.QuestionOptions.RemoveRange(existingOptions);

//             // Add options for the question
//             foreach (var option in options)
//             {
//                 var questionOptionEntity = new QuestionOption
//                 {
//                     QuizQuestionId = quizQuestionEntity.QuizQuestionId,
//                     Option = option.Option,
//                     IsCorrect = option.IsCorrect,
//                     CreatedBy = option.CreatedBy,
//                     CreatedAt = option.CreatedAt,
//                     ModifiedBy = quizQuestionDto.ModifiedBy,
//                     ModifiedAt = quizQuestionDto.ModifiedAt
//                 };

//                 _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//             }

//             _LXPDbContext.SaveChanges();

//             return true;
//         }
//         return false;
//     }

//     public bool DeleteQuestion(Guid quizQuestionId)
//     {
//         var quizQuestionEntity = _LXPDbContext.QuizQuestions.Find(quizQuestionId);
//         if (quizQuestionEntity != null)
//         {
//             _LXPDbContext.QuestionOptions.RemoveRange(_LXPDbContext.QuestionOptions.Where(o => o.QuizQuestionId == quizQuestionId));
//             _LXPDbContext.QuizQuestions.Remove(quizQuestionEntity);
//             _LXPDbContext.SaveChanges();

//             DecrementQuestionNos(quizQuestionId);
//             return true;
//         }
//         return false;
//     }

//     public List<QuizQuestionDto> GetAllQuestions()
//     {
//         return _LXPDbContext.QuizQuestions
//             .Select(q => new QuizQuestionDto
//             {
//                 QuizQuestionId = q.QuizQuestionId,
//                 QuizId = q.QuizId,
//                 QuestionNo = q.QuestionNo,
//                 Question = q.Question,
//                 QuestionType = q.QuestionType,
//                 CreatedBy = q.CreatedBy,
//                 CreatedAt = q.CreatedAt,
//                 ModifiedBy = q.ModifiedBy,
//                 ModifiedAt = q.ModifiedAt,
//                 Options = _LXPDbContext.QuestionOptions.Where(o => o.QuizQuestionId == q.QuizQuestionId)
//                     .Select(o => new QuestionOptionDto
//                     {
//                         QuestionOptionId = o.QuestionOptionId,
//                         QuizQuestionId = o.QuizQuestionId,
//                         Option = o.Option,
//                         IsCorrect = o.IsCorrect,
//                         CreatedBy = o.CreatedBy,
//                         CreatedAt = o.CreatedAt,
//                         ModifiedBy = o.ModifiedBy,
//                         ModifiedAt = o.ModifiedAt
//                     })
//                     .ToList()
//             })
//             .ToList();
//     }

//     public int GetNextQuestionNo(Guid quizId)
//     {
//         return _LXPDbContext.QuizQuestions.Where(q => q.QuizId == quizId).Count() + 1;
//     }

//     public void DecrementQuestionNos(Guid deletedQuestionId)
//     {
//         var deletedQuestion = _LXPDbContext.QuizQuestions.Find(deletedQuestionId);
//         if (deletedQuestion != null)
//         {
//             var subsequentQuestions = _LXPDbContext.QuizQuestions
//                 .Where(q => q.QuizId == deletedQuestion.QuizId && q.QuestionNo > deletedQuestion.QuestionNo)
//                 .ToList();
//             foreach (var question in subsequentQuestions)
//             {
//                 question.QuestionNo--;
//             }
//             _LXPDbContext.SaveChanges();
//         }
//     }

//     public Guid AddOption(QuestionOptionDto questionOptionDto, Guid quizQuestionId)
// {
//     var questionOptionEntity = new QuestionOption
//     {
//         QuizQuestionId = quizQuestionId,
//         Option = questionOptionDto.Option,
//         IsCorrect = questionOptionDto.IsCorrect,
//         CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//         CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//     };

//     _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//     _LXPDbContext.SaveChanges();

//     return questionOptionEntity.QuestionOptionId;
// }
//     public List<QuestionOptionDto> GetOptionsByQuestionId(Guid quizQuestionId)
//     {
//         return _LXPDbContext.QuestionOptions
//             .Where(o => o.QuizQuestionId == quizQuestionId)
//             .Select(o => new QuestionOptionDto
//             {
//                 QuestionOptionId = o.QuestionOptionId,
//                 QuizQuestionId = o.QuizQuestionId,
//                 Option = o.Option,
//                 IsCorrect = o.IsCorrect,
//                 CreatedBy = o.CreatedBy,
//                 CreatedAt = o.CreatedAt,
//                 ModifiedBy = o.ModifiedBy,
//                 ModifiedAt = o.ModifiedAt
//             })
//             .ToList();
//     }





// using LXP.Common.DTO;
// using LXP.Data.IRepository;
// using LXP.Data;
// using LXP.Common.Entities;
// using System;
// using System.Collections.Generic;
// using System.Linq;
// using LXP.Common;
// using LXP.Data.DBContexts;


// namespace LXP.Data.Repository
// {

//     public class QuizQuestionRepository : IQuizQuestionRepository
//     {
//         private readonly LXPDbContext _LXPDbContext;

//         public QuizQuestionRepository(LXPDbContext dbContext)
//         {
//             _LXPDbContext = dbContext;
//         }

//         public Guid AddQuestion(QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options)
//         {
//             try
//             {
//                 if (string.IsNullOrWhiteSpace(quizQuestionDto.Question))
//                     throw new ArgumentException("Question cannot be null or empty.");

//                 if (string.IsNullOrWhiteSpace(quizQuestionDto.QuestionType))
//                     throw new ArgumentException("QuestionType cannot be null or empty.");

//                 // Validate the question type
//                 if (!IsValidQuestionType(quizQuestionDto.QuestionType))
//                     throw new Exception("Invalid question type.");

//                 // Validate the options based on the question type
//                 if (!ValidateOptionsByQuestionType(quizQuestionDto.QuestionType, options))
//                     throw new Exception("Invalid options for the given question type.");

//                 var quizQuestionEntity = new QuizQuestion
//                 {
//                     QuizId = quizQuestionDto.QuizId,
//                     Question = quizQuestionDto.Question,
//                     QuestionType = quizQuestionDto.QuestionType,
//                     CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//                     CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//                 };

//                 _LXPDbContext.QuizQuestions.Add(quizQuestionEntity);
//                 _LXPDbContext.SaveChanges();

//                 // Add options for the question
//                 foreach (var option in options)
//                 {
//                     var questionOptionEntity = new QuestionOption
//                     {
//                         QuizQuestionId = quizQuestionEntity.QuizQuestionId,
//                         Option = option.Option,
//                         IsCorrect = option.IsCorrect,
//                         CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//                         CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//                     };

//                     _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//                 }

//                 _LXPDbContext.SaveChanges();

//                 return quizQuestionEntity.QuizQuestionId;
//             }
//             catch (Exception ex)
//             {
//                 throw ex;
//             }
//         }
//         private bool IsValidQuestionType(string questionType)
//         {
//             return questionType == "MSQ" || questionType == "MCQ" || questionType == "T/F";
//         }

//         public bool UpdateQuestion(Guid quizQuestionId, QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options)
//         {
//             var quizQuestionEntity = _LXPDbContext.QuizQuestions.Find(quizQuestionId);
//             if (quizQuestionEntity != null)
//             {
//                 quizQuestionEntity.Question = quizQuestionDto.Question;
//                 quizQuestionEntity.QuestionType = quizQuestionDto.QuestionType;

//                 _LXPDbContext.SaveChanges();

//                 // Update options for the question
//                 var existingOptions = _LXPDbContext.QuestionOptions.Where(o => o.QuizQuestionId == quizQuestionId).ToList();
//                 _LXPDbContext.QuestionOptions.RemoveRange(existingOptions);

//                 // Add options for the question
//                 foreach (var option in options)
//                 {
//                     var questionOptionEntity = new QuestionOption
//                     {
//                         QuizQuestionId = quizQuestionEntity.QuizQuestionId,
//                         Option = option.Option,
//                         IsCorrect = option.IsCorrect,
//                         CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//                         CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//                     };

//                     _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//                 }

//                 _LXPDbContext.SaveChanges();

//                 return true;
//             }
//             return false;
//         }
//         public bool DeleteQuestion(Guid quizQuestionId)
//         {
//             var quizQuestionEntity = _LXPDbContext.QuizQuestions.Find(quizQuestionId);
//             if (quizQuestionEntity != null)
//             {
//                 _LXPDbContext.QuestionOptions.RemoveRange(_LXPDbContext.QuestionOptions.Where(o => o.QuizQuestionId == quizQuestionId));
//                 _LXPDbContext.QuizQuestions.Remove(quizQuestionEntity);
//                 _LXPDbContext.SaveChanges();

//                 DecrementQuestionNos(quizQuestionId);
//                 return true;
//             }
//             return false;
//         }

//         public List<QuizQuestionDto> GetAllQuestions()
//         {
//             return _LXPDbContext.QuizQuestions
//                 .Select(q => new QuizQuestionDto
//                 {
//                     QuizId = q.QuizId,
//                     Question = q.Question,
//                     QuestionType = q.QuestionType,
//                     Options = _LXPDbContext.QuestionOptions.Where(o => o.QuizQuestionId == q.QuizQuestionId)
//                         .Select(o => new QuestionOptionDto
//                         {
//                             Option = o.Option,
//                             IsCorrect = o.IsCorrect
//                         })
//                         .ToList()
//                 })
//                 .ToList();
//         }

//         public int GetNextQuestionNo(Guid quizId)
//         {
//             return _LXPDbContext.QuizQuestions.Where(q => q.QuizId == quizId).Count() + 1;
//         }

//         public void DecrementQuestionNos(Guid deletedQuestionId)
//         {
//             var deletedQuestion = _LXPDbContext.QuizQuestions.Find(deletedQuestionId);
//             if (deletedQuestion != null)
//             {
//                 var subsequentQuestions = _LXPDbContext.QuizQuestions
//                     .Where(q => q.QuizId == deletedQuestion.QuizId && q.QuestionNo > deletedQuestion.QuestionNo)
//                     .ToList();
//                 foreach (var question in subsequentQuestions)
//                 {
//                     question.QuestionNo--;
//                 }
//                 _LXPDbContext.SaveChanges();
//             }
//         }

//         public Guid AddOption(QuestionOptionDto questionOptionDto, Guid quizQuestionId)
//         {
//             var questionOptionEntity = new QuestionOption
//             {
//                 QuizQuestionId = quizQuestionId,
//                 Option = questionOptionDto.Option,
//                 IsCorrect = questionOptionDto.IsCorrect,
//                 CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//                 CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//             };

//             _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//             _LXPDbContext.SaveChanges();

//             return questionOptionEntity.QuestionOptionId;
//         }

//         public List<QuestionOptionDto> GetOptionsByQuestionId(Guid quizQuestionId)
//         {
//             return _LXPDbContext.QuestionOptions
//                 .Where(o => o.QuizQuestionId == quizQuestionId)
//                 .Select(o => new QuestionOptionDto
//                 {
//                     Option = o.Option,
//                     IsCorrect = o.IsCorrect
//                 })
//                 .ToList();
//         }
//using LXP.Common.DTO;
//using LXP.Data.IRepository;
//using LXP.Data;
//using LXP.Common.Entities;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using LXP.Common;
//using LXP.Data.DBContexts;

//namespace LXP.Data.Repository
//{
//    public class QuizQuestionRepository : IQuizQuestionRepository
//    {
//        private readonly LXPDbContext _LXPDbContext;

//        public QuizQuestionRepository(LXPDbContext dbContext)
//        {
//            _LXPDbContext = dbContext;
//        }

//        public Guid AddQuestion(QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options)
//        {
//            try
//            {
//                if (string.IsNullOrWhiteSpace(quizQuestionDto.Question))
//                    throw new ArgumentException("Question cannot be null or empty.");

//                if (string.IsNullOrWhiteSpace(quizQuestionDto.QuestionType))
//                    throw new ArgumentException("QuestionType cannot be null or empty.");

//                // Validate the question type
//                if (!IsValidQuestionType(quizQuestionDto.QuestionType))
//                    throw new Exception("Invalid question type.");

//                // Validate the options based on the question type
//                if (!ValidateOptionsByQuestionType(quizQuestionDto.QuestionType, options))
//                    throw new Exception("Invalid options for the given question type.");

//                var quizQuestionEntity = new QuizQuestion
//                {
//                    QuizId = quizQuestionDto.QuizId,
//                    Question = quizQuestionDto.Question,
//                    QuestionType = quizQuestionDto.QuestionType,
//                    CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//                    CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//                };

//                _LXPDbContext.QuizQuestions.Add(quizQuestionEntity);
//                _LXPDbContext.SaveChanges();

//                // Add options for the question
//                foreach (var option in options)
//                {
//                    var questionOptionEntity = new QuestionOption
//                    {
//                        QuizQuestionId = quizQuestionEntity.QuizQuestionId,
//                        Option = option.Option,
//                        IsCorrect = option.IsCorrect,
//                        CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//                        CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//                    };

//                    _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//                }

//                _LXPDbContext.SaveChanges();

//                return quizQuestionEntity.QuizQuestionId;
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//        private bool IsValidQuestionType(string questionType)
//        {
//            return questionType == "MSQ" || questionType == "MCQ" || questionType == "T/F";
//        }

//        public bool UpdateQuestion(Guid quizQuestionId, QuizQuestionDto quizQuestionDto, List<QuestionOptionDto> options)
//        {
//            var quizQuestionEntity = _LXPDbContext.QuizQuestions.Find(quizQuestionId);
//            if (quizQuestionEntity != null)
//            {
//                quizQuestionEntity.Question = quizQuestionDto.Question;
//                quizQuestionEntity.QuestionType = quizQuestionDto.QuestionType;

//                _LXPDbContext.SaveChanges();

//                // Update options for the question
//                var existingOptions = _LXPDbContext.QuestionOptions.Where(o => o.QuizQuestionId == quizQuestionId).ToList();
//                _LXPDbContext.QuestionOptions.RemoveRange(existingOptions);

//                // Add options for the question
//                foreach (var option in options)
//                {
//                    var questionOptionEntity = new QuestionOption
//                    {
//                        QuizQuestionId = quizQuestionEntity.QuizQuestionId,
//                        Option = option.Option,
//                        IsCorrect = option.IsCorrect,
//                        CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//                        CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//                    };

//                    _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//                }

//                _LXPDbContext.SaveChanges();

//                return true;
//            }
//            return false;
//        }

//        public bool DeleteQuestion(Guid quizQuestionId)
//        {
//            var quizQuestionEntity = _LXPDbContext.QuizQuestions.Find(quizQuestionId);
//            if (quizQuestionEntity != null)
//            {
//                _LXPDbContext.QuestionOptions.RemoveRange(_LXPDbContext.QuestionOptions.Where(o => o.QuizQuestionId == quizQuestionId));
//                _LXPDbContext.QuizQuestions.Remove(quizQuestionEntity);
//                _LXPDbContext.SaveChanges();

//                DecrementQuestionNos(quizQuestionId);
//                return true;
//            }
//            return false;
//        }

//        public List<QuizQuestionDto> GetAllQuestions()
//        {
//            return _LXPDbContext.QuizQuestions
//                .Select(q => new QuizQuestionDto
//                {
//                    QuizId = q.QuizId,
//                    Question = q.Question,
//                    QuestionType = q.QuestionType,
//                    Options = _LXPDbContext.QuestionOptions.Where(o => o.QuizQuestionId == q.QuizQuestionId)
//                        .Select(o => new QuestionOptionDto
//                        {
//                            Option = o.Option,
//                            IsCorrect = o.IsCorrect
//                        })
//                        .ToList()
//                })
//                .ToList();
//        }

//        public int GetNextQuestionNo(Guid quizId)
//        {
//            return _LXPDbContext.QuizQuestions.Where(q => q.QuizId == quizId).Count() + 1;
//        }

//        public void DecrementQuestionNos(Guid deletedQuestionId)
//        {
//            var deletedQuestion = _LXPDbContext.QuizQuestions.Find(deletedQuestionId);
//            if (deletedQuestion != null)
//            {
//                var subsequentQuestions = _LXPDbContext.QuizQuestions
//                    .Where(q => q.QuizId == deletedQuestion.QuizId && q.QuestionNo > deletedQuestion.QuestionNo)
//                    .ToList();
//                foreach (var question in subsequentQuestions)
//                {
//                    question.QuestionNo--;
//                }
//                _LXPDbContext.SaveChanges();
//            }
//        }

//        public Guid AddOption(QuestionOptionDto questionOptionDto, Guid quizQuestionId)
//        {
//            var questionOptionEntity = new QuestionOption
//            {
//                QuizQuestionId = quizQuestionId,
//                Option = questionOptionDto.Option,
//                IsCorrect = questionOptionDto.IsCorrect,
//                CreatedBy = "SystemUser", // Hardcoded value for CreatedBy
//                CreatedAt = DateTime.UtcNow // Using system time for CreatedAt
//            };

//            _LXPDbContext.QuestionOptions.Add(questionOptionEntity);
//            _LXPDbContext.SaveChanges();

//            return questionOptionEntity.QuestionOptionId;
//        }

//        public List<QuestionOptionDto> GetOptionsByQuestionId(Guid quizQuestionId)
//        {
//            return _LXPDbContext.QuestionOptions
//                .Where(o => o.QuizQuestionId == quizQuestionId)
//                .Select(o => new QuestionOptionDto
//                {
//                    Option = o.Option,
//                    IsCorrect = o.IsCorrect
//                })
//                .ToList();
//        }


//        public bool ValidateOptionsByQuestionType(string questionType, List<QuestionOptionDto> options)
//        {
//            try
//            {
//                switch (questionType)
//                {
//                    case "MSQ":
//                        return options.Count > 4 && options.Count <= 8 && options.Count(o => o.IsCorrect) >= 2 && options.Count(o => o.IsCorrect) <= 3;
//                    case "MCQ":
//                        return options.Count == 4 && options.Count(o => o.IsCorrect) == 1;
//                    case "T/F":
//                        return options.Count == 2 && options.Count(o => o.IsCorrect) == 1;
//                    default:
//                        return false;
//                }
//            }
//            catch (Exception ex)
//            {
//                throw ex;
//            }
//        }

//    }
//}

using System;
using System.Collections.Generic;
using System.Linq;
using LXP.Common.DTO;
using LXP.Common.Entities;
using LXP.Data.DBContexts;
using LXP.Data.IRepository;

namespace LXP.Core.Repositories
{
    public class QuizQuestionRepository : IQuizQuestionRepository
    {
        private readonly LXPDbContext _dbContext;

        public QuizQuestionRepository(LXPDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public QuizQuestionDto AddQuestion(QuizQuestionDto question)
        {
            try
            {
                if (string.IsNullOrEmpty(question.Question))
                    throw new ArgumentException("Question cannot be empty.");

                if (question.Options == null || question.Options.Length == 0)
                    throw new ArgumentException("Options cannot be empty.");

                // Convert DTO to entity
                var questionEntity = new QuizQuestion
                {
                    QuizId = question.QuizId,
                    Question = question.Question,
                    QuestionType = question.QuestionType
                    // Map other properties as needed
                };

                _dbContext.QuizQuestions.Add(questionEntity);
                _dbContext.SaveChanges();

                // Convert the saved entity back to DTO
                return new QuizQuestionDto
                {
                    QuizId = questionEntity.QuizId,
                    Question = questionEntity.Question,
                    QuestionType = questionEntity.QuestionType
                    // Map other properties as needed
                };
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while adding the question: {ex.Message}", ex);
            }
        }

        public void AddOption(List<QuestionOptionDto> questionOptions, Guid quizQuestionId)
        {
            // Convert DTOs to entities
            var optionEntities = questionOptions.Select(optionDto => new QuestionOption
            {
                QuizQuestionId = quizQuestionId,
                Option = optionDto.Option,
                IsCorrect = optionDto.IsCorrect
                // Map other properties as needed
            }).ToList();

            // Save options to the repository
            _dbContext.QuestionOptions.AddRange(optionEntities);
            _dbContext.SaveChanges();
        }
    }
}




