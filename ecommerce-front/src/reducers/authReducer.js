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
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case "SIGNIN_SUCCESS": 
        case "SIGNUP_SUCCESS":
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
        case "SIGNUP_FAILED":
        case "SIGNOUT":
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            }
        case "UPDATED_PROFILE":
            return {
                ...state,
                user: payload
            }
        default:
            return state
    }
    
}

export default authReducer;