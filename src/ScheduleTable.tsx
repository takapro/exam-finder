import React from 'react';
import { Exam, CourseExam, makeCourseExams } from './Schedule';

const scheduleTableSchema = [
  { name: 'SECTION', key: 'section' },
  { name: 'INSTRUCTOR', key: 'instructor' },
  { name: 'DATE', key: 'date' },
  { name: 'TIME', key: 'start_time', key2: 'end_time' },
  { name: 'BLDG', key: 'building' },
  { name: 'ROOM', key: 'room' }
];

const ShceduleTableHead = () => {
  return (
    <thead>
      <tr>
        <th>COURSE</th>
        {scheduleTableSchema.map(each => <th key={each.key}>{each.name}</th>)}
      </tr>
    </thead>
  );
};

const shceduleTableCell = (exam: any, key: string, key2: string | undefined) => {
  const del = exam['del_' + key];
  if (key2) {
    const del2 = exam['del_' + key2];
    return <td key={key}>{del && del2 && <><del>{del} - {del2}</del><br /></>}{exam[key]} - {exam[key2]}</td>;
  } else {
    return <td key={key}>{del && <><del>{del}</del><br /></>}{exam[key]}</td>;
  }
}

const ShceduleTableBody = (props: { courseExams: CourseExam[] }) => {
  return (
    <tbody>
      {props.courseExams.flatMap(courseExam =>
        courseExam.exams.map((exam, index) =>
          <tr key={exam.course + '-' + exam.section}>
            {index === 0 && <td rowSpan={courseExam.exams.length}>{exam.course}</td>}
            {scheduleTableSchema.map(each => shceduleTableCell(exam, each.key, each.key2))}
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
