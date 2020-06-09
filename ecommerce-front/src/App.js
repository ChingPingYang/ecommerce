import React from 'react';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import store from './util/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Navbar />
          <Alert />
          <Route component={Routes}/>
      </Router>
    </Provider>
  );
}

export default App;
