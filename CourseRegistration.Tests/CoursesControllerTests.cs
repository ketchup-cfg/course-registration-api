using CourseRegistration.Api.Controllers;
using CourseRegistration.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;

namespace CourseRegistration.Tests;

public class CoursesControllerTests
{
    [Fact]
    public void GetCourses_WithExistingCourses_ReturnsOk()
    {
        // Arrange
        var mockService = new MockCourseService();
        var controller = new CoursesController(mockService);
        
        // Act
        var result = controller.GetCourses();
        
        // Assert
        Assert.IsType<OkObjectResult>(result.Result);
    }
}