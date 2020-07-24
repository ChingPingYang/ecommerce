import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

const SearchBox = () => {
    const [search, setSearch] = useState("");

    const handleOnchange = (e) => {
        setSearch(e.target.value)
    }
    const handleReset = (e) => {
        e.preventDefault();
        setSearch("")
    }
    return (
        <Form>
            <input type="text" name="text" placeholder="Search Your Book" onChange={handleOnchange} value={search}/>
            <BtnWrap>
                <Reset test={search.length === 0 ? false : true} onClick={handleReset}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="15" height="15" fill="white"/>
                        <circle cx="7.5" cy="7.5" r="6.5" fill="#CBCFD3"/>
                        <path d="M10.3536 5.35357C10.5488 5.15831 10.5488 4.84172 10.3536 4.64646C10.1583 4.4512 9.84171 4.4512 9.64645 4.64646L10.3536 5.35357ZM4.64645 9.64646C4.45118 9.84172 4.45118 10.1583 4.64645 10.3536C4.84171 10.5488 5.15829 10.5488 5.35355 10.3536L4.64645 9.64646ZM9.64645 4.64646L4.64645 9.64646L5.35355 10.3536L10.3536 5.35357L9.64645 4.64646Z" fill="white"/>
                        <path d="M9.64645 10.3536C9.84171 10.5488 10.1583 10.5488 10.3536 10.3536C10.5488 10.1583 10.5488 9.84171 10.3536 9.64645L9.64645 10.3536ZM5.35355 4.64645C5.15829 4.45118 4.84171 4.45118 4.64645 4.64645C4.45119 4.84171 4.45119 5.15829 4.64645 5.35355L5.35355 4.64645ZM10.3536 9.64645L5.35355 4.64645L4.64645 5.35355L9.64645 10.3536L10.3536 9.64645Z" fill="white"/>
                    </svg>
                </Reset>
                <Submit>
                    <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8.5" cy="8.5" r="7.75" stroke="#0028FF" strokeWidth="1.5"/>
                        <path d="M14 14L21 21" stroke="#0028FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </Submit>
            </BtnWrap>
        </Form>
    )
}

const Form = styled.form`
    position: relative;
    width: 350px;
    margin-left: 100px;
    input {
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
            box-shadow: 0px 0px 4px 1px ${props => props.theme.lightBlue};
            transition: 0.3s;
        }
    }
`
const BtnWrap = styled.div`
    position: absolute;
    top: 6px;
    left: 286px;
    height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const Reset = styled.button`
    all: unset;
    position: relative;
    pointer-events: none;
    left: -12px;
    opacity: 0;
    transition: 0.3s;
    cursor: pointer;
    &:after {
        content: "";
        position: absolute;
        height: 25px;
        left: 28px;
        top: -4px;
        border-right: solid 1px ${props => props.theme.lightGray};
    }
    ${props => props.test && css`
        opacity: 1;
        pointer-events: all;
        left: -24px;
    `}
`

const Submit = styled.button`
    all: unset;
    width: 45px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    
`

export default SearchBox;