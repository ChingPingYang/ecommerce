import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBraintreeToken } from '../../actions/cartAction';
import DropIn from 'braintree-web-drop-in-react';

const CheckOut = ({ cart, auth: { isAuthenticated }, cartState: { clientToken, instance } , getBraintreeToken }) => {

    useEffect(() => {
        if(isAuthenticated) getBraintreeToken()
    },[isAuthenticated])
    
    const getTotal = () => {
        let total = cart.reduce((acc, item) => {
            return acc + item.purchase * item.price;
        }, 0);
        return Math.round(total * 100) / 100;
    }
    
    return (
        <Wrap>
            <Total>Total: ${getTotal()}</Total>
            {clientToken !== null && isAuthenticated &&
             <DropIn options={{ authorization: clientToken}} onInstance={instance => instance = instance} />
            }
            {isAuthenticated? 
                <CheckoutBtn>Checkout</CheckoutBtn> 
                : <SigninBtn to="/signin">Signin to checkout</SigninBtn>
            }
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
`

const Total = styled.div`
    font-size: 1.5rem;
    letter-spacing: 0.05rem;
    margin-bottom: 10px;
`

const CheckoutBtn = styled.button`
    all: unset;
    font-size: 1.1rem;
    width: 100%;
    height: 45px;
    text-align: center;
    cursor: pointer;
    color: ${props => props.theme.primWhite};
    background-color: ${props => props.theme.interactive};
    transition: 0.2s;
    &:hover {
        background-color: ${props => props.theme.interactiveDark};
    }
`
const SigninBtn = styled(Link)`
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    width: 100%;
    height: 45px;
    cursor: pointer;
    color: ${props => props.theme.primWhite};
    background-color: ${props => props.theme.interactive};
    transition: 0.2s;
    &:hover {
        background-color: ${props => props.theme.interactiveDark};
    }
`

const mapStateToProps = state => {
    return {
        auth: state.auth,
        cartState: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getBraintreeToken: () => dispatch(getBraintreeToken())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);