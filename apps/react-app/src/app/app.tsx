import React from 'react';

import '@smart-elements';
import '@nx-example/ui';
import './app.scss';
import ChatComponent from "./chat.component";

export const App = () => {
  const title = 'react-app';
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <ui-greeting title={title}></ui-greeting>
      </div>
      <p>
        This is a React app built with <a href="https://nx.dev">Nx</a>.
      </p>
      <h2>Smart ListBox Web Component</h2>
      <smart-list-box>
        <smart-list-item value="Bulgaria">Bulgaria</smart-list-item>
        <smart-list-item value="United Kingdom">United Kingdom</smart-list-item>
        <smart-list-item value="United States">United States</smart-list-item>
      </smart-list-box>
      <ChatComponent />
    </div>
  );
};

export default App;
