import React from 'react';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <Router>
        <Navbar/>
        <Route component={Routes}/>
    </Router>
  );
}

export default App;
