using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LXP.Common.DTO
{
    public class BulkQuestionDto
    {

        public Guid QuizId { get; set; }
        public int QuestionNo { get; set; }
        public string Question { get; set; } = null!;
        public string QuestionType { get; set; } = null!;
        public string CreatedBy { get; set; } = null!;

        public string? ModifiedBy { get; set; }

    }
}
