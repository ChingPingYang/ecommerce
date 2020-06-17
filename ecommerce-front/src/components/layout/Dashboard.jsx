import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Spinner from './Spinner';

const Dashboard = ({ auth: {user, loading}}) => {
    return (
        loading? <Spinner /> :
        <>
            <h1>Welcome back {user.name}</h1>
            <h2>{user.email}</h2>
            <h2>You are {user.role === 0 ? "You are User" : "Admin"}</h2>
        </>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Dashboard);