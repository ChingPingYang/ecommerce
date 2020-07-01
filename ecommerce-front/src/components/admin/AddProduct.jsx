import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const AddProduct = () => {

    
    const handleOnChange = (e) => {
        console.log(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    return (
        <MainWrap>  
            <Form onSubmit={handleSubmit}>
                <Title>Add new product</Title>
                <InputWrap>
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input 
                        type="text" 
                        id="name" 
                        name="name" 
                        onChange={handleOnChange}
                        
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="name">
                        Description
                    </Label>
                    <Input 
                        type="text" 
                        id="name" 
                        name="name" 
                        onChange={handleOnChange}
                        
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="category">
                        Category
                    </Label>
                    <Input 
                        type="text" 
                        id="category" 
                        name="category" 
                        onChange={handleOnChange}
                        
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="price">
                        Price
                    </Label>
                    <Input 
                        type="text" 
                        id="price" 
                        name="price" 
                        onChange={handleOnChange}
                        
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="quantity">
                        Quantity
                    </Label>
                    <Input 
                        type="number" 
                        id="quantity" 
                        name="quantity" 
                        onChange={handleOnChange}
                        
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="sold">
                        Sold
                    </Label>
                    <Input 
                        type="number" 
                        id="sold" 
                        name="sold" 
                        onChange={handleOnChange}
                        
                    />
                </InputWrap>
                <InputWrap>
                    <ImageLabel htmlFor="imageURL">
                        Image
                    </ImageLabel>
                    <ImageBtn 
                        type="file" 
                        id="imageURL" 
                        name="imageURL"
                        onChange={handleOnChange}
                    />
                </InputWrap>
                <BtnWrap>
                    <input type="submit" value="Submit" />
                </BtnWrap>
            </Form>
           
        </MainWrap>
    )
}
const MainWrap = styled.div`
    width: 100%;
    border: soild red 1px;
    display: flex;
    justify-content: space-between;
`

const Form = styled.form`
    width: 800px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 55px 30px;
`;

const Title = styled.h1`
    font-weight: 900;
    font-size: 2.5rem;
    color: ${props => props.theme.lightBlue};
`

const InputWrap = styled.div`
    width: 50%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: left;
    margin: 15px 0px;
`;

const Label = styled.label`
    color: ${props => props.theme.darkGray};
`

const Input = styled.input`
    width: 100%;
    height: 40px;
    margin: 5px 0;
    padding-left: 10px;
    outline: none;
    border: 1px solid ${props => props.theme.lightGray};
    transition: 0.3s;
    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.lightBlue};
        box-shadow: 0px 0px 4px 1px ${props => props.theme.lightGray};
        transition: 0.3s;
    }
`

const ImageLabel = styled.label`
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${props => props.theme.darkGray};
    border: solid 1px ${props => props.theme.lightGray};
    border-radius: 20px;
`

const ImageBtn = styled.input`
    display: none;
    border: solid 1px red;
    width: 100px;
`

const BtnWrap = styled.div`
    width: 50%;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
        all: unset;
        font-size: 1.1rem;
        width: 100px;
        height: 35px;
        cursor: pointer;
        text-align: center;
        color: ${props => props.theme.primWhite};
        background-color: ${props => props.theme.interactive};
        transition: 0.2s;
        &:hover {
            background-color: ${props => props.theme.interactiveDark};
        }
    }
`



export default connect()(AddProduct);