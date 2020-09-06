import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({ component: Component, auth: { isAuthenticated, loading }, restricted, ...rest}) => {
    return (
        <Route 
            {...rest}
            render={props => (
                !loading && (isAuthenticated && restricted ?
                <Redirect to="/" /> :
                <Component {...props} />)
            )}
        />
    )
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(PublicRoute);