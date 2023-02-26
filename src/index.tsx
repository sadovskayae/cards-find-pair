import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.scss';
import { iconNames } from './utils/consts';
import { shuffle } from './utils/helpers';

const cards = shuffle(iconNames.concat(iconNames));
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App cards={cards}/>
  </React.StrictMode>
);
