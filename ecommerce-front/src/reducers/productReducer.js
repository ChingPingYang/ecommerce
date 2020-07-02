const init = {
    product: null,
    products: [],
    loading: true,
    error: null
}

const productReducer = (state = init, action) => {
    const { type, payload } = action;
    switch (type) {
        case "TEST":
            console.log(payload);
            return state;
        default: 
            return state;
    }
}

export default productReducer;

