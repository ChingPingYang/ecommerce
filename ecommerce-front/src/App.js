import React, { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import store from './util/store';
import setTokenHeader from './util/setTokenHeader';
import { getUser } from './actions/authAction';

// Check if the localstorage has token. If yes, set it to the header.
// Then we dispatch an action to get the user 
if(localStorage.token) setTokenHeader(localStorage.token);

function App() {
  useEffect(() => {
    store.dispatch(getUser());
  }, []);
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
