import { setAlert } from './alertAction';
import axios from 'axios';

export const addToCart = (product) => async dispatch => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart === null) {
        cart = [{...product, purchase: 1}];
        localStorage.setItem('cart', JSON.stringify(cart));
        dispatch({type: "ADDED_CART", payload: cart});
    } else {
        const index = cart.map(p => p._id).indexOf(product._id);
        
        // If the product is not in the cart, index will be -1
        if(index >= 0 ) {
            cart[index].purchase++;
            localStorage.setItem('cart',JSON.stringify(cart));
            dispatch({type: "ADDED_CART", payload: cart});
            dispatch(setAlert("Added product to cart", "success"));
        } else {
            cart.push({...product, purchase: 1});
            localStorage.setItem('cart',JSON.stringify(cart));
            dispatch({type: "ADDED_CART", payload: cart});
            dispatch(setAlert("Added product to cart", "success"));
        }
    }
}

export const plusQuantity = (_id) => dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.map(item => item._id === _id && item.purchase++);
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({ type: "PLUS_QUANTITY", payload: cart});
}

export const minusQuantity = (_id) => dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.map(item => item._id === _id && item.purchase > 1 && item.purchase--);
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({ type: "MINUS_QUANTITY", payload: cart});
}

export const removeCart = (_id) => dispatch => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newCart = cart.filter(item => item._id !== _id);
    localStorage.setItem('cart', JSON.stringify(newCart));
    dispatch({ type: "REMOVE_CART", payload: newCart});
    dispatch(setAlert('Removed product from cart.'));
}

export const getBraintreeToken = () => async dispatch => {
    try {
        const res = await axios.get('/api/braintree/getToken');
        dispatch({ type: "GOT_BRAINTREE_TOKEN", payload: res.data})
    } catch(err) {
        dispatch({ type: "FAILED_BRAINTREE_TOKEN", payload: err.response.data.msg});
        dispatch(setAlert("ERR..."));
    }
}