const init = {
    category: null,
    categories: [],
    selectedCategories: [],
    loading: true,
    error: null
}

const categoryReducer = (state = init, action) => {
    const { type, payload } = action;
    switch (type) {
        case "GET_ALL_CATEGORIES":
            return {
                ...state,
                categories: payload,
                loading: false,
                error: null
            }
        case "CET_A_CATEGORY":
            return state;
        case "CREATED_CATEGORY": 
            return {
                ...state,
                category: payload,
                loading: false,
                error: null
            }
        case "SET_SELECTED_CATEGORIES":
            return {
                ...state,
                selectedCategories: payload
            }
        case "FAILED_CREATE_CATEGORY":
        case "FAILED_GET_ALL_CATEGORIES":
            return {
                ...state,
                error: payload,
                loading: false
            }
        default: 
            return state;
    }

}

export default categoryReducer;