import { uuid } from 'uuidv4';

export const setAlert = message => dispatch => {
const id = uuid();
    dispatch({ type: 'SET_ALERT', payload: {message, id}});
    setTimeout(() => {
        dispatch({ type: "CLEAR_ALERT", payload: id });
    }, 4000)
}