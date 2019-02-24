import React, { useState } from 'react';
import { parseCourses } from './Course';
import { Schedule, filterExams } from './Schedule';
import InputField from './InputField';
import ScheduleTable from './ScheduleTable';

declare global {
  interface Window {
    schedule: Schedule;
  }
}

const App = () => {
  const [courseInput, setCourseInput] = useState('');
  const [courses, errors] = parseCourses(courseInput);
  const exams = filterExams(window.schedule.exams, courses);
  return <>
    <h1>Exam Schedule Finder</h1>
    <h3>{window.schedule.name}</h3>
    <p>{window.schedule.asof}</p>
    <InputField label='Courses' value={courseInput} errors={errors} onChange={setCourseInput} />
    {exams.length > 0 && <ScheduleTable exams={exams} />}
  </>;
};

export default App;
