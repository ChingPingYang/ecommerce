import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import History from './History';
import CartItem from './CartItem';
import { getOrders } from '../../actions/orderAction';

const UserDashboard = ({ auth: {user, loading}, getOrders}) => {
    const [filter, setFilter] = useState({
        active: false,
        sort: '- Sort By -'
    });
    const [card, setCard] = useState([1,2,3,4,5,6,7])

    const [orders, setOrders] = useState([1,2,3])

    useEffect(() => {
        getOrders(filter.sort)
    },[filter])

    const handleOnChange = e => {
        setFilter({
            ...filter,
            sort: e.target.value
        })
    }
    return (
        loading || user === null ? <Spinner /> :( user.role === 1? <Redirect to="/admin/adminDashboard"/> :
        <DashboardWrap onClick={() => filter.active && setFilter({...filter, active: !filter.active})}>
            <Subtitle>Welcome back {user.name}</Subtitle>
            <CartWrap>
                <Title>Your Card</Title>
                <CartItemWrap>
                    {card.map((item, index) => <CartItem key={index}/>)}
                </CartItemWrap>
            </CartWrap>
            <OrdersWrap>
                <Title>Your Orders</Title>
                <FormWrap onChange={handleOnChange}>
                    <SortTitle onClick={() => setFilter({...filter, active: !filter.active})}>
                            {filter.sort}
                    </SortTitle>
                    <DropDown active={filter.active}>
                        <Option>
                            <label htmlFor="Newest" onClick={() => setFilter({...filter, active: !filter.active})}>Newest</label>
                            <input type="radio" id="Newest" value="- Newest -" name="sort"/>
                        </Option>
                        <Option>
                            <label htmlFor="Oldest" onClick={() => setFilter({...filter, active: !filter.active})}>Oldest</label>
                            <input type="radio" id="Oldest" value="- Oldest -" name="sort"/>
                        </Option>
                        <Option>
                            <label htmlFor="Price" onClick={() => setFilter({...filter, active: !filter.active})}>Price</label>
                            <input type="radio" id="Price" value="- Price -" name="sort"/>
                        </Option>
                    </DropDown>
                </FormWrap>
                <HistoryWrap>
                    {orders.map((orders, index) => <History key={index} />)
                    }
                </HistoryWrap>
            </OrdersWrap>
        </DashboardWrap>)
    )
}

const DashboardWrap = styled.div`
    width: 70%;
    position: relative;
    margin: auto;
    display: flex;
    flex-flow: column;
    padding-top: 40px;
`
const Subtitle = styled.h3`
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 1px;
    color: ${props => props.theme.darkGray};
`
const CartWrap = styled.div`
    /* border: solid 1px red; */
    margin-top: 10px;
`
const CartItemWrap = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* border: solid 1px black; */
`
const OrdersWrap = styled.div`
    /* border: solid 1px red; */
    margin-top: 80px;
    position: relative;
`
const Title = styled.h1`
    color: ${props => props.theme.lightBlue};
    letter-spacing: 1px;
`
const FormWrap = styled.form`
    top: 40px;
    position: absolute;
    width: 100px;
    border: 1px solid ${props => props.theme.lightGray};
`
const SortTitle = styled.div`
    padding: 3px; 
    color: ${props => props.theme.darkGray};
    cursor: pointer;
    text-align: center;
`

const DropDown = styled.div`    
    width: 100%;
    height: 0px;
    text-align: center;
    opacity: 0;
    transition: 0.3s;
    overflow: scroll;
    ${props => props.active && css`
        height: 75px;
        opacity: 1;
        background-color: white;
    `}
`
const Option = styled.div`
    input {
        display: none;
    }
    label {
        display: block;
        width: 100%;
        height: 100%;
        padding: 3px;
        cursor: pointer;
        color: ${props => props.theme.darkGray};
        &:hover {
        background-color: ${props => props.theme.interactive};
        color: ${props => props.theme.primWhite};
        }
    }
`
const HistoryWrap = styled.div`
    width: 100%;
    margin-top: 40px;
`

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (sort) => dispatch(getOrders(sort))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);