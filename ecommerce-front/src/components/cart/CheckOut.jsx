import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBraintreeToken, processPayment } from '../../actions/cartAction';
import DropIn from 'braintree-web-drop-in-react';

const CheckOut = ({ cart, auth: { isAuthenticated }, cartState: { clientToken } , getBraintreeToken, processPayment }) => {
    const [instance, setInstance] = useState(null);
    const [total, setTotal] = useState(null);
    useEffect(() => {
        if(isAuthenticated) getBraintreeToken()
    },[isAuthenticated])

    const getTotal = () => {
        let total = cart.reduce((acc, item) => {
            return acc + item.purchase * item.price;
        }, 0);
        return Math.round(total * 100) / 100;
    }
    
    const buy = async () => {
        // send nonce to server (nonce = instance.requestPaymentMethod())
        try {
            let { nonce } = await instance.requestPaymentMethod();
            let amount = getTotal();
            let payment = { nonce, amount }
            processPayment(payment)
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <Wrap>
            <Total>Total: ${getTotal()}</Total>
            {clientToken !== null && isAuthenticated &&
             <DropIn 
                options={{ 
                    authorization: clientToken
                }} 
                onInstance={instance => {
                    setInstance(instance)
                }} 
             />
            }
            {isAuthenticated? 
                (instance !== null? <CheckoutBtn onClick={buy}>Pay</CheckoutBtn> : <LoadingBtn>Loading</LoadingBtn>) 
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

const LoadingBtn = styled.button`
    all: unset;
    font-size: 1.1rem;
    width: 100%;
    height: 45px;
    text-align: center;
    color: ${props => props.theme.primWhite};
    background-color: ${props => props.theme.lightGray};
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
        getBraintreeToken: () => dispatch(getBraintreeToken()),
        processPayment: (payment) => dispatch(processPayment(payment))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);