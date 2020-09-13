import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const Product = ({ product, skeleton = false }) => {
    const imageURL = product? product.imageURL : null;
    const name = product? product.name : null;
    const description = product? product.description : null;
    const price = product? product.price : null;
    const quantity = product? product.quantity : null;
    const sold = product? product.sold : null;

    const titleTruncate = (string) => {
        if(string.length > 50) {
            const newString = string.slice(0, 50).concat('...');
            return newString;
        }
        return string
    }
    const descriptionTruncate = (string) => {
        if(string.length > 80) {
            const newString = string.slice(0, 80).concat('...');
            return newString;
        }
        return string
    }
    return (
        
        <Wrap to={`/product/${product?._id}`}>
            <ImageWrap skeleton={skeleton}>
                {!skeleton && 
                 <img src={imageURL} alt={name}/>
                }
            </ImageWrap>
            <ContentWrap>
                <Title skeleton={skeleton}>{!skeleton && titleTruncate(name)}</Title>
                <Description skeleton={skeleton}>{!skeleton && descriptionTruncate(description)}</Description>
                <Price skeleton={skeleton}>{!skeleton && `$${price}`}</Price>
                <SoldWrap skeleton={skeleton}>
                    {skeleton? <div></div> : <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="15" height="15" fill="white"/>
                        <path d="M1 4L3 11H12L14 4L9.5 8L7.5 2L5.5 8L1 4Z" stroke="#FF328C" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3 13H12" stroke="#FF328C" strokeLinecap="round"/>
                    </svg>}
                    <h5>{!skeleton && `Sold: ${sold}`}</h5>
                </SoldWrap>
                <StockWrap skeleton={skeleton}>
                    {quantity > 0 ?
                    <>
                        {skeleton? <div></div> : <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="15" height="15" fill="white"/>
                            <circle cx="7.5" cy="7.5" r="6" stroke="#10e33b"/>
                            <path d="M4.5 7.5L7 10L11 6" stroke="#10e33b" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>}
                        <h5>{!skeleton && `In stock: ${quantity}`}</h5>
                    </>
                    :
                    <>
                        {skeleton? <div></div> : <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="6.5" cy="6.5" r="6" stroke="#FF284B"/>
                            <path d="M9.35355 4.35357C9.54882 4.15831 9.54882 3.84172 9.35355 3.64646C9.15829 3.4512 8.84171 3.4512 8.64645 3.64646L9.35355 4.35357ZM3.64645 8.64646C3.45118 8.84172 3.45118 9.15831 3.64645 9.35357C3.84171 9.54883 4.15829 9.54883 4.35355 9.35357L3.64645 8.64646ZM8.64645 3.64646L3.64645 8.64646L4.35355 9.35357L9.35355 4.35357L8.64645 3.64646Z" fill="#FF284B"/>
                            <path d="M8.64645 9.35355C8.84171 9.54882 9.15829 9.54882 9.35355 9.35355C9.54882 9.15829 9.54882 8.84171 9.35355 8.64645L8.64645 9.35355ZM4.35355 3.64645C4.15829 3.45118 3.84171 3.45118 3.64645 3.64645C3.45119 3.84171 3.45119 4.15829 3.64645 4.35355L4.35355 3.64645ZM9.35355 8.64645L4.35355 3.64645L3.64645 4.35355L8.64645 9.35355L9.35355 8.64645Z" fill="#FF284B"/>
                        </svg>}
                        <h5>{!skeleton && `Not in stock`}</h5>
                    </>
                    }
                </StockWrap>
            </ContentWrap>
        </Wrap>
        
    )
}

const Wrap = styled(Link)`
    all: unset;
    width: 225.8px;
    height: 425.8px;
    display: flex;
    margin-top: 20px;
    margin-right: 1%;
    cursor: pointer; 
    flex-direction: column;
`

const ImageWrap = styled.div`
    width: 100%;
    height: 225.8px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    ${props => props.skeleton && css`
        background-color: ${props => props.theme.lightGray};
    `}
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
    line-height: 1.5rem;
    margin-bottom: 4px;
    word-spacing: 0.2rem;
    color: black;
    ${props => props.skeleton && css`
        background-color: ${props => props.theme.lightGray};
        width: 100%;
        height: 1rem;
    `}
`
const Description = styled.div`
    font-weight: 300;
    margin-bottom: 8px;
    word-spacing: 0.15rem;
    color: ${props => props.theme.darkGray};
    ${props => props.skeleton && css`
        background-color: ${props => props.theme.lightGray};
        width: 80%;
        height: 0.7rem;
        margin-top: 5px;
    `}
`
const Price = styled.div`
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 5px;
    color: ${props => props.theme.lightBlue};
    ${props => props.skeleton && css`
        background-color: ${props => props.theme.lightGray};
        width: 25%;
        height: 0.7rem;
        margin-top: 5px;
    `}
`
const SoldWrap = styled.div`
    display: flex;
    margin-top: 1px;
    svg {
        margin-top: 1px;
    }
    h5 {
        font-weight: 400;
        margin-left: 5px;
        color: ${props => props.theme.darkGray};
        ${props => props.skeleton && css`
        background-color: ${props => props.theme.lightGray};
        width: 25%;
        height: 0.7rem;
        margin-top: 2px;
        `}
    }
    div {
        border-radius: 100%;
        width: 15px;
        height: 15px;
        background-color: ${props => props.theme.lightGray};
    }
`
const StockWrap = styled.div`
    margin-top: 1px;
    display: flex;
    svg {
        margin-top: 1px;
    }
    h5 {
        font-weight: 400;
        margin-left: 5px;
        color: ${props => props.theme.darkGray};
        ${props => props.skeleton && css`
        background-color: ${props => props.theme.lightGray};
        width: 25%;
        height: 0.7rem;
        margin-top: 2px;
        `}
    }
    div {
        border-radius: 100%;
        width: 15px;
        height: 15px;
        background-color: ${props => props.theme.lightGray};
    }
`

export default Product;