import React from 'react';
import styled from 'styled-components';

const CheckOut = ({ cart }) => {
    const getTotal = () => {
        let total = cart.reduce((acc, item) => {
            console.log('total: ', acc);
            console.log("price: ", item.price);
            return acc + item.purchase * item.price;
        }, 0);
        return Math.round(total * 100) / 100;
    }
    return (
        <Wrap>
            <h1>{getTotal()}</h1>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
`

export default CheckOut;