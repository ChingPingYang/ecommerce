import React from 'react';
import { Switch } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Landing from '../layout/Landing';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import UserDashboard from '../user/UserDashboard';
import CreateCategory from '../admin/CreateCategory';
import AdminDashboard from '../admin/AdminDashboard';


const Routes = () => {
    return (
        <Switch>
            <PublicRoute path="/" exact component={Landing} />
            <PublicRoute path="/signin" restricted component={SignIn} />
            <PublicRoute path="/signup" restricted component={SignUp} />
            <PrivateRoute path="/userDashboard" component={UserDashboard} />
            <AdminRoute path="/admin/adminDashboard" component={AdminDashboard}/>
            <AdminRoute path="/admin/createCategory" component={CreateCategory}/>
        </Switch>
    )
}

export default Routes;