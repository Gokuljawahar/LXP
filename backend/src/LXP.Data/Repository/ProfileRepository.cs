

namespace LXP.Data.Repository;
using LXP.Common.Entities;
using LXP.Data.IRepository;
using Microsoft.EntityFrameworkCore;

public class ProfileRepository(LXPDbContext context) : IProfileRepository
{
    private readonly LXPDbContext _LXPDbContext = context;

    public void AddProfile(LearnerProfile learnerprofile)
    {
        this._LXPDbContext.LearnerProfiles.Add(learnerprofile);
        this._LXPDbContext.SaveChanges();
    }

    public async Task<List<LearnerProfile>> GetAllLearnerProfile() =>
        this._LXPDbContext.LearnerProfiles.ToList();

    public async Task UpdateAllLearnerProfile(LearnerProfile learnerProfile)
    {
        this._LXPDbContext.Entry(learnerProfile).State = EntityState.Modified;
        await this._LXPDbContext.SaveChangesAsync();
    }

    public LearnerProfile GetLearnerprofileDetailsByLearnerprofileId(Guid ProfileId) =>
        this._LXPDbContext.LearnerProfiles.Find(ProfileId);

    public async Task UpdateProfile(LearnerProfile learnerProfile)
    {
        this._LXPDbContext.Entry(learnerProfile).State = EntityState.Modified;
        await this._LXPDbContext.SaveChangesAsync();
    }

    public Guid GetProfileId(Guid learnerId) =>
        this
            ._LXPDbContext.LearnerProfiles.Where(x => x.LearnerId == learnerId)
            .Select(x => x.ProfileId)
            .FirstOrDefault();

    public async Task<LearnerProfile> GetProfileByLearnerId(Guid learnerId) =>
        await this._LXPDbContext.LearnerProfiles.FirstOrDefaultAsync(profile =>
            profile.LearnerId == learnerId
        );
}


//using LXP.Data.DBContexts;
//using LXP.Data.IRepository;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;
//using LXP.Common.Entities;
//using System.Runtime.InteropServices;


//namespace LXP.Data.Repository
//{
//    public class ProfileRepository : IProfileRepository
//    {
//        private readonly LXPDbContext _LXPDbContext;
//        public ProfileRepository(LXPDbContext context)
//        {
//            _LXPDbContext = context;
//        }
//        public void AddProfile(LearnerProfile learnerprofile)
//        {


//            _LXPDbContext.LearnerProfiles.Add(learnerprofile);
//            _LXPDbContext.SaveChanges();
//        }

//        public async Task<List<LearnerProfile>> GetAllLearnerProfile()
//        {
//            return _LXPDbContext.LearnerProfiles.ToList();
//        }
//        public async Task UpdateAllLearnerProfile(LearnerProfile learnerProfile)
//        {
//            _LXPDbContext.Entry(learnerProfile).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
//            await _LXPDbContext.SaveChangesAsync();
//        }



//public LearnerProfile GetLearnerprofileDetailsByLearnerprofileId(Guid ProfileId)

//        {

//            return _LXPDbContext.LearnerProfiles.Find(ProfileId);


//        }


//    }
//}
