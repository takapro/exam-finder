import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const path = window.location.pathname;
const baseUrl = window.location.origin + path.substr(0, path.lastIndexOf('/'));
ReactDOM.render(<App baseUrl={baseUrl} />, document.getElementById('root'));
