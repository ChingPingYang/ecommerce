import React from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

const Alert = ({ alert }) => {
    console.log('ALERT: ', alert);
    return (
        <>
           {alert.length > 0 && alert.map(alert => {
               console.log('in maping');
               return (
                //Don't use "index", the ID has to be "uuid", otherwise the conponent render will have bug
                <AlertWrap key={alert.id} kind={alert.kind}>
                    <h3>{alert.message}</h3>
                </AlertWrap>            
               )
            })
            }
        </>
    )
}

const AnimateIn = keyframes`
    0% {
        opacity: 0;
        top: 10%;
    }
    30% {
        opacity: 1;
        top: 15%;
    }
    70% {
        opacity: 1;
        top: 15%;
    }
    100% {
        opacity: 0;
        top: 20%;
    }
`

const AlertWrap = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${props => props.theme.primWhite};
    border: 1px solid ${props => props.kind === 'error'? props.theme.error : props.theme.success};
    border-radius: 50px;
    /* z-index: 1000; */
    /* animation: ${AnimateIn} 3s ease-in-out; */
    /* animation-fill-mode: forwards; */
    h3 {
        min-width: 400px;
        text-align: center;
        margin: 10px;
        color: ${props => props.kind === 'error'? props.theme.error : props.theme.success};
    }
`

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
}

export default connect(mapStateToProps)(Alert);