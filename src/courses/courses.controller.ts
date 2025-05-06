import { Controller, Get, Post, Res, Param, Body } from '@nestjs/common';
import { Response } from 'express';
import { CreateCourseDto } from './create-course.dto';
import { Course } from './course.interface';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  findAll(): Course[] {
    return this.coursesService.findAll();
  }

  @Get(':id')
  find(@Param('id') id: string, @Res() response: Response): void {
    const course = this.coursesService.findById(Number(id));

    if (!course) {
      response.status(404).send(`No course found matching id of ${id}`);
    } else {
      response.json(course);
    }
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    this.coursesService.create({
      id: this.coursesService.getNextId(),
      subjectCode: createCourseDto.subjectCode,
      courseNumber: createCourseDto.courseNumber,
      description: createCourseDto.description,
    });
  }
}
