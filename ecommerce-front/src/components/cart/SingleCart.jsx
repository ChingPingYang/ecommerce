import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { plusQuantity, minusQuantity, removeCart } from '../../actions/cartAction';

const SingleCart = ({cart: {_id, name, price, purchase, imageURL, quantity}, plusQuantity, minusQuantity, removeCart}) => {
    const handlePlus = (_id) => {
        plusQuantity(_id);
    }
    const handleMinus = (_id) => {
        minusQuantity(_id);
    }
    const handleRemove = (_id) => {
        removeCart(_id);
    }
    return (
        <Wrap>
            <Img src={imageURL} alt={name} />
            <CartContent>
                <CartName to={`/product/${_id}`}>{name}</CartName>
                <QuantityWrap>
                    {purchase > 1 ? <MinusReal onClick={() => handleMinus(_id)}/> : <MinusFake/>}
                    <Quantity>{purchase}</Quantity>
                    {purchase >= quantity ? <PlusFake/> : <PlusReal onClick={() => handlePlus(_id)}/>}
                </QuantityWrap>
                <RemoveCart onClick={() => handleRemove(_id)}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4.5L2.81818 14H12.1818L13 4.5" stroke="#FF328C" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1 3H14" stroke="#FF328C" strokeLinecap="round"/>
                        <path d="M6 6V11M9 6V11" stroke="#FF328C" strokeLinecap="round"/>
                        <path d="M6 1H9" stroke="#FF328C" strokeLinecap="round"/>
                    </svg>
                    <h5>Remove</h5>
                </RemoveCart>
            </CartContent>
            <CartContent>${price}</CartContent>
            
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    min-height: 180px;
    margin-bottom: 20px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    background-color: white;
`
const Img = styled.img`
    width: 140px;
    height: 140px;
    margin-right: 20px;
    object-fit: cover;
`
const CartContent = styled.div`
    width: 60%;
    height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    :last-child {
        text-align: right;
        font-size: 1.3rem;
        flex-basis: 10%;
        margin-left: auto;
    }
`
const CartName = styled(Link)`
    all: unset;
    color: black;
    font-size: 1.3rem;
    letter-spacing: 0.05rem;
    font-weight: 300;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`
const QuantityWrap = styled.div`
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const MinusReal = styled.div`
    width: 20px;
    height: 20px;
    position: relative;
    border-radius: 100%;
    cursor: pointer;
    background-color: ${props => props.theme.interactive};
    border: solid 1px ${props => props.theme.interactive};
    :before {
        content: "";
        position: absolute;
        width: 8px;
        height: 2px;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
`
const MinusFake = styled.div`
    width: 20px;
    height: 20px;
    position: relative;
    border-radius: 100%;
    border: solid 1px ${props => props.theme.lightGray};
    :before {
        content: "";
        position: absolute;
        width: 8px;
        height: 2px;
        background-color: ${props => props.theme.lightGray};
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
`
const PlusReal = styled.div`
    width: 20px;
    height: 20px;
    position: relative;
    border-radius: 100%;
    background-color: ${props => props.theme.interactive};
    cursor: pointer;
    :before {
        content: "";
        position: absolute;
        width: 8px;
        height: 2px;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    :after {
        content: "";
        position: absolute;
        width: 8px;
        height: 2px;
        background-color: white;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%) rotate(90deg);
    }
`
const PlusFake = styled.div`
    width: 20px;
    height: 20px;
    position: relative;
    border-radius: 100%;
    border: solid 1px ${props => props.theme.lightGray};
    :before {
        content: "";
        position: absolute;
        width: 8px;
        height: 2px;
        background-color: ${props => props.theme.lightGray};
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    :after {
        content: "";
        position: absolute;
        width: 8px;
        height: 2px;
        background-color: ${props => props.theme.lightGray};
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%) rotate(90deg);
    }
`
const RemoveCart = styled.div`
    width: 70px;
    cursor: pointer;
    display: flex;
    align-items: center;
    h5 {
        color: ${props => props.theme.interactive};
        margin-left: 5px;
    }
`

const Quantity = styled.div`

`

const mapDispatchToProps = dispatch => {
    return {
        plusQuantity: (_id) => dispatch(plusQuantity(_id)),
        minusQuantity: (_id) => dispatch(minusQuantity(_id)),
        removeCart: (_id) => dispatch(removeCart(_id))
    }
}

export default connect(null, mapDispatchToProps)(SingleCart);