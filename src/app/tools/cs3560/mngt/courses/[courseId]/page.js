// Reuse student list and team list components from the students page
// However, these two should not show the full list of students and teams
// But instead they should have a button to
// 1. Add student.
// 2. Import Students.
// 3. Add team.
// 4. View all students
// 5. View all teams.

export default function Page({ params }) {
  return <div>My Course: {params.courseId}</div>;
}
