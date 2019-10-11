import React from 'react';

import './app.scss';

import { Route, Link } from 'react-router-dom';

export const App = () => {
  const title = 'react-app';
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./${fileName}.${style} file.
   */
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <ui-greeting title={title} />
      </div>
      <p>
        This is a React app built with <a href="https://nx.dev">Nx</a>.
      </p>
    </div>
  );
};

export default App;
