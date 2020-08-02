import React, { useState, useEffect } from 'react';
import { Schedule } from './Schedule';
import Main from './Main';

type State = 'loading' | 'failed' | Schedule;

const fetchUrl = async (url: string, setState: (state: State) => void): Promise<void> => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setState(data);
  } catch (err) {
    setState('failed');
  }
};

const Disclaimer: React.FC = () => {
  const officialUrl = 'https://www.douglascollege.ca/current-students/important-dates-information/exam-schedule';
  const githubUrl = 'https://github.com/takapro/exam-finder';
  return (
    <div className='disclaimer'>
      <h3>Disclaimer</h3>
      <p>This web page is provided &quot;AS IS&quot;, without any kind of warranty.</p>
      <p>The information in this web page is NOT provided by the college, and may be incorrect or outdated.</p>
      <p>Please check the official information at <a href={officialUrl}>{officialUrl}</a>.</p>
      <p>You can find the source code at <a href={githubUrl}>{githubUrl}</a>.</p>
    </div>
  );
};

const App: React.FC<{ baseUrl: string }> = ({ baseUrl }) => {
  const [state, setState] = useState('loading' as State);
  useEffect(() => { fetchUrl(baseUrl + '/schedule.json', setState); }, []);
  return <>
    <h1>Exam Schedule Finder</h1>
    {state === 'loading' ? <p>Loading...</p> :
      state === 'failed' ? <p>Sorry, failed to load data.</p> :
        <Main schedule={state} />
    }
    <Disclaimer />
  </>;
};

export default App;
