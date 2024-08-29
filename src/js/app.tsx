import App from 'App/components/App';
import React from 'react';
import {createRoot} from 'react-dom/client';

const container = document.createElement('div');
document.body.appendChild(container);

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
