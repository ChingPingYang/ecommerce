const init = {
    product: null,
    products: [],
    loading: true,
    error: null
}

const productReducer = (state = init, action) => {
    const { type, payload } = action;
    switch (type) {
        case "ADDED_PRODUCT":
            return {
                ...state,
                product: payload,
                loading: false,
                error: null
            }
        case "GET_ALL_PRODUCTS":
            return {
                ...state,
                products: payload,
                loading: false
            }
        case "PRODUCTS_BY_CATEGORY":
            return {
                ...state,
                products: payload,
                loading: false
            }
        case "FAILED_ADD_PRODUCT":
            return {
                ...state,
                loading: false,
                error: payload
            }
        default: 
            return state;
    }
}

export default productReducer;

