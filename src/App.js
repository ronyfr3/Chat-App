import React from 'react';

import Chat from './components/Chat';
import Join from './components/Join';
import Video from './components/Video';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Route path='/' exact component={Join} />
      <Route path='/chat' component={Chat} />
      <Route path='/video' component={Video} />
    </Router>
  );
};

export default App;
