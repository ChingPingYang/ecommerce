import React from 'react';
import styled from 'styled-components';

const CartItem = () => {
    return (
        <div>
            <Cart></Cart>
        </div>
    )
}

const Cart = styled.div`
    width: 300px;
    height: 250px;
    margin: 20px 0px;
    box-shadow: 0px 8px 28px -5px rgba(0, 1, 3, 0.25);
`

export default CartItem;