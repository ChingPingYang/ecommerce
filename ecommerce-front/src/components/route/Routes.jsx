import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Landing from '../landing/Landing';
import SignIn from '../auth/SignIn';
import SignUp from '../auth/SignUp';
import SingleProduct from '../landing/product/SingleProduct';
import CartPage from '../cart/CartPage';
import UserDashboard from '../user/UserDashboard';
import CreateCategory from '../admin/CreateCategory';
import AdminDashboard from '../admin/AdminDashboard';
import Profile from '../layout/Profile';
import AddProduct from '../admin/AddProduct';
import NotFound from '../layout/NotFound';

const Routes = () => {
    return (
        <Switch>
            <PublicRoute path="/" exact component={Landing} />
            <PublicRoute path="/signin" restricted component={SignIn} />
            <PublicRoute path="/signup" restricted component={SignUp} />
            <PublicRoute path="/product/:productId" component={SingleProduct} />
            <PublicRoute path="/cart" component={CartPage} />
            <PrivateRoute path="/userDashboard" component={UserDashboard} />
            <PrivateRoute path="/profile/:userId" component={Profile} />
            <AdminRoute path="/admin/adminDashboard" component={AdminDashboard}/>
            <AdminRoute path="/admin/createCategory" component={CreateCategory}/>
            <AdminRoute path="/admin/addProduct" component={AddProduct}/>
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes;