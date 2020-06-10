import axios from 'axios';
import { setAlert } from './alertAction';
import setTokenHeader from '../util/setTokenHeader';

export const getUser = () => async dispatch => {
    if(localStorage.token) setTokenHeader(localStorage.token);
    try {
        const res = await axios.get('/api/auth');
        dispatch({ type: "GOT_USER", payload: res.data});
    } catch(err) {
        dispatch(setAlert(err.response.data.msg));
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
    } catch(err) {
        dispatch(setAlert(err.response.data.msg));
        dispatch({ type: 'SIGNIN_FAILED'});
    }
}