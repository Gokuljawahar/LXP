namespace LXP.Api.Controllers;

using System.Collections;
using System.Collections.Concurrent;
using System.Net;
using System.Net.Mail;
using LXP.Common.Constants;
using LXP.Common.ViewModels;
using LXP.Core.IServices;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class RegistrationController(
    ILearnerService learnerServices,
    IProfileService profileService,
    IPasswordHistoryService passwordHistoryService
) : BaseController
{
    private readonly ILearnerService _learnerServices = learnerServices;
    private readonly IProfileService _profileService = profileService;
    private readonly IPasswordHistoryService _passwordHistoryService = passwordHistoryService;
    private static DateTime _currentTIme; //Raj
    public readonly Hashtable _otpTable = [];
    private static readonly ConcurrentDictionary<string, string> emailOtpMap = new(); //Raj

    ///<summary>
    ///Post the learner and profile details
    ///</summary>
    ///
    [HttpPost("/lxp/learner/registration")]
    public async Task<IActionResult> Registration([FromBody] RegisterUserViewModel learner)
    {
        var learnerservices = await this._learnerServices.LearnerRegistration(learner);
        if (learnerservices)
        {
            return this.Ok(
                this.CreateSuccessResponse(MessageConstants.MsgLearnerRegistrationSuccess)
            );
        }
        else
        {
            return this.Ok(
                this.CreateFailureResponse(MessageConstants.MsgLearnerAlreadyExists, 400)
            );
        }
    }

    ///<summary>
    ///Fetch all the learner details
    ///</summary>
    ///
    [HttpGet("/lxp/view/learner")]
    public async Task<IActionResult> GetAllCategory()
    {
        var categories = await this._learnerServices.GetAllLearner();
        return this.Ok(this.CreateSuccessResponse(categories));
    }

    ///<summary>
    ///Fetch all the learner profle details
    ///</summary>
    [HttpGet("/lxp/view/learnerProfile")]
    public async Task<IActionResult> GetAllLearnerProfile()
    {
        var LearnerProfileone = await this._profileService.GetAllLearnerProfile();
        return this.Ok(this.CreateSuccessResponse(LearnerProfileone));
    }

    ///<summary>
    ///Fetching particular Learner profile details using Id
    ///</summary>
    [HttpGet("/lxp/view/learnerProfile/{id}")]
    public async Task<IActionResult> GetLearnerProfileById(string id)
    {
        var LearnerProfileone = this._profileService.GetLearnerProfileById(id);
        return this.Ok(this.CreateSuccessResponse(LearnerProfileone));
    }

    ///<summary>
    ///Fetching particular Learner details using Learner Id
    ///</summary>
    [HttpGet("/lxp/view/learner/{id}")]
    public async Task<IActionResult> GetLearnerById(string id)
    {
        var LearnerProfileone = this._learnerServices.GetLearnerById(id);
        return this.Ok(this.CreateSuccessResponse(LearnerProfileone));
    }

    //Raj   Controller

    ///<summary>
    ///Generating email to the repected mail they entered
    ///</summary>
    [HttpPost("EmailVerification")]
    public IActionResult GenerateOTP([FromQuery] string email)
    {
        // Generate a random OTP
        string[] saAllowedCharacters = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        var sOTP = "";
        var rand = new Random();

        for (var i = 0; i < 6; i++)
        {
            var p = rand.Next(0, saAllowedCharacters.Length);
            sOTP += saAllowedCharacters[p];
        }

        // Store the OTP data in the Hashtable
        //var otpData = new OtpData
        //{
        //    Otp = sOTP,
        //    Timestamp = DateTime.Now,
        //    Email = email
        //};
        emailOtpMap[email] = sOTP;

        // Configure email settings
        var sender = "rajkumarprofo@gmail.com"; // Replace with your Gmail address
        var senderPass = "mdjc ubpu wnse bjno"; // Replace with your Gmail password
        var subject = "LXP Email Verification";
        var body = $"The OTP to Verify Your Email is: {sOTP}";

        // Create and send the email
        using (var mail = new MailMessage(sender, email))
        {
            mail.Subject = subject;
            mail.Body = body;

            using (var smtpClient = new SmtpClient("smtp.gmail.com"))
            {
                smtpClient.Port = 587;
                smtpClient.Credentials = new NetworkCredential(sender, senderPass);
                smtpClient.EnableSsl = true;

                try
                {
                    smtpClient.Send(mail);
                    _currentTIme = DateTime.Now;
                    Console.WriteLine("Email Sent Successfully");
                }
                catch (Exception e)
                {
                    Console.WriteLine($"Error sending email: {e.Message}");
                }
            }
        }

        return this.Ok(emailOtpMap);
    }

    //[HttpGet("VerifyOTP")]
    //public IActionResult VerifyOTP([FromQuery] string email, [FromQuery] string userOTP)
    //{
    //    return Ok(emailOtpMap[email]);
    //    if (emailOtpMap.ContainsKey(email))
    //    {
    //        var otpData = emailOtpMap[email];
    //        //var storedTimestamp = otpData.Timestamp;
    //        //var currentTimestamp = DateTime.Now;

    //        // Check if the OTP is still valid (within 2 minutes)
    //        //var timeDifference = currentTimestamp - storedTimestamp;

    //        if (otpData == userOTP) {
    //            Console.WriteLine($"OTP verified successfully for email: {email}");
    //            return Ok("OTP verified successfully!");
    //        }
    //        //if (timeDifference.TotalMinutes <= 2 && otpData.Otp == userOTP)
    //        //{
    //        //    // Valid OTP
    //        //    /*_otpTable.Remove(email);*/ // Remove the used OTP data
    //        //    Console.WriteLine($"OTP verified successfully for email: {email}");
    //        //    return Ok("OTP verified successfully!");
    //        //}
    //        else
    //        {
    //            // Expired or invalid OTP
    //            Console.WriteLine($"Invalid OTP provided or OTP has expired for email: {email}");
    //            return BadRequest("Invalid OTP provided or OTP has expired.");
    //        }
    //    }
    //    else
    //    {
    //        // OTP data not found for the provided email
    //        Console.WriteLine($"No OTP data found for the provided email: {email}");
    //        return BadRequest("No OTP data found for the provided email.");
    //    }
    //}

    private static DateTime UnixTimeStampToDateTime(double unixTimeStamp)
    {
        // Unix timestamp is seconds past epoch
        var epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        return epoch.AddSeconds(unixTimeStamp).ToLocalTime();
    }

    ///<summary>
    ///verifying the OTP by entering the email Id
    ///</summary>
    [HttpGet("VerifyOTP")]
    public IActionResult VerifyOTP([FromQuery] string email, [FromQuery] string userOTP)
    {
        //return Ok(emailOtpMap["rajkumar08102001@gmail.com"]);
        if (emailOtpMap.TryGetValue(email, out var value))
        {
            var otpData = value;
            var storedTimestamp = _currentTIme;
            var currentTimestamp = DateTime.Now;
            // Check if the OTP is still valid (within 2 minutes)
            var timeDifference = currentTimestamp - storedTimestamp;

            //if (otpData == userOTP)
            //{
            //    Console.WriteLine($"OTP verified successfully for email: {email}");
            //    return Ok("OTP verified successfully!");
            //
            var num = timeDifference.TotalMinutes;
            if (timeDifference.TotalMinutes < 2)
            {
                if (otpData == userOTP)
                {
                    emailOtpMap.Remove(email, out var removeEmail);
                    Console.WriteLine($"OTP verified successfully for email: {email}");

                    return this.Ok("OTP verified successfully!");
                }
                else
                {
                    // Expired or invalid OTP
                    Console.WriteLine($"Invalid OTP provided for email: {email}");
                    return this.BadRequest("Invalid OTP provided.");
                }
            }
            else
            {
                // Expired or invalid OTP
                emailOtpMap.Remove(email, out var removeEmail);
                Console.WriteLine($"OTP has expired for email: {email}");
                return this.BadRequest("OTP has expired.");
            }
        }
        else
        {
            // OTP data not found for the provided email
            Console.WriteLine($"No OTP data found for the provided email: {email}");
            return this.BadRequest("No OTP data found for the provided email.");
        }
    }

    //[HttpGet("VerifyOTP")]
    //public IActionResult VerifyOTP([FromQuery] string email, [FromQuery] string userOTP)
    //{
    //    if (_otpTable.ContainsKey(email))
    //    {
    //        var otpData = (OtpData)_otpTable[email];
    //        var storedTimestamp = otpData.Timestamp;
    //        var currentTimestamp = DateTime.Now;

    //        // Check if the OTP is still valid (within 2 minutes)
    //        var timeDifference = currentTimestamp - storedTimestamp;
    //        if (timeDifference.TotalMinutes <= 2 && otpData.Otp == userOTP)
    //        {
    //            // Valid OTP
    //            _otpTable.Remove(email); // Remove the used OTP data
    //            return Ok("OTP verified successfully!");
    //        }
    //        else
    //        {
    //            // Expired or invalid OTP
    //            return BadRequest("Invalid OTP provided or OTP has expired.");
    //        }
    //    }

    //    // OTP data not found
    //    return BadRequest("No OTP data found for the provided email.");
    //}


















    //[HttpPost("Email Verification")]
    //public IActionResult GenerateOTP([FromQuery] string email)
    //{
    //    string[] saAllowedCharacters = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" };
    //    string sOTP = String.Empty;

    //    string sTempChars = String.Empty;

    //    Random rand = new Random();

    //    for (int i = 0; i < 6; i++)

    //    {

    //        int p = rand.Next(0, saAllowedCharacters.Length);

    //        sTempChars = saAllowedCharacters[rand.Next(0, saAllowedCharacters.Length)];

    //        sOTP += sTempChars;

    //    }

    //    string sender = "rajkumarprofo@gmail.com";
    //    string senderPass = "mdjc ubpu wnse bjno";
    //    string recieve = email;

    //    MailMessage mail = new MailMessage(sender, recieve);
    //    mail.Subject = "LXP Email Verification";
    //    mail.Body = $"The OTP to Verify Your Email is: {sOTP}";

    //    SmtpClient smtpClient = new SmtpClient("smtp.gmail.com");
    //    smtpClient.Port = 587;
    //    smtpClient.Credentials = new NetworkCredential(sender, senderPass);
    //    smtpClient.EnableSsl = true;

    //    try
    //    {
    //        smtpClient.Send(mail);
    //        Console.WriteLine("Sent Successfully");
    //    }
    //    catch (Exception e)
    //    {
    //        Console.WriteLine($"Error: {e.Message}");
    //    }

    //    return Ok(new { sOTP });
    //}

    [HttpPut("/lxp/learner/updateProfile")]
    public async Task<IActionResult> UpdateProfile([FromForm] UpdateProfileViewModel model)
    {
        await this._profileService.UpdateProfile(model);

        return this.Ok(this.CreateSuccessResponse(200));
    }

    [HttpPut("/lxp/learner/updatePassword")]
    public async Task<IActionResult> UpdatePassword(
        string learnerId,
        string oldPassword,
        string newPassword
    )
    {
        var result = await this._passwordHistoryService.UpdatePassword(
            learnerId,
            oldPassword,
            newPassword
        );

        if (!result)
        {
            return this.BadRequest("Old password is incorrect");
        }

        return this.Ok("Password updated successfully");
    }

    ///<summary>
    ///Fetching particular Learner details and Profile details using Learner Id
    ///</summary>
    [HttpGet("/lxp/view/getlearner/{id}")]
    public async Task<IActionResult> LearnerGetLearnerById(string id)
    {
        var learnerWithProfile = await this._learnerServices.LearnerGetLearnerById(id);
        return this.Ok(this.CreateSuccessResponse(learnerWithProfile));
    }

    ///<summary>
    ///Get profile id by learner id Ruban
    ///</summary>
    [HttpGet("GetProfileId/{learnerId}")]
    public Guid GetProfile(Guid learnerId) => this._profileService.GetprofileId(learnerId);
}
