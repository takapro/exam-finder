import React, { useState, useEffect } from 'react';
import { Schedule } from './Schedule';
import Main from './Main';

type State = 'loading' | 'failed' | Schedule;

const fetchUrl = (url: string, setState: (state: State) => void): void => {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error();
      }
    })
    .then(json => setState(json))
    .catch(() => setState('failed'));
};

const App = (props: { baseUrl: string }): JSX.Element => {
  const [state, setState] = useState('loading' as State);
  useEffect(() => fetchUrl(props.baseUrl + '/schedule.json', setState), []);
  return <>
    <h1>Exam Schedule Finder</h1>
    {state === 'loading' ? <p>Loading...</p> :
      state === 'failed' ? <p>Sorry, failed to load data.</p> :
        <Main schedule={state} />
    }
  </>;
};

export default App;
