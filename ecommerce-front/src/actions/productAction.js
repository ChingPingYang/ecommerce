import axios from 'axios';
import { setAlert } from '../actions/alertAction';

export const addProduct = data => async dispatch => {
    const { name, description, category, price, quantity, sold, imageURL } = data;
    try {
        // need to create FormData to send file with text
        const formData = new FormData();
        if(name) formData.append('name', name);
        if(description) formData.append('description', description);
        if(category) formData.append('category', category);
        if(price) formData.append('price', price);
        if(quantity) formData.append('quantity', quantity);
        if(sold) formData.append('sold', sold);
        if(imageURL) formData.append('imageURL', imageURL);
        
        // headers has to be multipart/form-data
        const config = {
            headers: {'Content-Type': 'multipart/form-data'}
        }
        const res = await axios.post('/api/product', formData, config);
        dispatch({ type: "ADDED_PRODUCT", payload: res.data});
        dispatch(setAlert('Product is added', "success"));
        alert('Product is added')
    } catch(err) {
        dispatch({ type: "FAILED_ADD_PRODUCT", payload: err.response.data.msg});
        dispatch(setAlert(err.response.data.msg));
    }
}

export const getAllProducts = (sortBy) => async dispatch => {
    try {
        const res = await axios.get(`/api/product?sortBy=${sortBy}`);
        dispatch({ type: "GET_ALL_PRODUCTS", payload: res.data});
    } catch(err) {
        dispatch({ type: "FAILED_GET_ALL_RPODUCTS"});
        dispatch(setAlert(err.response.data.msg));
    }
}

export const getProductsByCategories = (filter) => async dispatch => {
    const { category } = filter;
    const body = JSON.stringify({
        filter: {
            price: {
                start: 0,
                end: 1000000
            },
            category: [...category]
        }
    })
    const config = {
        headers: {"Content-Type": "application/json" }
    }
    try {
        const res = await axios.post('/api/product/search', body, config);
        dispatch({type: "PRODUCTS_BY_CATEGORY", payload: res.data});
    } catch(err) {
        dispatch(setAlert(err.response.data.msg));
    }
}

export const getCertainProduct = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/product/${id}`);
        dispatch({ type: "GOT_CERTAIN_PRODUICT", payload: res.data});
    } catch(err) {
        dispatch(setAlert(err.response.data.msg));
        dispatch({ type: "FAILED_GET_PRODUCT", payload: err.response.data.msg});
    }
}

export const clearProduct = () => async dispatch => {
    dispatch({ type: "CLEAR_PRODUCT"});
}

export const setTextSearch = (search) => dispatch => {
    dispatch({ type: "SET_SEARCH", payload: search});
}