import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated }, ...rest }) => {
    return (
        <Route 
            {...rest}
            render= {props => (
                isAuthenticated?
                <Component {...props}/>
                : <Redirect to="/" />
            )}
        />
    );
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute);