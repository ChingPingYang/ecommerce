import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return(
        <FooterWrap>
            <h4>The payment system is powered by Braintree sandbox.</h4>
            <h4>For testing payment gateway, please refer to <a href="https://developers.braintreepayments.com/reference/general/testing/node" target="_blank">Braintree sandbox</a>.</h4>
            <h5>© {new Date().getFullYear()} <a href="https://chingpingyang.com" target="_blank">ChingPing Yang</a></h5>
        </FooterWrap>
    )
}

const FooterWrap = styled.div`
    width: 100%;
    height: 150px;
    background-color: ${props => props.theme.lightGray};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h4 {
        margin-top: 4px;
        color: ${props => props.theme.darkGray};
        font-weight: 300;
        
    }
    h5 {
        margin-top: 20px;
        color: ${props => props.theme.darkGray};
        font-weight: 300;
        
    }
`

export default Footer;