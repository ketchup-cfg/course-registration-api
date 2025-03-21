using CourseRegistration.Api.Data;
using CourseRegistration.Api.Data.Models;
using CourseRegistration.Api.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace CourseRegistration.Api.Services;

public class CourseService : ICourseService
{
    private readonly CourseRegistrationContext _context;

    public CourseService(CourseRegistrationContext context)
    {
        _context = context;
    }

    public IEnumerable<Course?> GetAllCourses()
    {
        return _context.Courses
            .AsNoTracking()
            .ToList();
    }

    public async Task<Course?> GetCourse(long id)
    {
        return await _context.Courses
            .AsNoTracking()
            .SingleOrDefaultAsync(c => c.Id == id);
    }

    private async Task<Course?> GetCourseForUpdate(long id)
    {
        return await _context.Courses
            .SingleOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Course> CreateCourse(Course course)
    {
        await _context.AddAsync(course);
        
        return course;
    }

    public Course UpdateCourse(Course course)
    {
        _context.Update(course);

        return course;
    }

    public async Task DeleteCourse(long id)
    {
        var course = await GetCourseForUpdate(id);

        if (course is null) throw new CourseDoesNotExistException();

        _context.Remove(course);
    }
}