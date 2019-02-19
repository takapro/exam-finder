import React from 'react';
import { Exam, CourseExam, makeCourseExams } from './Schedule';

const ShceduleTableHead = () => {
  return (
    <thead>
      <tr>
        <th>COURSE</th>
        <th>SECTION</th>
        <th>INSTRUCTOR</th>
        <th>DATE</th>
        <th>TIME</th>
        <th>BLDG</th>
        <th>ROOM</th>
      </tr>
    </thead>
  );
};

const ShceduleTableBody = (props: { courseExams: CourseExam[] }) => {
  return (
    <tbody>
      {props.courseExams.flatMap(courseExam =>
        courseExam.exams.map((exam, index) =>
          <tr key={exam.course + '-' + exam.section}>
            {index == 0 && <td rowSpan={courseExam.exams.length}>{exam.course}</td>}
            <td>{exam.section}</td>
            <td>{exam.instructor}</td>
            <td>{exam.date}</td>
            <td>{exam.start_time} - {exam.end_time}</td>
            <td>{exam.building}</td>
            <td>{exam.room}</td>
          </tr>
        )
      )}
    </tbody>
  );
};

const ShceduleTable = (props: { exams: Exam[] }) => {
  const courseExams = makeCourseExams(props.exams);
  return (
    <table id='schedule'>
      <ShceduleTableHead />
      <ShceduleTableBody courseExams={courseExams} />
    </table>
  );
};

export default ShceduleTable;
