import { Injectable } from '@nestjs/common';
import { Course } from './course.interface';

@Injectable()
export class CoursesService {
  private readonly courses: Course[] = [];

  create(course: Course) {
    this.courses.push(course);
  }

  findAll(): Course[] {
    return this.courses;
  }

  findById(id: number): Course | undefined {
    return this.courses.find((c) => c.id === id);
  }

  getNextId(): number {
    const ids = this.courses.map((c) => c.id);

    return Math.max(...ids) + 1;
  }
}
