import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import History from './History';

const UserDashboard = ({ auth: {user, loading}}) => {
    const [filter, setFilter] = useState({
        active: false,
        sort: '- Sort By -'
    });
    const [card, setCard] = useState([1,2,3])

    const handleOnChange = e => {
        console.log(e.target.value)
        setFilter({
            ...filter,
            sort: e.target.value
        })
    }
    return (
        loading || user === null ? <Spinner /> :
        <DashboardWrap>
            <Subtitle>Welcome back James</Subtitle>
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
        </DashboardWrap>
    )
}

const DashboardWrap = styled.div`
    width: 70%;
    position: relative;
    margin: auto;
    border: solid 4px red;
    display: flex;
    flex-flow: column;
    padding-top: 20px;
    /* align-items: center; */
`
const Subtitle = styled.h3`
    font-weight: 500;
    font-size: 1rem;
    letter-spacing: 2px;
    
`
const Title = styled.h1`
    
`
const FormWrap = styled.form`
    width: 100px;
    
`
const SortTitle = styled.div`
    border: 1px solid ${props => props.theme.midGray};
    padding: 3px; 
    cursor: pointer;
    text-align: center;
`

const DropDown = styled.div`    
    background-color: red;
    width: 100%;
    height: 0px;
    text-align: center;
    opacity: 0;
    transition: 0.3s;
    overflow: scroll;
    ${props => props.active && css`
        height: 75px;
        opacity: 1;
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
        background-color: pink;
        &:hover {
        background-color: yellow;
        }
    }
`
const HistoryWrap = styled.div`
    width: 100%;
    
    /* border: solid 1px green; */
`
const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(UserDashboard);