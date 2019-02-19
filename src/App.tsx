import React from 'react';
import { Schedule } from './Schedule';

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
  </>;
};

export default App;
