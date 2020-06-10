const init = {
    token: localStorage.token,
    isAuthenticated: null,
    loading: true,
    user: null
}

const authReducer = (state = init, action) => {
    const { type, payload } = action;
    switch (type) {
        case "GOT_USER":
            return {
                ...state,
                loading: false,
                user: payload
            }
        case "SIGNIN_SUCCESS": 
            localStorage.setItem('token', payload);
            return {
                ...state,
                token: payload,
                isAuthenticated: true,
                loading: false,
                user: null
            }
        case "SIGNIN_FAILED":
        case "GETUSER_FAILED":
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state
    }
    
}

export default authReducer;