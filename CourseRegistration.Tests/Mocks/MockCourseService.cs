using CourseRegistration.Api.Data.Models;
using CourseRegistration.Api.Services.Abstractions;

namespace CourseRegistration.Tests.Mocks;

public class MockCourseService : ICourseService
{
    private readonly List<Course> _courses;

    public MockCourseService(List<Course> courses)
    {
        _courses = courses;
    }

    public IEnumerable<Course?> GetAllCourses()
    {
        return _courses;
    }

    public Task<Course?> GetCourse(long id)
    {
        return Task.FromResult(_courses.SingleOrDefault(c => c.Id == id));
    }

    public Task<Course> CreateCourse(Course course)
    {
        _courses.Add(course);
        return Task.FromResult(course);
    }

    public Task<Course> UpdateCourse(Course course)
    {
        var index = _courses.FindIndex(c => c.Id == course.Id);
        _courses[index] = course;
        
        return Task.FromResult(course);
    }

    public Task DeleteCourse(long id)
    {
        return Task.FromResult(_courses.RemoveAll(c => c.Id == id));
    }
}