import axios from 'axios';

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
        
        await axios.post('/api/product', formData, config);
        
    } catch(err) {
        console.log(err.response)
    }
}