import type { Client } from "pg";

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
