import { Controller, Get, Post, Res, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import { CreateCourseDto } from './create-course.dto';
import { Course } from './course.dto';

const courses: Course[] = [];
const subjects = ['ENGL', 'MATH', 'HIST'];

function setupTestCourses() {
  for (let i = 1; i < 6; i++) {
    const course = new Course();
    course.id = i;
    course.subjectCode = subjects[Math.floor(Math.random() * subjects.length)];
    course.courseNumber = `10${i}`;
    course.description = `A test ${course.subjectCode} ${course.courseNumber} course`;

    courses.push(course);
  }
}

setupTestCourses();

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(): Course[] {
    return courses;
  }

  @Get(':id')
  find(@Param('id') id: string, @Res() response: Response): void {
    const course = courses.find((c) => c.id === Number(id));

    if (!course) {
      response.status(404).send(`No course found matching id of ${id}`);
    } else {
      response.json(course);
    }
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    courses.push({
      id: Math.max(...courses.map((c) => c.id)) + 1,
      subjectCode: createCourseDto.subjectCode,
      courseNumber: createCourseDto.courseNumber,
      description: createCourseDto.description,
    });
  }
}
