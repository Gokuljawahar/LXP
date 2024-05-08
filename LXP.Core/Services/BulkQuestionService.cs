using LXP.Common.Entities;
using LXP.Common.ViewModels;
using LXP.Core.IServices;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using LXP.Data.IRepository;

namespace LXP.Core.Services
{
    public class BulkQuestionService : IBulkQuestionService
    {
        private readonly IBulkQuestionRepository _bulkQuestionRepository;

        public BulkQuestionService(IBulkQuestionRepository bulkQuestionRepository)
        {
            _bulkQuestionRepository = bulkQuestionRepository;
        }
        public object ImportQuizData(IFormFile file)
        {
            try
            {
                if (file == null || file.Length <= 0)
                    throw new ArgumentException("File is empty.");

                using (var stream = new MemoryStream())
                {
                    file.CopyTo(stream);
                    stream.Position = 0;

                    using (ExcelPackage package = new ExcelPackage(stream))
                    {
                        ExcelWorksheet worksheet = package.Workbook.Worksheets.FirstOrDefault();
                        if (worksheet == null)
                            throw new ArgumentException("Worksheet not found.");

                        List<QuizQuestionViewModel> quizQuestions = new List<QuizQuestionViewModel>();

                        // Loop through each row in the worksheet
                        for (int row = 3; row <= worksheet.Dimension.End.Row; row++)
                        {
                            string type = worksheet.Cells[row, 2].Value?.ToString();

                            if (type == "MCQ" || type == "TF" || type == "MSQ")
                            {
                                QuizQuestionViewModel quizQuestion = new QuizQuestionViewModel
                                {
                                    QuestionType = type,
                                    QuestionNumber = Convert.ToInt32(worksheet.Cells[row, 1].Value),
                                    Question = worksheet.Cells[row, 3].Value.ToString(),
                                };

                                // Extract options based on question type
                                if (type == "MCQ")
                                {
                                    quizQuestion.Options = ExtractOptions(worksheet, row, 4, 4);
                                    quizQuestion.CorrectOptions = ExtractOptions(worksheet, row, 12, 1);
                                }
                                else if (type == "TF")
                                {
                                    quizQuestion.Options = ExtractOptions(worksheet, row, 4, 2);
                                    quizQuestion.CorrectOptions = ExtractOptions(worksheet, row, 12, 1);
                                }
                                else if (type == "MSQ")
                                {
                                    quizQuestion.Options = ExtractOptions(worksheet, row, 4, 8);
                                    quizQuestion.CorrectOptions = ExtractOptions(worksheet, row, 12, 3);
                                }

                                quizQuestions.Add(quizQuestion);
                            }
                        }

                        // Loop through each question and add to repository
                        foreach (var quizQuestion in quizQuestions)
                        {
                            // Add question to the repository
                            QuizQuestion questionEntity = new QuizQuestion
                            {
                                QuizId = Guid.Parse("3fa85f64-5717-4562-b3fc-2c963f66afa6"),
                                QuestionNo = quizQuestion.QuestionNumber,
                                QuestionType = quizQuestion.QuestionType,
                                Question = quizQuestion.Question,
                                CreatedBy = "Admin",
                                CreatedAt = DateTime.UtcNow
                            };

                            // Save the question to get the QuizQuestionId
                            _bulkQuestionRepository.AddQuestions(new List<QuizQuestion> { questionEntity });

                            // Add options associated with the question
                            List<QuestionOption> optionEntities = new List<QuestionOption>();
                            for (int i = 0; i < quizQuestion.Options.Length; i++)
                            {
                                if (!string.IsNullOrEmpty(quizQuestion.Options[i]))
                                {
                                    QuestionOption optionEntity = new QuestionOption
                                    {
                                        QuizQuestionId = questionEntity.QuizQuestionId,
                                        Option = quizQuestion.Options[i],
                                        IsCorrect = quizQuestion.CorrectOptions.Contains(quizQuestion.Options[i]),
                                        CreatedAt = DateTime.UtcNow,
                                        CreatedBy = "Admin",
                                        ModifiedBy = "Admin2"
                                    };

                                    optionEntities.Add(optionEntity);
                                }
                            }

                            // Save options to the repository
                            _bulkQuestionRepository.AddOptions(optionEntities, questionEntity.QuizQuestionId);
                        }

                        return quizQuestions;
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while importing quiz data: {ex.Message}", ex);
            }
        }

        private string[] ExtractOptions(ExcelWorksheet worksheet, int row, int startColumn, int count)
        {
            string[] options = new string[count];
            for (int i = 0; i < count; i++)
            {
                string option = worksheet.Cells[row, startColumn + i].Value?.ToString() ?? "";
                options[i] = option;
            }
            return options;
        }
    }
}