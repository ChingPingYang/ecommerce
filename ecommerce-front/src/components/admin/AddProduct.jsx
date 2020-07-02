import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addProduct } from '../../actions/productAction';
import { getAllCategories } from '../../actions/categoryAction';

const AddProduct = ({category: { categories, loading }, addProduct, getAllCategories}) => {
    const [data, setData] = useState({
        imageName: "Choose a file*"
    });
    const [temp, setTemp] = useState(['react','Javascript','Vue']);

    useEffect(() => {
        getAllCategories();
    },[getAllCategories])
    
    const handleOnChange = (e) => {
        if(e.target.name === "imageURL"){
            setData({
                ...data,
                [e.target.name]: e.target.files[0],
                imageName: e.target.files[0].name
            })
        } else {
            setData({
                ...data,
                [e.target.name]: e.target.value
            })
        }
        console.log(data)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addProduct(data);
    }
    return (
        <MainWrap>  
            <Form onSubmit={handleSubmit}>
                <Title>Add new product</Title>
                <InputWrap>
                    <Label htmlFor="name">
                        Name*
                    </Label>
                    <Input 
                        type="text" 
                        id="name" 
                        name="name" 
                        onChange={handleOnChange}
                        required
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="category">
                        Category*
                    </Label>
                    <SelectOption name="category" id="category" onChange={handleOnChange} required>
                        <option value="">Choose a category</option>
                        {!loading && categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}                        
                    </SelectOption>
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="price">
                        Price*
                    </Label>
                    <Input 
                        type="number" 
                        id="price" 
                        name="price" 
                        onChange={handleOnChange}
                        required
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="quantity">
                        Quantity*
                    </Label>
                    <Input 
                        type="number" 
                        id="quantity" 
                        name="quantity" 
                        onChange={handleOnChange}
                        required
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
                    <Label htmlFor="description">
                        Description
                    </Label>
                    <TextArea 
                        rows="10"
                        cols="10"
                        id="description" 
                        name="description" 
                        onChange={handleOnChange}
                        
                    />
                </InputWrap>
                <ImageInputWrap>
                    <ImageLabel 
                        htmlFor="imageURL" 
                        imageName={data.imageName}
                    >
                        Image
                    </ImageLabel>
                    <ImageInput 
                        type="file" 
                        id="imageURL" 
                        name="imageURL"
                        accept="image/png, image/jpeg"
                        onChange={handleOnChange}
                    />
                    <ImageState>{data.imageName}</ImageState>
                </ImageInputWrap>
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    input[type=number] {
    -moz-appearance: textfield;
    }
`

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
    color: ${props => props.theme.brandBlue};
    font-size: 1rem;
    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.lightBlue};
        box-shadow: 0px 0px 4px 1px ${props => props.theme.lightGray};
        transition: 0.3s;
    }
`
const SelectOption = styled.select`
    width: 100%;
    height: 40px;
    margin: 5px 0;
    padding-left: 10px;
    background-color: white;
    font-size: 1rem;
    outline: none;
    border: 1px solid ${props => props.theme.lightGray};
    transition: 0.3s;
    color: ${props => props.theme.brandBlue};
    font-size: 1rem;
    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.lightBlue};
        box-shadow: 0px 0px 4px 1px ${props => props.theme.lightGray};
        transition: 0.3s;
    }
`
const TextArea = styled.textarea`
    margin: 5px 0;
    padding-top: 5px;
    padding-left: 10px;
    outline: none;
    border: 1px solid ${props => props.theme.lightGray};
    transition: 0.3s;
    color: ${props => props.theme.darkGray};
    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.lightBlue};
        box-shadow: 0px 0px 4px 1px ${props => props.theme.lightGray};
        transition: 0.3s;
    }
`
const ImageInputWrap = styled.div`
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 15px 0px;
`
const ImageLabel = styled.label`
    width: 100px;
    height: 30px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: ${props => props.imageName === "Choose a file*"? props.theme.darkGray : props.theme.primWhite};
    background-color: ${props => props.imageName === "Choose a file*"? "none" : props.theme.darkGray};
    border: solid 1px ${props => props.theme.lightGray};
    border-radius: 20px;
    transition: 0.3s;
`
const ImageInput = styled.input`
    display: none;
`
const ImageState = styled.div`
    font-size: 0.9rem;
    color: ${props => props.theme.darkGray};
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
const mayStateToProps = state => {
    return {
        category: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addProduct: (data) => dispatch(addProduct(data)),
        getAllCategories: () => dispatch(getAllCategories())
    }
}



export default connect(mayStateToProps, mapDispatchToProps)(AddProduct);