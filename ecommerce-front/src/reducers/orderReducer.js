const init = {
    orders: [],
    loading: true
}

const orderReducer = (state = init, action) => {
    const { type, payload } = action;
    switch(type) {
        case "GOT_ORDERS": 
            return {
                orders: payload,
                loading: false
            }
        default:
            return state
    }
}

export default orderReducer;