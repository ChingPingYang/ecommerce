import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/layout/Landing';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
        </Switch>
    )
}

export default Routes;