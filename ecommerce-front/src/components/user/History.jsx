import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { media } from '../../styled/media';

const History = ({ order }) => {
    return (
        <HistoryWrap>
            <HistoryContent>
                {order.products.map(item => {
                    return ( 
                        <Fragment key={item?._id}>
                            <ProductName to={`/product/${item?.product._id}`}>{item?.product.name}</ProductName>
                            <h4>quantity: {item?.quantity} <span>product price: ${item?.product.price}</span></h4>
                        </Fragment>
                        )
                })}
            </HistoryContent>      
            <HistoryContent>
                <ul>
                    <li>Order ID: {order._id}</li>
                    <li>Transaction ID: {order.transaction_id}</li>
                    <li>Ordered at: {moment(order.createdAt).fromNow()}</li>
                    <li>Delivery Address: {order.address}</li>
                    <li>Amount: ${order.amount}</li>
                </ul>
            </HistoryContent>      
        </HistoryWrap>
    )
}

const HistoryWrap = styled.div`
    width: 100%;
    display: flex;
    margin: 20px 0px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 8px 28px -5px rgba(0, 1, 3, 0.25);
    ${media.tablat_L} {
        flex-direction: column;
    }
`
const HistoryContent = styled.div`
    min-height: 140px;
    display: flex;
    flex-direction: column;
    h4{
        position: relative;
        font-weight: 300;
        margin-top: 3px;
        margin-bottom: 25px;
        :last-child{
            margin-bottom: 0px;
        }
        :after {
            content: "";
            width: 100%;
            height: 1px;
            background-color: ${props=> props.theme.lightGray};
            position: absolute;
            top: 23px;
            left: 0px;
            ${media.mobile} {
                top: 43px;
            }
        }
    }
    span {
        margin-left: 50px;
        ${media.mobile} {
            display: block;
            margin-left: 0px;
        }
    }
    :last-child {
        text-align: right;
        margin-left: auto;
        position: relative;
            li {
                list-style: none;
                font-size: 1rem;
                color: ${props => props.theme.darkGray};
                font-weight: 300;
                :last-child {
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                    color: black;
                    font-weight: 400;
                    font-size: 1.5rem;
                }
            }
        ${media.tablat_L} {
            margin-top: 10px;
        }
    }
`

const ProductName = styled(Link)`
    all: unset;
    width: max-content;
    color: black;
    font-size: 1.3rem;
    letter-spacing: 0.05rem;
    font-weight: 300;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
    ${media.tablat_L} {
        width: 100%;
    }
`

export default History;