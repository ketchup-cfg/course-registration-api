import type { Client } from "pg";
import type { Course } from "../../course-registration-api";

export async function getCourse(client: Client, id: number): Promise<Course> {
  const result = await client.query(`select * from courses where id = $1`, [
    id,
  ]);

  return {
    id: result.rows[0].id,
    subjectCode: result.rows[0].subject_code,
    courseNumber: result.rows[0].courseNumber,
    description: result.rows[0].description,
  };
}

export async function createCourse(
  client: Client,
  course: {
    courseNumber: string;
    subjectCode: string;
    description: string | null;
  }
) {
  try {
    await client.query(
      `insert into courses (
         course_number,
         subject_code,
         description
       ) values (
         $1,
         $2,
         $3
       )`,
      [course.courseNumber, course.subjectCode, course.description]
    );
  } catch (error) {
    console.error("Unable to insert course: ", error);
  }
}
