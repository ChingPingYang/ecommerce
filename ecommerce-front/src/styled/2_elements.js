import styled from 'styled-components';

export const Form = styled.form`
    width: 800px;
    height: 300px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.primWhite};
`;

export const InputWrap = styled.div`
    width: 80%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0px;
    border: 1px solid red;
`;

export const Input = styled.input`
    width: 100%;
    
    outline: none;
    border: none;
`