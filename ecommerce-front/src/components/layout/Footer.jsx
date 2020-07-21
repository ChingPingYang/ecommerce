import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return(
        <FooterWrap />
    )
}

const FooterWrap = styled.div`
    width: 100%;
    height: 350px;
    background-color: ${props => props.theme.lightGray};
`

export default Footer;