import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';

interface Course {
  id: number;
  subjectCode: string;
  courseNumber: string;
  description: string;
}

const courses = [
  {
    id: 1,
    subjectCode: 'ENGL',
    courseNumber: '101',
    description: 'A test ENGL 101 course',
  },
  {
    id: 2,
    subjectCode: 'MATH',
    courseNumber: '201',
    description: 'A test MATH 201 course',
  },
];

@Controller('courses')
export class CoursesController {
  @Get()
  findAll(): Course[] {
    return courses;
  }

  @Get(':id')
  find(@Param() params: any, @Res() response: Response): void {
    const course = courses.find((c) => c.id === Number(params.id));

    if (!course) {
      response.status(404).send(`No course found matching id of ${params.id}`);
    } else {
      response.json(course);
    }
  }
}
