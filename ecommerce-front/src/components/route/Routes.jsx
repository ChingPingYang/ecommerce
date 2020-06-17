import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Landing from '../layout/Landing';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import Dashboard from '../layout/Dashboard';


const Routes = () => {
    return (
        <Switch>
            <PublicRoute path="/" exact component={Landing} />
            <PublicRoute path="/signin" restricted component={SignIn} />
            <PublicRoute path="/signup" restricted component={SignUp} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
    )
}

export default Routes;