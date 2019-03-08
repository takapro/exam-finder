import React, { useState } from 'react';
import { parseCourseCodes } from './CourseCode';
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
  const [codes, errors1] = parseCourseCodes(courseInput);
  const [exams, errors2] = filterExams(window.schedule.exams, codes);
  const errors = (errors1.length > 0 || errors2.length > 0) ?
    errors1.concat(errors2) : [makeInfo('Enter your courses separeted by space or comma.')];
  return <>
    <h1>Exam Schedule Finder</h1>
    <h3>{window.schedule.title}</h3>
    <p>{window.schedule.asof}</p>
    <InputField label='Courses' value={courseInput} errors={errors} onChange={setCourseInput} />
    {exams.length > 0 && <ScheduleTable exams={exams} />}
    {exams.length > 0 && <HorizontalCalendarTable exams={exams} />}
    {exams.length > 0 && <VerticalCalendarTable exams={exams} />}
  </>;
};

export default App;
