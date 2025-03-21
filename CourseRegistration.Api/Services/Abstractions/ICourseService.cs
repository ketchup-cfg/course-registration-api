using CourseRegistration.Api.Data.Models;

namespace CourseRegistration.Api.Services.Abstractions;

public interface ICourseService
{
    public IEnumerable<Course?> GetAllCourses();

    public Task<Course?> GetCourse(long id);

    public Task<Course> CreateCourse(Course course);

    public Task<Course> UpdateCourse(Course course);

    public Task DeleteCourse(long id);
}