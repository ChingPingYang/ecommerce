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