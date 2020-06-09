const init = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

const authReducer = (state = init, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SIGNIN_SUCCESS": 
            localStorage.setItem('token', payload);
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                loading: false
            }

        default:
            return state
    }
    
}

export default authReducer;