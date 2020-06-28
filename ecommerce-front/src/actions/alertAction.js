import { uuid } from 'uuidv4';

export const setAlert = (message, kind = "error") => dispatch => {
const id = uuid();
    dispatch({ type: 'SET_ALERT', payload: {message, kind, id}});
    setTimeout(() => {
        dispatch({ type: "CLEAR_ALERT", payload: id });
    }, 4000)
}