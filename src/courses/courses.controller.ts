import { Controller, Get } from '@nestjs/common';

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
}
