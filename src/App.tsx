import React, { useState } from 'react';
import { parseCourses } from './Course';
import { Schedule, filterExams } from './Schedule';
import { makeInfo } from './Error';
import InputField from './InputField';
import ScheduleTable from './ScheduleTable';
import HorizontalCalendarTable from './HorizontalCalendarTable';
import VerticalCalendarTable from './VerticalCalendarTable';

declare global {
  interface Window {
    schedule: Schedule;
  }
}

const App = (): JSX.Element => {
  const [courseInput, setCourseInput] = useState('');
  const [courses, errors1] = parseCourses(courseInput);
  const [exams, errors2] = filterExams(window.schedule.exams, courses);
  const errors = (errors1.length > 0 || errors2.length > 0) ?
    errors1.concat(errors2) : [makeInfo('Enter your courses separeted by space or comma.')];
  return <>
    <h1>Exam Schedule Finder</h1>
    <h3>{window.schedule.name}</h3>
    <p>{window.schedule.asof}</p>
    <InputField label='Courses' value={courseInput} errors={errors} onChange={setCourseInput} />
    {exams.length > 0 && <ScheduleTable exams={exams} />}
    {exams.length > 0 && <HorizontalCalendarTable exams={exams} />}
    {exams.length > 0 && <VerticalCalendarTable exams={exams} />}
  </>;
};

export default App;
