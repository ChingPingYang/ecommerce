import React , { useState }from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const { imageURL, name, description, price } = product;
    const [text, setText] = useState(`A book which is talk about love. Lets dance cry oute talk about love. Try dance cry oute.  which is talk about love. And dance cry oute talk about love. And dance cry oute`)

    const titleTruncate = (string) => {
        if(string.length > 50) {
            const newString = string.slice(0, 50).concat('...');
            return newString;
        }
        return string
    }
    const descriptionTruncate = (string) => {
        if(string.length > 130) {
            const newString = string.slice(0, 130).concat('...');
            return newString;
        }
        return string
    }
    return (
        
        <Wrap>
            
                <Image imgURL={imageURL}/>
                <ContentWrap>
                    <Title>{titleTruncate(name)}</Title>
                    <Description>{descriptionTruncate(description)}</Description>
                    <Price>{`$${price}`}</Price>
                </ContentWrap>
            
        </Wrap>
        
    )
}

const Wrap = styled(Link)`
    all: unset;
    width: 225.8px;
    height: 425.8px;
    display: flex;
    cursor: pointer; 
    flex-direction: column;
`
const Image = styled.div`
    width: 100%;
    height: 225.8px;
    background: url(${props => `http://localhost:8000${props.imgURL}`}) no-repeat;
    background-position: center;
`
const ContentWrap = styled.div`
    width: 100%;
    height: 192px;
    margin-top: 8px;
    display: flex;
    flex-direction: column;
`
const Title = styled.div`
    font-weight: 400;
    font-size: 1.1rem;
    line-height: 1.7rem;
    margin-bottom: 4px;
    word-spacing: 0.2rem;
    color: black;
`
const Description = styled.div`
    font-weight: 300;
    margin-bottom: 8px;
    word-spacing: 0.15rem;
    color: ${props => props.theme.darkGray};
    
`
const Price = styled.div`
    font-weight: 600;
    font-size: 1.5rem;
    color: ${props => props.theme.lightBlue};
`

export default Product;