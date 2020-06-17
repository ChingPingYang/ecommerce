import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Landing from '../layout/Landing';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';

const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Landing}/>
            {/* <Route path="/signin" component={SignIn}/> */}
            <Route path="/signup" component={SignUp}/>
            <PublicRoute path="/signin" restricted component={SignIn}/>
            
        </Switch>
    )
}

export default Routes;