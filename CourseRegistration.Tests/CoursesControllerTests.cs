using CourseRegistration.Api.Controllers;
using CourseRegistration.Api.Data.Models;
using CourseRegistration.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;

namespace CourseRegistration.Tests;

public class CoursesControllerTests
{
    private readonly List<Course> _courses =
    [
        new()
        {
            Id = 1,
            Subject = "HIST",
            CourseNumber = "101",
            Description = "Just a test HIST 101 course",
        },
        new()
        {
            Id = 2,
            Subject = "MATH",
            CourseNumber = "102",
            Description = "Just a test MATH 102 course",
        },
        new()
        {
            Id = 3,
            Subject = "COMP",
            CourseNumber = "201",
            Description = "Just a test COMP 201 course",
        }
    ];

    [Fact]
    public void GetCourses_WithExistingCourses_ReturnsOk()
    {
        // Arrange
        var mockService = new MockCourseService(_courses);
        var controller = new CoursesController(mockService);

        // Act
        var result = controller.GetCourses();

        // Assert
        Assert.IsType<OkObjectResult>(result.Result);
    }
}