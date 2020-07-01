import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createCategory, getAllCategories } from '../../actions/categoryAction';
import { connect } from 'react-redux';

const CreateCategory = ({ category: { category, categories, loading, error}, createCategory, getAllCategories}) => {
    useEffect(() => {
        getAllCategories()
    }, [category, createCategory, getAllCategories]);

    const [categoryName, setCategoryName] = useState('');
    const handleOnChange = (e) => {
        setCategoryName(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(categoryName);
    }
    return (
        <MainWrap>  
            <Form onSubmit={handleSubmit}>
                <Title>Create a new category</Title>
                <InputWrap>
                    <Label htmlFor="category">
                        Category Name
                    </Label>
                    <Input 
                        type="text" 
                        id="category" 
                        name="category" 
                        onChange={handleOnChange}
                        value={categoryName}
                        err={error}
                    />
                </InputWrap>
                <BtnWrap>
                    <input type="submit" value="Submit" />
                </BtnWrap>
            </Form>
            <CategoryWrap>
                <h2>Existing Categories</h2>
                <div>
                    {categories.length > 0 && !loading?
                        <>{
                            categories.map(category => <h3 key={category._id}>{category.name}</h3>)
                        }</>:
                        <h4>No category so far...</h4>
                    }
                </div>
            </CategoryWrap>
        </MainWrap>
    )
}
export const MainWrap = styled.div`
    width: 100%;
    border: soild red 1px;
    display: flex;
    justify-content: space-between;
`

export const Form = styled.form`
    width: 800px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    margin: 55px 30px;
`;

export const Title = styled.h1`
    font-weight: 900;
    font-size: 2.5rem;
    color: ${props => props.theme.lightBlue};
`

export const InputWrap = styled.div`
    width: 50%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: left;
    margin: 15px 0px;
`;

export const Label = styled.label`
    color: ${props => props.theme.darkGray};
`

export const Input = styled.input`
    width: 100%;
    height: 40px;
    margin: 5px 0;
    padding-left: 10px;
    outline: none;
    border: 1px solid ${props => props.err === null? props.theme.lightGray : "red"};
    transition: 0.3s;
    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.lightBlue};
        box-shadow: 0px 0px 4px 1px ${props => props.theme.lightBlue};
        transition: 0.3s;
    }
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

export const CategoryWrap = styled.div`
    width: 600px;
    height: 300px;
    margin: 55px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
        color: ${props => props.theme.darkGray};
    }
    div {
        margin-top: 20px;
        max-width: 500px;
        display: flex;
        flex-wrap: wrap;
        h3 {
            border: solid 1px ${props => props.theme.lightBlue};
            border-radius: 30px;
            flex-basis: 60px;
            font-size: 0.9rem;
            font-weight: 400;
            color: ${props => props.theme.lightBlue};
            margin: 0px 15px 15px 0px;
            padding: 3px 10px;
            text-align: center;
        }
        h4 {
            color: ${props => props.theme.lightGray};
        }
    }
`

const mapStateToProps = state => {
    return {
        category: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createCategory: (category) => dispatch(createCategory(category)),
        getAllCategories: () => dispatch(getAllCategories())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateCategory);