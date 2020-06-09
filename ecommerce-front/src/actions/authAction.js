import axios from 'axios';
import { setAlert } from './alertAction';

export const test = () => async dispatch => {
    try {
        const res = await axios.get('/api/auth');
        dispatch({ type: "TEST", payload: res.data});
    } catch(err) {
        
        if(err) console.log(err.response.data);
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
    } catch(err) {
        dispatch(setAlert(err.response.data.msg))
    }
}