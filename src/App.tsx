import React from 'react';
import { Schedule } from './Schedule';
import ScheduleTable from './ScheduleTable';

declare global {
  interface Window {
    schedule: Schedule;
  }
}

const App = () => {
  return <>
    <h1>Exam Schedule Finder</h1>
    <h3>{window.schedule.name}</h3>
    <p>{window.schedule.asof}</p>
    <ScheduleTable exams={window.schedule.exams} />
  </>;
};

export default App;
