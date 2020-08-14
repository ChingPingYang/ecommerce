const init = {
    cart: JSON.parse(localStorage.getItem('cart')),
    loading: true
}

const cartReducer = (state = init, action) => {
    const {type, payload} = action;
    switch(type){
        case "ADDED_CART":
            return {
                ...state,
                cart: payload,
                loading: false
            }
        default: 
            return state
    }
}

export default cartReducer;