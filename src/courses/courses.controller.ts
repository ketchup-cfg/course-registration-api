import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
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
  find(@Param('id') id: string) {
    const course = this.coursesService.findById(Number(id));

    if (!course) {
      throw new HttpException(
        `No course found matching id of ${id}`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      return course;
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
