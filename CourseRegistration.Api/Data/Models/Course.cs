namespace CourseRegistration.Api.Data.Models;

public class Course
{
    public long Id { get; set; }
    public string CourseNumber { get; set; } = "";
    public string Subject { get; set; } = "";
    public string Description { get; set; } = "";
}