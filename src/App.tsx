import React, { useState } from 'react';
import { courseToString, parseCourses } from './Course';
import { Schedule } from './Schedule';
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
  const coursesText = courses.map(courseToString).join(', ');
  return <>
    <h1>Exam Schedule Finder</h1>
    <h3>{window.schedule.name}</h3>
    <p>{window.schedule.asof}</p>
    <InputField label='Courses' value={courseInput} errors={errors} onChange={setCourseInput} />
    <p>courses = {coursesText}</p>
    <ScheduleTable exams={window.schedule.exams} />
  </>;
};

export default App;