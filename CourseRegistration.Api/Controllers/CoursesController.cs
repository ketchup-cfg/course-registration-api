using Microsoft.AspNetCore.Mvc;
using CourseRegistration.Api.Data.Models;
using CourseRegistration.Api.Services;

namespace CourseRegistration.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _service;

        public CoursesController(ICourseService service)
        {
            _service = service;
        }

        // GET: api/Courses
        [HttpGet]
        public ActionResult<IEnumerable<Course?>> GetCourses()
        {
            return _service.GetAllCourses().ToList();
        }

        // GET: api/Courses/5
        [HttpGet("{id:long}")]
        public async Task<ActionResult<Course>> GetCourse(long id)
        {
            var course = await _service.GetCourse(id);

            if (course == null)
            {
                return NotFound();
            }

            return course;
        }

        // PUT: api/Courses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id:long}")]
        public IActionResult PutCourse(long id, Course course)
        {
            if (id != course.Id)
            {
                return BadRequest();
            }

            _service.UpdateCourse(course);

            return NoContent();
        }

        // POST: api/Courses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Course>> PostCourse(Course course)
        {
            var newCourse = await _service.CreateCourse(course);

            return CreatedAtAction("GetCourse", new { id = newCourse.Id }, newCourse);
        }

        // DELETE: api/Courses/5
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> DeleteCourse(long id)
        {
            var course = await _service.GetCourse(id);
            if (course == null)
            {
                return NotFound();
            }

            await _service.DeleteCourse(course.Id);

            return NoContent();
        }
    }
}
