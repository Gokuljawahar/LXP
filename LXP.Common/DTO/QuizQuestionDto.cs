using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LXP.Common.DTO
{
   
    public class QuizQuestionDto
    {
        public Guid QuizId { get; set; }
        public string Question { get; set; } = null!;
        public string QuestionType { get; set; } = null!;

        public string[]? Options { get; set; }
    }
}

