import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const AdminDashboard = () => {
    return (
        <DashboardWrap>
            <StyledLink to="/admin/createCategory">Create Category</StyledLink>
            <StyledLink to="/admin/addProduct">Add Product</StyledLink>
        </DashboardWrap>
        
    )
}

const DashboardWrap = styled.div`
    width: 70%;
    position: relative;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 200px;
`
const StyledLink = styled(Link)`
    all: unset;
    font-size: 1.1rem;
    width: 300px;
    height: 80px;
    text-align: center;
    padding-top: 50px;
    color: ${props => props.theme.primWhite};
    background-color: ${props => props.theme.interactive};
    transition: 0.2s;
    box-shadow: 0px 5px 20px -5px rgba(1, 1, 1, 0.2);
    cursor: pointer;
    &:hover {
        background-color: ${props => props.theme.interactiveDark};
    }
`


export default AdminDashboard;