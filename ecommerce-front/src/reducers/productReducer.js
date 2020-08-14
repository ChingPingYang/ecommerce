const init = {
    search: "",
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
        case "SET_SEARCH": 
            return {
                ...state,
                search: payload
            }
        case "GOT_CERTAIN_PRODUICT": 
            return {
                ...state,
                product: payload,
                loading: false,
                error: null
            }
        case "CLEAR_PRODUCT":
            return {
                ...state,
                product: null,
                loading: false
            }
        case "FAILED_ADD_PRODUCT":
            return {
                ...state,
                product: null,
                loading: false,
                error: payload
            }
        case "FAILED_GET_PRODUCT":
            return {
                ...state,
                product: null,
                loading: false,
                error: payload
            }
        default: 
            return state;
    }
}

export default productReducer;

