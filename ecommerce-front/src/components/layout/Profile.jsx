import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { setAlert } from '../../actions/alertAction';
import { updateProfile } from '../../actions/authAction';

const Profile = ({ auth: { user }, history, updateProfile, setAlert }) => {
    const [credential, setCredential] = useState({
        name: "",
        password: "",
        rePassword: ""
    })
    const handleOnChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const passwordLength = credential.password.length;
        if(passwordLength > 0 && passwordLength < 6) {
            return setAlert('Password has to be at least 6 characters.')
        } else if(passwordLength > 0) {
            if(credential.password !== credential.rePassword) return setAlert("Passwords don't match.");
        }
        updateProfile(user._id, credential);
        history.push('/');
    }
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <Title>Update Profile</Title>
                <InputWrap>
                    <Label htmlFor="name">
                        New Name
                    </Label>
                    <Input 
                        type="text" 
                        id="name" 
                        name="name" 
                        onChange={handleOnChange}
                        value={credential.name}
                        placeholder={user.name}
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="email">
                        New Password
                    </Label>
                    <Input 
                        type="password" 
                        id="password" 
                        name="password"
                        minLength="6"
                        onChange={handleOnChange}
                        value={credential.password}
                    />
                </InputWrap>
                <InputWrap>
                    <Label htmlFor="password">
                        Retype Password
                    </Label>
                    <Input 
                        type="password"
                        id="rePassword" 
                        name="rePassword"
                        minLength="6"
                        onChange={handleOnChange}
                        value={credential.rePassword}
                    />
                </InputWrap>
                <BtnWrap>
                    <input type="submit" value="Update" />
                </BtnWrap>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 70%;
`

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
    margin-left: -135px;
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

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (userId, credential) => dispatch(updateProfile(userId, credential)),
        setAlert: (message) => dispatch(setAlert(message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);