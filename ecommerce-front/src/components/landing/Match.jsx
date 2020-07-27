import React from 'react';
import styled from 'styled-components';

const Match = ({ handleMatch }) => {    
    return (
        <MatchWrap>
            <Form onChange={handleMatch}>
                <SelectOption name="category" id="category" required>
                    <option value="">Sort</option>
                    <option value="Low-Hight">Price Low-Hight</option>
                    <option value="Hight-Low">Price Hight-Low</option>
                    <option value="Sold">Sold</option>                          
                </SelectOption>
            </Form>
        </MatchWrap>
    )
}

const MatchWrap = styled.div`
    width: 85%;
    height: 80px;
    padding-right: 20px;
    background-color: ${props => props.theme.primWhite};
`
const Form = styled.form`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
`

const SelectOption = styled.select`
    width: 200px;
    height: 40px;
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

export default Match;