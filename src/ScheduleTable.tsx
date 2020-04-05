import React from 'react';
import { Exam, CourseExam, makeCourseExams } from './Schedule';

const scheduleTableSchema = [
  { name: 'Course', key: 'section', span: 2 },
  { name: 'Instructor', key: 'instructor' },
  { name: 'Date', key: 'date' },
  { name: 'Time', key: 'start_time', key2: 'end_time' },
  { name: 'Bldg', key: 'building' },
  { name: 'Room', key: 'room' }
];

const scheduleTableHead = (): JSX.Element => {
  return (
    <thead>
      <tr>
        {scheduleTableSchema.map(each => <th key={each.key} colSpan={each.span}>{each.name}</th>)}
        <td className='margin'></td>
      </tr>
    </thead>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const scheduleTableCell = (exam: any, key: string, key2: string | undefined): JSX.Element => {
  let val = exam[key];
  let del = exam['del_' + key];
  if (key === 'date') {
    val = val.replace(/, \d+$/, '');
    if (del) {
      del = del.replace(/, \d+$/, '');
    }
  } else if (key2) {
    const val2 = exam[key2];
    const del2 = exam['del_' + key2];
    val += ' - ' + val2;
    if (del || del2) {
      del = (del || val) + ' - ' + (del2 || val2);
    }
  }
  if (exam.deleted) {
    del = val;
    val = undefined;
  }
  return (
    <td key={key} className={key}>
      {del && <del>{del}</del>}
      {del && val && <br />}
      {val}
    </td>
  );
};

const scheduleTableBody = (courseExams: CourseExam[]): JSX.Element => {
  return (
    <tbody>
      {courseExams.flatMap(courseExam =>
        courseExam.exams.map((exam, index) =>
          <tr key={exam.course + '-' + exam.section}>
            {index === 0 && <td rowSpan={courseExam.exams.length}>{exam.course}</td>}
            {scheduleTableSchema.map(each => scheduleTableCell(exam, each.key, each.key2))}
          </tr>
        )
      )}
    </tbody>
  );
};

const ScheduleTable: React.FC<{ hidden: boolean, exams: Exam[] }> = ({ hidden, exams }) => {
  const courseExams = makeCourseExams(exams);
  return (
    <table id='schedule' className={hidden ? 'hidden' : ''}>
      {scheduleTableHead()}
      {scheduleTableBody(courseExams)}
    </table>
  );
};

export default ScheduleTable;
