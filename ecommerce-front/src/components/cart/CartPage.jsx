import React from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';
import SingleCart from './SingleCart';
import CheckOut from './CheckOut';

const CartPage = ({ cart: { cart } }) => {   
    return (
        <Wrapper>
            <TitleSection>
                    <h1>Your Cart</h1>
            </TitleSection>
            <>{!cart || cart.length === 0 ? <NoProductMsg>No products...</NoProductMsg> :
                <>
                    <MainSection>
                        <ProductsSection>
                            {cart.map(item => <SingleCart key={item._id} cart={item} />)}
                        </ProductsSection>
                        <CheckoutSection>
                            <CheckOut cart={cart}/>
                        </CheckoutSection>
                    </MainSection>
                </>
            }</>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    padding: 30px 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: solid 1px red;
    background-color: ${props => props.theme.primWhite};
`
const TitleSection = styled.section`
    width: 100%;
    border-bottom: solid 1px ${props => props.theme.lightGray};
    padding-bottom: 10px;
    h1 {
        font-weight: 400;
        font-size: 1.7rem;
        line-height: 1.5rem;
        margin-bottom: 4px;
        word-spacing: 0.5rem;
    }
`
const MainSection = styled.section`
    width: 100%;
    border: solid 1px red;
    display: flex;
    justify-content: space-between;
`
const ProductsSection = styled.section`
    width: 63%;
    border: solid 1px red;
`
const CheckoutSection = styled.section`
    width: 35%;
    padding-bottom: 20px;
    border: solid 1px red;
`

const NoProductMsg = styled.h1`
    color: ${props => props.theme.brandBlue};
    margin: auto;
`

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps)(CartPage);
