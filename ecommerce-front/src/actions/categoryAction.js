import axios from 'axios';
import { setAlert } from '../actions/alertAction';

export const createCategory = category => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        const body = JSON.stringify({name: category});
        const res = await axios.post('/api/category', body, config);
        dispatch({type: "CREATED_CATEGORY", payload: res.data});
        dispatch(setAlert('Category is created', "success"));
    } catch(err) {
        dispatch({type: "FAILED_CREATE_CATEGORY", payload: err.response.data.msg});
        dispatch(setAlert(err.response.data.msg))
    }
}

export const getAllCategories = () => async dispatch => {
    try {
        const res = await axios.get('/api/category');
        dispatch({ type: "GET_ALL_CATEGORIES", payload: res.data})
    } catch(err) {
        dispatch({ type: 'FAILED_GET_ALL_CATEGORIES', payload: err.response.data.msg});
    }
}

// This action is for setting selected categories to the global state.
export const setSelectedCategories = (e, old) => dispatch => {
    // 'e' is from the input element. 'old' is from global state of selectedCategories
    const { checked, value } = e.target;
        if (checked) {
            const newCategories = [...old, value]
            const uniqueArray = newCategories.reduce((unique, item) => {
                return unique.includes(item)? unique : [...unique, item];
            }, []);
            return dispatch({type: "SET_SELECTED_CATEGORIES", payload: uniqueArray});
        } else {
            const uniqueArray = old.filter((item) => item !== value);
            return dispatch({type: "SET_SELECTED_CATEGORIES", payload: uniqueArray});
        }      
}
