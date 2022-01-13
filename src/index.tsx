import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { library as faLibrary } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

faLibrary.add(faAngleRight);

reportWebVitals();
