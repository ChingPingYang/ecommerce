import axios from 'axios';
import { setAlert } from './alertAction';
import setTokenHeader from '../util/setTokenHeader';

export const getUser = () => async dispatch => {
    if(localStorage.token) setTokenHeader(localStorage.token);
    try {
        const res = await axios.get('/api/auth');
        dispatch({ type: "GOT_USER", payload: res.data});
    } catch(err) {
        dispatch({ type: 'GETUSER_FAILED' });
    }
}

export const signIn = credential => async dispatch => {
    const { email, password } = credential;
    try {
        const config = {
            headers: { "Content-Type": "application/json"}
        }
        const body = JSON.stringify({
            email,
            password
        })
        const res = await axios.post('/api/auth', body, config);
        dispatch({type: 'SIGNIN_SUCCESS', payload: res.data});
        dispatch(getUser());
        dispatch(setAlert('User signed-in.', 'success'));
    } catch(err) {
        dispatch(setAlert(err.response.data.msg));
        dispatch({ type: 'SIGNIN_FAILED'});
    }
}

export const signUp = credential => async dispatch => {
    const { name, email, password } = credential;
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({ name, email, password});
    try {
        const res = await axios.post('/api/user', body, config);
        dispatch({ type: "SIGNUP_SUCCESS", payload: res.data});
        dispatch(getUser());
    } catch(err) {
        dispatch(setAlert(err.response.data.msg));
        dispatch({ type: "SIGNUP_FAILED"});
    }
} 

export const signOut = () => dispatch => {
    return dispatch({ type: "SIGNOUT"})
}

export const updateProfile = (userId, credential) => async dispatch => {
    const config = {
        headers: {"Content-Type": "application/json"}
    }
    const body = JSON.stringify(credential);
    try {
        const res = await axios.put(`/api/user/${userId}`, body, config);
        dispatch({ type: "UPDATED_PROFILE", payload: res.data});
        dispatch(setAlert('Profile Updated', 'success'));
    } catch(err) {
        dispatch(setAlert(err.response.data.msg));
    }
} 