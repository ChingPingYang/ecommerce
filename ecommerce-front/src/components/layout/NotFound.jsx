import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
    console.log(process.env.NODE_ENV)
    console.log(process.env.REACT_APP_PROXY)
    return (
        <Wrapper>
            <NotFoundMsg>Page Not Found</NotFoundMsg>
            <Sub>Sorry, this page does not exist...</Sub>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NotFoundMsg = styled.h1`
    color: ${props => props.theme.brandBlue};
    font-size: 3rem;
`
const Sub = styled.h3`
    margin-top: 10px;
    color: ${props => props.theme.darkGray};
    font-weight: 400;
`

export default NotFound;


// http://157.245.160.22:8000