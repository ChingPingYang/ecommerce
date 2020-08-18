
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
        } else {
            cart.push({...product, purchase: 1});
            localStorage.setItem('cart',JSON.stringify(cart));
            dispatch({type: "ADDED_CART", payload: cart});
        }
    }
}