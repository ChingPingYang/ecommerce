import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled , { css }from 'styled-components';
import logo from './logo-03.svg';
import SearchBox from './SearchBox';
import { signOut } from '../../actions/authAction';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { media } from '../../styled/media';


const Navbar = props => {
    const {location, signOut, auth: { isAuthenticated, loading, user }, cart} = props;
    const [ width, setWidth ] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', handleResize)
    },[])
    const handleResize = () => {
        setWidth(window.innerWidth);
    }
    
   const authedLinks = () => (
    <ListWrap>
        <li>
            <StyledLink 
                to={"/"} 
                location={location.pathname}
                path={"/"} >
                PRODUCTS
            </StyledLink>
        </li>
        <li>
            <StyledLink 
                to={user && user.role === 1? "/admin/adminDashboard" : "/userDashboard"} 
                location={location.pathname}
                path={user && user.role === 1? "/admin/adminDashboard" : "/userDashboard"} >
                DASHBOARD
            </StyledLink>
        </li>
        <li>
            <StyledLink to="/" location={location.pathname} path="/signout" onClick={signOut}>
                SIGNOUT
            </StyledLink>
        </li>
        <li>
            <Link to={`/profile/${user?._id}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11.25" 
                        stroke={location.pathname === "/profile" ? "#0028FF" : "#676F79"} 
                        strokeWidth="1.5"
                    />
                    <circle cx="11.75" cy="8.75" r="4" 
                        stroke={location.pathname === "/profile" ? "#0028FF" : "#676F79"} 
                        strokeWidth="1.5"
                    />
                    <path d="M20.6642 19.2219C18.6506 16.6517 15.5182 15 12 15C8.84795 15 6.00554 16.3258 4 18.4501C3.76359 18.7005 3.53881 18.9621 3.32652 19.2338"
                        stroke={location.pathname === "/profile" ? "#0028FF" : "#676F79"} 
                        strokeWidth="1.5"
                    />
                </svg>
            </Link>
        </li>
        <li>
            <Link to="/cart">
                <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H3.82051L6.07692 13H21.8718L23 4.42857H7.5" stroke={location.pathname === "/cart" ? "#0028FF" : "#676F79"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.5 16H6.5C5.67157 16 5 15.3284 5 14.5V14.5C5 13.6716 5.67157 13 6.5 13V13" stroke={location.pathname === "/cart" ? "#0028FF" : "#676F79"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="18" r="2" stroke={location.pathname === "/cart" ? "#0028FF" : "#676F79"} strokeWidth="1.5"/>
                    <circle cx="20" cy="18" r="2" stroke={location.pathname === "/cart" ? "#0028FF" : "#676F79"} strokeWidth="1.5"/>
                </svg>
                {cart.cart !== null && <div><h5>{cart.cart.length}</h5></div>}
            </Link>
        </li>
    </ListWrap>
   )

   const guestLinks = () => (
    <ListWrap>
        <li>
            <StyledLink 
                to={"/"} 
                location={location.pathname}
                path={"/"} >
                PRODUCTS
            </StyledLink>
        </li>
        <li>
            <StyledLink to="/userDashboard" location={location.pathname} path="/userDashboard" >
                DASHBOARD
            </StyledLink>
        </li>
        <li>
            <StyledLink to="/signin" location={location.pathname} path="/signin" >
                SIGNIN
            </StyledLink>
        </li>
        <li>
            <StyledLink to="/signup" location={location.pathname} path="/signup" >
                SIGNUP
            </StyledLink>
        </li>
        <li>
            <Link to="/cart">
                <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H3.82051L6.07692 13H21.8718L23 4.42857H7.5" stroke={location.pathname === "/cart" ? "#0028FF" : "#676F79"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.5 16H6.5C5.67157 16 5 15.3284 5 14.5V14.5C5 13.6716 5.67157 13 6.5 13V13" stroke={location.pathname === "/cart" ? "#0028FF" : "#676F79"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="18" r="2" stroke={location.pathname === "/cart" ? "#0028FF" : "#676F79"} strokeWidth="1.5"/>
                    <circle cx="20" cy="18" r="2" stroke={location.pathname === "/cart" ? "#0028FF" : "#676F79"} strokeWidth="1.5"/>
                </svg>
                {cart.cart !== null && <div><h5>{cart.cart.length}</h5></div>}
            </Link>
        </li>
    </ListWrap>
   )
    
   
    return (
        <>
            <NavWrap>
                {width >= 500 && <Link to="/"><Logo /></Link>}
                {width >= 1150 && <SearchBox />}
                {!loading && (isAuthenticated? authedLinks() : guestLinks())}
            </NavWrap>
            {width < 1150 && <SearchBox />}
        </>
    ) 
}
const NavWrap = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 30px -15px rgba( 1, 1, 1, 0.3);
`
const ListWrap = styled.ul`
    height: 100%;
    flex-grow: 1;
    margin-right: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    ${media.tablat_S} {
        margin-right: 20px;
        ${media.mobile} {
            justify-content: center;
            margin-right: 0px;
        }
    }
    li {
        position: relative;
        list-style: none;
        flex: 0 0 10px;
        margin-left: 40px;
        ${media.mobile} {
            margin: 0px 10px;
        }
            svg {
                width: 30px;
                height: 30px;
                margin-top: 3px;
                cursor: pointer;
                circle {
                    transition: 0.3s;
                }
                path {
                    transition: 0.3s;
                }
                &:hover {
                    circle {
                        stroke: ${props => props.theme.brandBlue};
                    }
                    path {
                        stroke: ${props => props.theme.brandBlue};
                    }
                }
            }
            div {
                position: absolute;
                top: -3px;
                left: 16px;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: ${props => props.theme.interactive};
                border-radius: 100%;
                h5 {
                    color: white;
                    font-weight: 400;
                }
            }
    }
    
`
const StyledLink = styled(Link)`
    text-decoration: none;
    display: inline-block;
    color: ${props => props.theme.darkGray};
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
        background-color: ${props => props.theme.brandBlue};
        transition: 0.3s ease-in-out;
        opacity: 0;
    }
    &:hover {
        ${ props => props.location !== props.path && css`
            color: ${props => props.theme.brandBlue};
        `}
        &:after{
            transform: scale(1);
            opacity: 1;
        }
    }
    /* check if the path is current path */
    ${props => props.location === props.path && css`
        color: ${props => props.theme.brandBlue};
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
    ${media.tablat_S} {
        margin-left: 20px;
    }
`

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(Navbar);