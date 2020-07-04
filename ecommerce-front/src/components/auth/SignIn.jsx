import React, {useState} from 'react';
import styled from 'styled-components';
import { signIn } from '../../actions/authAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SignIn = ({signIn}) => {
    const [show, setShow] = useState(false);
    const [credential, setCredential] = useState({
        email: "",
        password: ""
    });
    const handleShow = (e) => {
        e.preventDefault();
        setShow(!show)
    }
    const handleOnChange = (e) => {
        setCredential({
            ...credential,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        signIn(credential);
    }
    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Title>SIGN IN</Title>
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
                        type={show? "text" : "password"} 
                        id="password" 
                        name="password"
                        onChange={handleOnChange}
                        value={credential.password}
                    />
                </InputWrap>
                <BtnWrap>
                    <input type="submit" value="Sign in" />
                    <StyledLink to="/signup">Create an account</StyledLink>
                </BtnWrap>
                <ShowBtn onClick={handleShow}>{show === true? 'Hide' : 'Show'}</ShowBtn>
            </Form>
        </>
    )
}

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
    margin-left: -260px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
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
const StyledLink = styled(Link)`
    all: unset;
    cursor: pointer;
    font-size: 1.1rem;
    color: ${props => props.theme.lightBlue};
    transition: 0.2s;
    &:hover {
        color: ${props => props.theme.darkBlue};
    }
`
const ShowBtn = styled.button`
    all: unset;
    cursor: pointer;
    color: ${props => props.theme.lightBlue};
    position: relative;
    font-size: 13px;
    top: -83px;
    left: 170px;
`

const mapDispatchToProps = dispatch => {
    return {
        signIn: (credential) => dispatch(signIn(credential))
    }
}


export default connect(null, mapDispatchToProps)(SignIn);