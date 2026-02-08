namespace LXP.Data.Repository;

using LXP.Common.Entities;
using LXP.Data.IRepository;

public class ForgetRepository(LXPDbContext dbcontext) : IForgetRepository
{
    private readonly LXPDbContext _dbcontext = dbcontext;

    public bool AnyUserByEmail(string loginmodel) =>
        this._dbcontext.Learners.Any(learner => learner.Email == loginmodel);

    //public async Task<bool> AnyLearnerByEmailAndPassword(string Email, string Password)
    //{
    //    return await _dbcontext.Learners.AnyAsync(learner => learner.Email == Email && learner.Password == Password);
    //}
    public Learner GetLearnerByEmail(string Email) =>
        this._dbcontext.Learners.FirstOrDefault(learner => learner.Email == Email);

    public void UpdateLearnerPassword(string Email, string Password)
    {
        var learner = this.GetLearnerByEmail(Email);
        learner.Password = Password;
        this._dbcontext.Learners.Update(learner);
        this._dbcontext.SaveChangesAsync();
    }

    //public async Task UpdatePassword(Learner learner)
    //{
    //    _dbcontext.Learners.Update(learner);

    //    await _dbcontext.SaveChangesAsync();
    //}



    //public async Task<Learner> LearnerByEmailAndPassword(string Email, string Password)

    //{
    //    return await _dbcontext.Learners.FirstOrDefaultAsync(learner => learner.Email == Email && learner.Password == Password);
    //}
}
