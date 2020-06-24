import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import History from './History';

const UserDashboard = ({ auth: {user, loading}}) => {
    const [filter, setFilter] = useState({
        active: false,
        sort: '- Sort By -'
    });
    const [card, setCard] = useState([1,2,3])

    const handleOnChange = e => {
        setFilter({
            ...filter,
            sort: e.target.value
        })
    }
    return (
        loading || user === null ? <Spinner /> :( user.role === 1? <Redirect to="/adminDashboard"/> :
        <DashboardWrap onClick={() => filter.active && setFilter({...filter, active: !filter.active})}>
            <Subtitle>Welcome back {user.name}</Subtitle>
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
                {card.map(card => <History />)
                }
            </HistoryWrap>
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
const Title = styled.h1`
    color: ${props => props.theme.lightBlue};
    letter-spacing: 1px;
`
const FormWrap = styled.form`
    top: 105px;
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

export default connect(mapStateToProps)(UserDashboard);