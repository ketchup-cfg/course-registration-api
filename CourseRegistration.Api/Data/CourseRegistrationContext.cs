using Microsoft.EntityFrameworkCore;
using CourseRegistration.Api.Data.Models;

namespace CourseRegistration.Api.Data;

public class CourseRegistrationContext(DbContextOptions<CourseRegistrationContext> options) : DbContext(options)
{
    public DbSet<Course> Courses { get; set; } = null!;
}