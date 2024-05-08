﻿
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using LXP.Core.IServices;
using LXP.Common.DTO;


namespace LXP.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuizController : ControllerBase
    {
        private readonly IQuizService _quizService;

        public QuizController(IQuizService quizService)
        {
            _quizService = quizService;
        }

        [HttpGet("{id}")]
        public ActionResult<QuizDto> GetQuizById(Guid id)
        {
            var quiz = _quizService.GetQuizById(id);
            if (quiz == null)
                return NotFound();

            return Ok(quiz);
        }

        [HttpGet]
        public ActionResult<IEnumerable<QuizDto>> GetAllQuizzes()
        {
            var quizzes = _quizService.GetAllQuizzes();
            return Ok(quizzes);
        }


        
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public ActionResult CreateQuiz([FromBody] QuizDto request)
        {
            var quizId = Guid.NewGuid(); // Generate QuizId
            var courseId = Guid.Parse("ce753ccb-408c-4d8c-8acd-cbc8c5adcbb8"); // Hardcoded CourseId
            var topicId = Guid.Parse("e3a895e4-1b3f-45b8-9c0a-98f9c0fa4996"); // Hardcoded TopicId
            var createdBy = "System"; // Set createdBy
            var createdAt = DateTime.UtcNow; // Set createdAt

            var quiz = new QuizDto
            {
                NameOfQuiz = request.NameOfQuiz,
                Duration = request.Duration,
                PassMark = request.PassMark,
            };

            // Pass the necessary fields to the service
            _quizService.CreateQuiz(quizId, courseId, topicId, quiz.NameOfQuiz, quiz.Duration, quiz.PassMark, createdBy, createdAt);

            // Return 201 Created status with the newly created quiz
            return CreatedAtAction(nameof(GetQuizById), new { id = quizId }, quiz);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateQuiz(Guid id, [FromBody] QuizDto request)
        {
            // Check if the provided ID matches the ID in the request body
            if (id != request.QuizId)
                return BadRequest();

            // Retrieve the existing quiz by ID
            var existingQuiz = _quizService.GetQuizById(id);
            if (existingQuiz == null)
                return NotFound();

            // Update only the allowed fields
            existingQuiz.NameOfQuiz = request.NameOfQuiz;
            existingQuiz.Duration = request.Duration;
            existingQuiz.PassMark = request.PassMark;

            // Call the service method to update the quiz
            _quizService.UpdateQuiz(existingQuiz);

            // Return NoContent if successful
            return NoContent();
        }


        [HttpDelete("{id}")]
        public ActionResult DeleteQuiz(Guid id)
        {
            _quizService.DeleteQuiz(id);
            return NoContent();
        }
    }
}
// [HttpPost]
// public ActionResult CreateQuiz(QuizDto quiz)
// {
//     _quizService.CreateQuiz(quiz);
//     return CreatedAtAction(nameof(GetQuizById), new { id = quiz.QuizId }, quiz);
// }

// [HttpPost]
// public ActionResult CreateQuiz(QuizDto quiz)
// {
//     // Generate QuizId
//     quiz.QuizId = Guid.NewGuid();

//     // Hardcoded values for TopicId and CourseId
//     quiz.CourseId = Guid.Parse("ce753ccb-408c-4d8c-8acd-cbc8c5adcbb8");
//     quiz.TopicId = Guid.Parse("e3a895e4-1b3f-45b8-9c0a-98f9c0fa4996");

//     _quizService.CreateQuiz(quiz);
//     return CreatedAtAction(nameof(GetQuizById), new { id = quiz.QuizId }, quiz);
// }
// [HttpPut("{id}")]
// public ActionResult UpdateQuiz(Guid id, QuizDto quiz)
// {
//     if (id != quiz.QuizId)
//         return BadRequest();

//     _quizService.UpdateQuiz(quiz);
//     return NoContent();
// }
// [HttpPost]
// [ProducesResponseType(StatusCodes.Status201Created)]
// public ActionResult CreateQuiz([FromBody] QuizDto request)
// {
//     var quizId = Guid.NewGuid(); // Generate QuizId
//     var courseId = Guid.Parse("ce753ccb-408c-4d8c-8acd-cbc8c5adcbb8"); // Hardcoded CourseId
//     var topicId = Guid.Parse("e3a895e4-1b3f-45b8-9c0a-98f9c0fa4996"); // Hardcoded TopicId
//     var createdBy = "System"; // Set createdBy
//     var createdAt = DateTime.UtcNow; // Set createdAt

//     var quiz = new QuizDto
//     {
//         NameOfQuiz = request.NameOfQuiz,
//         Duration = request.Duration,
//         PassMark = request.PassMark,
//     };

//     // Pass the necessary fields to the service
//     _quizService.CreateQuiz(quizId, courseId, topicId, quiz.NameOfQuiz, quiz.Duration, quiz.PassMark, createdBy, createdAt);

//     // Return 201 Created status with the newly created quiz
//     return CreatedAtAction(nameof(GetQuizById), new { id = quizId }, quiz);
// }



// [HttpPut("{id}")]
// public ActionResult UpdateQuiz(Guid id, [FromBody] QuizDto request)
// {
//     // Check if the provided ID matches the ID in the request body
//     if (id != request.QuizId)
//         return BadRequest();

//     // Retrieve the existing quiz by ID
//     var existingQuiz = _quizService.GetQuizById(id);
//     if (existingQuiz == null)
//         return NotFound();

//     // Update only the allowed fields
//     existingQuiz.NameOfQuiz = request.NameOfQuiz;
//     existingQuiz.Duration = request.Duration;
//     existingQuiz.PassMark = request.PassMark;

//     // Call the service method to update the quiz
//     _quizService.UpdateQuiz(existingQuiz);

//     // Return NoContent if successful
//     return NoContent();
// }