export const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart === null) {
        cart = JSON.stringify([{...product, purchase: 1}]);
        localStorage.setItem('cart', cart);
    } else {
        const index = cart.map(p => p._id).indexOf(product._id);
        
        // If the product is not in the cart, index will be -1
        if(index >= 0 ) {
            cart[index].purchase++;
            localStorage.setItem('cart',JSON.stringify(cart));
        } else {
            cart.push({...product, purchase: 1});
            localStorage.setItem('cart',JSON.stringify(cart));
        }
    }
}