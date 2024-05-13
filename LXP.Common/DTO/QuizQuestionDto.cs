﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LXP.Common.DTO
{
   
    public class QuizQuestionDto
    {
       // public Guid QuizQuestionId { get; set; } = new Guid();
        public Guid QuizId { get; set; }
        public int QuestionNo { get; set; }
        public string Question { get; set; } = null!;
        public string QuestionType { get; set; } = null!;
       // public string CreatedBy { get; set; } = null!;
       // public DateTime CreatedAt { get; set; }
       // public string? ModifiedBy { get; set; }
       // public DateTime? ModifiedAt { get; set; }
        public List<QuestionOptionDto> Options { get; set; } = new List<QuestionOptionDto>();
    }
}

//using LXP.Common.DTO;

//public class QuizQuestionDto
//{
//    public Guid QuizQuestionId { get; set; }
//    public Guid QuizId { get; set; }
//    public int QuestionNo { get; set; }
//    public string Question { get; set; } = null!;
//    public string QuestionType { get; set; } = null!;
//    public string CreatedBy { get; set; } = null!;
//    public DateTime CreatedAt { get; set; }
//    public string? ModifiedBy { get; set; }
//    public DateTime? ModifiedAt { get; set; }
//    public IEnumerable<QuestionOptionDto> Options { get; set; } 
//}
 //public class QuizQuestionDto
    //{
    //    public Guid QuizQuestionId { get; set; } = Guid.NewGuid();
    //    public Guid QuizId { get; set; }
    //    public int QuestionNo { get; set; }
    //    public string Question { get; set; } = null!;
    //    public string QuestionType { get; set; } = null!;
    //    public string CreatedBy { get; set; } = null!;
    //    public DateTime CreatedAt { get; set; }
    //    public string? ModifiedBy { get; set; }
    //    public DateTime? ModifiedAt { get; set; }
    //}