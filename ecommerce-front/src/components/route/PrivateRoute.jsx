import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertAction';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, setAlert, ...rest }) => {
    useEffect(() => {
        if(!loading && !isAuthenticated) setAlert('Please log-in first.');
    }, [setAlert, isAuthenticated])

    return (
        <Route 
            {...rest}
            render= {props => (
                !loading && (isAuthenticated?
                <Component {...props}/>
                : <Redirect to="/signin" />)
            )}
        />
    );
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAlert: (message) => dispatch(setAlert(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);