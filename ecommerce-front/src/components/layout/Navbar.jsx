import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled , { css }from 'styled-components';
import logo from './logo-03.svg';
import { signOut } from '../../actions/authAction';
import { connect } from 'react-redux';
import { compose } from 'redux';

const Navbar = props => {
    const {location, signOut, auth: { isAuthenticated, loading }} = props;
   const authedLinks = () => (
    <ListWrap>
        <li>
            <StyledLink to="/userDashboard" location={location.pathname} path="/userDashboard" >
                DASHBOARD
            </StyledLink>
        </li>
        <li>
            <StyledLink to="/" location={location.pathname} path="/signout" onClick={signOut}>
                SIGNOUT
            </StyledLink>
        </li>
    </ListWrap>
   )

   const guestLinks = () => (
    <ListWrap>
        <li>
            <StyledLink to="/userDashboard" location={location.pathname} path="/userDashboard" >
                DASHBOARD
            </StyledLink>
        </li>
        <li>
            <StyledLink to="/signin" location={location.pathname} path="/signin" >
                SINGIN
            </StyledLink>
        </li>
        <li>
            <StyledLink to="/signup" location={location.pathname} path="/signup" >
                SIGNUP
            </StyledLink>
        </li>
    </ListWrap>
   )
    
   
    return (
        <NavWrap>
            <Logo />
            {!loading && (isAuthenticated? authedLinks() : guestLinks())}
        </NavWrap>
    ) 
}
const NavWrap = styled.div`
    width: 100%;
    height: 100px;
    background-color: ${props => props.theme.primBlue};
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ListWrap = styled.ul`
    height: 100%;
    max-width: 400px;
    flex-grow: 1;
    margin-right: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    li {
        list-style: none;
        color: blue;
        flex: 0 0 50px;
    }
`
const StyledLink = styled(Link)`
    text-decoration: none;
    display: inline-block;
    margin: 0px 30px;
    color: ${props => props.theme.lightBlue};
    text-align: center;
    position: relative;
    transition: 0.3s;
    &:after {
        content: "";
        position: absolute;
        left: 0px;
        top: 20px;
        width: 100%;
        height: 2.3px;
        transform: scale(0);
        background-color: ${props => props.theme.primWhite};
        transition: 0.3s ease-in-out;
        opacity: 0;
    }
    &:hover {
        ${ props => props.location !== props.path && css`
            color: ${props => props.theme.primWhite};
        `}
        &:after{
            transform: scale(1);
            opacity: 1;
        }
    }
    /* check if the path is current path */
    ${props => props.location === props.path && css`
        color: ${props => props.theme.primWhite};
        &:after{
                transform: scale(1);
                opacity: 1;
            }
    `} 
`

const Logo = styled.div`
    width: 35px;
    height: 35px;
    margin-left: 30px;
    background: url(${logo}) no-repeat;
    background-position: center;
`

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Navbar);