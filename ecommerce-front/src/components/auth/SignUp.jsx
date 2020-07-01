import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signUp } from '../../actions/authAction';

const SignUp = ({register}) => {
    const [credential, setCredential] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleOnChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(credential);
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Title>SIGN UP</Title>
                <InputWrap>
                    <Label htmlFor="name">
                        Name
                    </Label>
                    <Input 
                        type="text" 
                        id="name" 
                        name="name" 
                        onChange={handleOnChange}
                        value={credential.name}
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="email">
                        Email Address
                    </Label>
                    <Input 
                        type="email" 
                        id="email" 
                        name="email" 
                        onChange={handleOnChange}
                        value={credential.email}
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input 
                        autocomplete="on"
                        type="password"
                        id="password" 
                        name="password"
                        onChange={handleOnChange}
                        value={credential.password}
                    />
                </InputWrap>
                <BtnWrap>
                    <input type="submit" value="Sign up" />
                </BtnWrap>
            </Form>
        </>
    )
}

const Form = styled.form`
    width: 800px;
    display: flex;
    flex-flow: column;
    align-items: center;
    margin: 55px 30px;
`;

const Title = styled.h1`
    font-weight: 900;
    font-size: 2.5rem;
    margin-left: -248px;
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
        box-shadow: 0px 0px 4px 1px ${props => props.theme.lightBlue};
        transition: 0.3s;
    }
`

const BtnWrap = styled.div`
    width: 50%;
    height: 35px;
    margin-top: 10px;
    input {
        all: unset;
        font-size: 1.1rem;
        width: 100px;
        height: 35px;
        text-align: center;
        cursor: pointer;
        color: ${props => props.theme.primWhite};
        background-color: ${props => props.theme.interactive};
        transition: 0.2s;
        &:hover {
            background-color: ${props => props.theme.interactiveDark};
        }
    }
`

const mapDispatchToProps = dispatch => {
    return {
        register: (credential) => dispatch(signUp(credential))
    }
}

export default connect(null, mapDispatchToProps)(SignUp);