import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alertAction';
import { setSelectedCategories } from '../../actions/categoryAction';

const SideFilter = ({product:{search}, priceRange, setPriceRange, category, setNewCategories, setAlert, setSelectedCategories}) => {
    const { categories, selectedCategories } = category;
    useEffect(() => {
        // Check if the old priceRange is valid. If not, put the original one.
        let priceRangeCopy = {};
        if(priceRange.start >= priceRange.end) {
            priceRangeCopy = {start: 0, end: 1000000};
            setAlert('Please insert correct price range.');
        } else {
            priceRangeCopy = priceRange;
        }
        // Retrieve products base on new selected categories.
        if(selectedCategories.length > 0) {
            setNewCategories(search, selectedCategories, priceRangeCopy);
        } else if(selectedCategories.length === 0) {
            setNewCategories(search, [...categories], priceRangeCopy);
        }
    },[selectedCategories])

    const handleSelectionChange = (e) => {
        setSelectedCategories(e, selectedCategories);
    }

    const handlePriceOnchange = (e) => {
        setPriceRange({
            ...priceRange,
            [e.target.name]: Number(e.target.value)
        })
    }
    const handlePriceOnSubmit = (e) => {
        e.preventDefault();
        let priceRangeCopy = priceRange;
        if(priceRangeCopy.start > priceRangeCopy.end) {
            setPriceRange({start: 0, end: 1000000})
            return setAlert('Minimum price must be smaller than Maximum price.');
        } else if(priceRangeCopy.start === 0 && priceRangeCopy.end === 0) {
            setPriceRange({start: 0, end: 1000000})
            priceRangeCopy = {start: 0, end: 1000000};
        }
         else if(priceRangeCopy.start === priceRangeCopy.end) {
            setPriceRange({start: 0, end: 1000000})
            return setAlert('Prices must be different.');
        }
        if(selectedCategories.length === 0) {
            setNewCategories(search, [...categories], priceRangeCopy);
        } else {
            setNewCategories(search, selectedCategories, priceRangeCopy);
        }
    }

    return (
        <Wrap>
            <SectionWrap>
                <SectionTitle>
                    Categories
                </SectionTitle>
                <CheckboxForm onChange={handleSelectionChange}>
                    {categories.map(category => (
                        <label key={category._id}>
                            <input type="checkbox" name={category.name} value={category._id}/>
                            <span>{category.name}</span>
                        </label>    
                    ))}
                </CheckboxForm>
            </SectionWrap>
            <SectionWrap>
                <SectionTitle>
                    Price Range
                </SectionTitle>
                <PriceForm onSubmit={handlePriceOnSubmit}>
                    <InputWrap>
                        <input type="number" name="start" id="start" step="any" onChange={handlePriceOnchange} />
                        <label htmlFor="start">min.</label>
                    </InputWrap>
                    <InputWrap>
                        <input type="number" name="end" id="end" step="any" onChange={handlePriceOnchange} />
                        <label htmlFor="end">max.</label>
                    </InputWrap>
                    <BtnWrap>
                        <input type="submit" value="Submit" />
                    </BtnWrap>
                </PriceForm>
            </SectionWrap>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
`
const SectionWrap = styled.div`
    border-bottom: solid 1px ${props => props.theme.lightGray};
    margin-bottom: 10px;
    padding-bottom: 10px;
`
const SectionTitle = styled.div`
    font-weight: 600;
    margin-bottom: 10px;
`
const CheckboxForm = styled.form`
    display: flex;
    flex-direction: column;
    label {
        cursor: pointer;
        width: 200px;        
        margin-bottom: 10px;
        input {
            display: none;
            &:checked + span {
                font-weight: 600;
                &:before {
                    content: "";
                    position: absolute;
                    background-color: ${props => props.theme.brandBlue};
                    border: solid 1px ${props => props.theme.brandBlue};
                }
                &:after {
                    content: "";
                    position: absolute;
                    width: 5px;
                    height: 10px;
                    top: 2px;
                    left: -20px;
                    border-bottom: solid 2px white;
                    border-right: solid 2px white;
                    transform: rotate(40deg);
                }
            }     
        }
        span {
            margin-left: 25px;
            position: relative;
            &:before {
                content: "";
                position: absolute;
                width: 15px;
                height: 15px;
                top: 1px;
                left: -25px;
                border: solid 1px ${props => props.theme.darkGray};
                border-radius: 2px;
            }
        }
    }
`
const PriceForm = styled.form`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`
const InputWrap = styled.div`
    margin: 0px 20px 10px 0px;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    }
    input[type=number] {
    -moz-appearance: textfield;
    width: 50px;
    height: 20px;
    padding-left: 2px;
    outline: none;
    border: 1px solid ${props => props.theme.lightGray};
    transition: 0.3s;
    color: ${props => props.theme.brandBlue};
    font-size: 0.8rem;
    &:focus {
        outline: none;
        border: 1px solid ${props => props.theme.lightBlue};
        box-shadow: 0px 0px 4px 1px ${props => props.theme.lightGray};
        transition: 0.3s;
    }
    }
    label {
        display: block;
        text-align: center;
        font-size: 0.8rem;
        color: ${props => props.theme.darkGray};
    }
`
const BtnWrap = styled.div`
    input {
        /* all: unset; */
        font-size: 0.8rem;
        width: 50px;
        height: 20px;
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

const mapStateToProps = state => {
    return {
        product: state.product,
        category: state.category
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setAlert: (message) => dispatch(setAlert(message)),
        setSelectedCategories: (e, old) => dispatch(setSelectedCategories(e, old))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideFilter);