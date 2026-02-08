namespace LXP.Core.Services;

using LXP.Common.Entities;
using LXP.Common.ViewModels;
using LXP.Core.IServices;
using LXP.Data.IRepository;

public class LearnerProgressService(
    ILearnerProgressRepository learnerProgressRepository,
    IMaterialRepository materialRepository,
    ICourseTopicRepository courseTopicRepository,
    IEnrollmentRepository enrollmentRepository,
    ICourseRepository courseRepository
) : ILearnerProgressService
{
    private readonly ILearnerProgressRepository _learnerProgressRepository =
        learnerProgressRepository;
    private readonly IMaterialRepository _materialRepository = materialRepository;
    private readonly ICourseTopicRepository _courseTopicRepository = courseTopicRepository;

    private readonly IEnrollmentRepository _enrollmentRepository = enrollmentRepository;
    private readonly ICourseRepository _courseRepository = courseRepository;

    public async Task<bool> LearnerProgress(ProgressViewModel learnerProgress)
    {
        var material = await this._materialRepository.GetMaterialById(learnerProgress.MaterialId);
        var topic = await this._courseTopicRepository.GetTopicByTopicId(material.TopicId);
        var course = this._courseRepository.GetCourseDetailsByCourseId(topic.CourseId);
        var learnerProgressViewModel = new LearnerProgressViewModel()
        {
            MaterialId = material.MaterialId,
            TopicId = topic.TopicId,
            CourseId = course.CourseId,
            WatchTime = learnerProgress.WatchTime,
            LearnerId = learnerProgress.LearnerId
        };
        if (
            !await this._learnerProgressRepository.AnyLearnerProgressByLearnerIdAndMaterialId(
                learnerProgress.LearnerId,
                material.MaterialId
            )
        )
        {
            return await this.Progress(learnerProgressViewModel);
        }
        return await this.UpdateProgress(
            learnerProgress.LearnerId,
            material.MaterialId,
            learnerProgress.WatchTime
        );
    }

    public async Task<LearnerProgress> GetLearnerProgressByLearnerIdAndMaterialId(
        string LearnerId,
        string MaterialId
    ) =>
        await this._learnerProgressRepository.GetLearnerProgressByLearnerIdAndMaterialId(
            Guid.Parse(LearnerId),
            Guid.Parse(MaterialId)
        );

    public async Task<bool> Progress(LearnerProgressViewModel learnerProgress)
    {
        var material = await this._materialRepository.GetMaterialById(learnerProgress.MaterialId);
        var totalCoursetime = await this.CourseTotalTime(learnerProgress.CourseId);
        var Coursehours = (int)totalCoursetime;
        var CourseMinutes = (int)((totalCoursetime - Coursehours) * 60);
        var CourseDuration = new TimeOnly(Coursehours, CourseMinutes);
        var totalCourseWatchtime = await this.CourseWatchTime(
            learnerProgress.CourseId,
            learnerProgress.LearnerId
        );
        var CourseWatchhours = (int)totalCourseWatchtime;
        var CourseWatchMinutes = (int)((totalCourseWatchtime - CourseWatchhours) * 60);
        var CourseWatchDuration = new TimeOnly(CourseWatchhours, CourseWatchMinutes);
        var progress = new LearnerProgress()
        {
            LearnerProgressId = new Guid(),
            CourseId = learnerProgress.CourseId,
            TopicId = learnerProgress.TopicId,
            MaterialId = learnerProgress.MaterialId,
            LearnerId = learnerProgress.LearnerId,
            WatchTime = learnerProgress.WatchTime,
            TotalTime = CourseDuration,
            IsWatched = 0,
            CourseWatchtime = CourseWatchDuration
        };
        await this._learnerProgressRepository.LearnerProgress(progress);
        return true;
    }

    public async Task<bool> materialCompletion(Guid learnerId, Guid materialId)
    {
        var learnerProgress = await this._learnerProgressRepository.GetLearnerProgressById(
            learnerId,
            materialId
        );
        var totalCourseWatchtime = await this.CourseWatchTime(
            learnerProgress.CourseId,
            learnerProgress.LearnerId
        );
        var CourseWatchhours = (int)totalCourseWatchtime;
        var CourseWatchMinutes = (int)((totalCourseWatchtime - CourseWatchhours) * 60);
        var CourseWatchDuration = new TimeOnly(CourseWatchhours, CourseWatchMinutes);
        if (learnerProgress.CourseWatchtime == learnerProgress.TotalTime)
        {
            learnerProgress.IsWatched = 1;
        }
        else
        {
            learnerProgress.CourseWatchtime = CourseWatchDuration;
            if (learnerProgress.CourseWatchtime == learnerProgress.TotalTime)
            {
                learnerProgress.IsWatched = 1;
            }
        }
        this._learnerProgressRepository.UpdateLearnerProgress(learnerProgress);
        return true;
    }

    public async Task<bool> UpdateProgress(Guid learnerId, Guid materialId, TimeOnly watchtime)
    {
        var learnermaterial = await this._learnerProgressRepository.GetLearnerProgressByMaterialId(
            learnerId,
            materialId
        );
        learnermaterial.WatchTime = watchtime;
        this._learnerProgressRepository.UpdateLearnerProgress(learnermaterial);
        await this.materialCompletion(learnerId, learnermaterial.CourseId);
        return true;
    }

    public async Task<double> TopicTotalTime(Guid topicId)
    {
        var material = await this._materialRepository.GetMaterialsByTopic(topicId);
        var totalDuration = material.Sum(m => m.Duration.ToTimeSpan().TotalHours);
        return totalDuration;
    }

    public async Task<double> CourseTotalTime(Guid courseId)
    {
        var topic = await this._courseTopicRepository.GetTopicsbycouresId(courseId);
        double courseTotalDuration = 0;
        foreach (var topics in topic)
        {
            var topicId = topics.TopicId;
            var topicDuration = await this.TopicTotalTime(topicId);
            courseTotalDuration += topicDuration;
        }
        return courseTotalDuration;
    }

    public async Task<double> CourseWatchTime(Guid courseId, Guid learnerId)
    {
        var topic = await this._courseTopicRepository.GetTopicsbyLearnerId(courseId, learnerId);
        double courseWatchDuration = 0;
        courseWatchDuration = topic.Sum(x => x.WatchTime.ToTimeSpan().TotalHours);
        //Console.WriteLine(courseWatchDuration);
        return courseWatchDuration;
    }

    //public async Task<double> materialCompletionPercentage(Guid learnerId, Guid courseId)
    //{
    //    var learnerProgress = await _learnerProgressRepository.GetLearnerProgressById(learnerId, courseId);
    //    TimeSpan timeSpan_total = learnerProgress.TotalTime.ToTimeSpan();
    //    double totaltime = timeSpan_total.TotalHours;

    //    TimeSpan timeSpan_watch = learnerProgress.CourseWatchtime.ToTimeSpan();
    //    double watchtime = timeSpan_watch.TotalHours;

    //    double percentage = (watchtime / totaltime) * 100;
    //    return percentage;


    //}


    public async Task<double> TopicWatchTime(Guid topicId, Guid learnerId)
    {
        var materials = await this._learnerProgressRepository.GetMaterialByTopic(
            topicId,
            learnerId
        );
        Console.WriteLine(materials);
        double watchDuration = 0;
        foreach (var material in materials)
        {
            var materialId = material.MaterialId;
            var materialdetail =
                await this._learnerProgressRepository.GetLearnerProgressByMaterialId(
                    learnerId,
                    materialId
                );
            var duration = materialdetail.WatchTime.ToTimeSpan().TotalHours;
            watchDuration += duration;
        }
        Console.WriteLine(watchDuration);
        return watchDuration;
    }

    //public async  Task<LearnerProgressViewModel> GetProgressById(Guid learnerProgressId)
    // {
    //    LearnerProgressViewModel  progress = await _learnerProgressRepository.GetLearnerProgressById(learnerProgressId);
    //     return progress;
    // }

    //public async Task CalculateAndUpdateCourseCompletionAsync(Guid learnerId)
    //{
    //    await _learnerProgressRepository.CalculateAndUpdateCourseCompletionAsync(learnerId);
    //}

    //public async Task<decimal?> GetCourseCompletionPercentageAsync(
    //    Guid learnerId,
    //    Guid enrollmentId
    //)
    //{
    //    await _learnerProgressRepository.CalculateAndUpdateCourseCompletionAsync(learnerId);
    //    var enrollment = await _learnerProgressRepository.GetEnrollmentByIdAsync(
    //        learnerId,
    //        enrollmentId
    //    );
    //    return enrollment?.CourseCompletionPercentage;
    //}

    public async Task<(
        decimal? CourseCompletionPercentage,
        Guid? CourseId
    )> GetCourseCompletionAndCourseIdAsync(Guid learnerId, Guid enrollmentId)
    {
        await this._learnerProgressRepository.CalculateAndUpdateCourseCompletionAsync(learnerId);
        var enrollment = await this._learnerProgressRepository.GetEnrollmentByIdAsync(
            learnerId,
            enrollmentId
        );
        return (enrollment?.CourseCompletionPercentage, enrollment?.CourseId);
    }

    public async Task<double> CalculateMaterialProgressAsync(Guid materialId, Guid learnerId)
    {
        var material1 = await this._materialRepository.GetMaterialById(materialId);
        var learnerProgress = await this._learnerProgressRepository.GetLearnerMaterialProgressAsync(
            materialId,
            learnerId
        );

        //if (material == null || learnerProgress == null)
        //{
        //    return 0.0;
        //}

        var materialDuration = material1.Duration.ToTimeSpan();
        var watchTime = learnerProgress.WatchTime.ToTimeSpan();

        //if (materialDuration.TotalSeconds == 0)
        //{
        //    return 0.0;
        //}

        if (material1.Duration == learnerProgress.WatchTime)
        {
            learnerProgress.IsWatched = 1;
            await this._learnerProgressRepository.Changewatchtime(learnerProgress);
        }

        return watchTime.TotalSeconds / materialDuration.TotalSeconds * 100;
    }

    //public async Task<(decimal CombinedProgress, Guid? CourseId)> CalculateCombinedProgressAsync(Guid learnerId, Guid enrollmentId, Guid materialId)
    //{
    //    // Calculate course completion percentage and get course ID
    //    await _learnerProgressRepository.CalculateAndUpdateCourseCompletionAsync(learnerId);
    //    var enrollment = await _learnerProgressRepository.GetEnrollmentByIdAsync(learnerId, enrollmentId);
    //    var courseCompletionPercentage = enrollment?.CourseCompletionPercentage ?? 0m; // Default to 0 if null
    //    var courseId = enrollment?.CourseId;

    //    // Calculate material progress
    //    var material = await _materialRepository.GetMaterialById(materialId);
    //    var learnerProgress = await _learnerProgressRepository.GetLearnerMaterialProgressAsync(materialId, learnerId);
    //    var materialDuration = material.Duration.ToTimeSpan();
    //    var watchTime = learnerProgress.WatchTime.ToTimeSpan();



    //    // Calculate combined progress (adjust the weighting as needed)
    //    decimal materialProgress = materialDuration.TotalSeconds > 0
    //        ? (decimal)watchTime.TotalSeconds / (decimal)materialDuration.TotalSeconds * 100m
    //        : 0m;


    //    decimal combinedProgress = (70m * courseCompletionPercentage + 30m * materialProgress) / 100m;

    //    // Round to 2 decimal places
    //    combinedProgress = Math.Round(combinedProgress, 2);

    //    if (material.Duration == learnerProgress.WatchTime)
    //    {

    //        learnerProgress.IsWatched = 1;
    //        await _learnerProgressRepository.Changewatchtime(learnerProgress);




    //    }

    //    return (combinedProgress, courseId);


    //}
}
