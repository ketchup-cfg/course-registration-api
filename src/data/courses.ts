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
  return client
    .query(
      `INSERT INTO courses (
         course_number,
         subject_code,
         description
       ) VALUES (
         $1,
         $2,
         $3
       )`,
      [course.courseNumber, course.subjectCode, course.description]
    )
    .then(() => {})
    .catch((err) => {
      console.error("Unable to insert course: ", err);
    });
}
