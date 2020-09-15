import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getBraintreeToken, processPayment } from '../../actions/cartAction';
import { setAlert } from '../../actions/alertAction';
import DropIn from 'braintree-web-drop-in-react';

const CheckOut = ({ cart, history, auth: { isAuthenticated }, cartState: { clientToken } , getBraintreeToken, processPayment, setAlert }) => {
    const [instance, setInstance] = useState(null);
    const [address, setAddress] = useState('');
    useEffect(() => {
        if(isAuthenticated) getBraintreeToken()
    },[isAuthenticated, getBraintreeToken])

    const getTotal = () => {
        let total = cart.reduce((acc, item) => {
            return acc + item.purchase * item.price;
        }, 0);
        return Math.round(total * 100) / 100;
    }

    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    
    const buy = async () => {
        // send nonce to server (nonce = instance.requestPaymentMethod())
        try {
            if(address.length <= 0) return setAlert('Please insert your address.');
            let { nonce } = await instance.requestPaymentMethod();
            let amount = getTotal();
            let payment = { nonce, amount }
            processPayment(payment, address)
            history.push('/userDashboard');
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <Wrap>
            <Total>Total: ${getTotal()}</Total>
            {clientToken !== null && isAuthenticated &&
            <>
                <DropIn 
                    options={{ 
                        authorization: clientToken
                    }} 
                    onInstance={instance => {
                        setInstance(instance)
                    }} 
                />
                 <AddressWrap>
                    <h3>Your Address: </h3>
                    <textarea 
                     rows="2" 
                     placeholder="For Delivery"
                     onChange={handleAddress}
                     required
                    ></textarea>
                </AddressWrap>
            </>
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
    padding: 10px;
`

const Total = styled.div`
    font-size: 1.5rem;
    letter-spacing: 0.05rem;
`

const AddressWrap = styled.div`
    width: 100%;
    margin-bottom: 10px;
    h3 {
        font-weight: 400;
    }
    textarea {
        width: 100%;
        padding: 6px;
        font-size: 0.9rem;
    }
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
        processPayment: (payment, address) => dispatch(processPayment(payment, address)),
        setAlert: (message) => dispatch(setAlert(message))
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
    )(CheckOut);