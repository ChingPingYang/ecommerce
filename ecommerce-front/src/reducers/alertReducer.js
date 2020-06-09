const init = []

const alertReducer = (state = init, action) => {
    const { type, payload } = action;     
    switch (type) {
        case "SET_ALERT":
            return [
                ...state,
                payload
            ];
        case "CLEAR_ALERT":
            return state.filter(alert => alert.id !== payload);
        default: 
            return state

    }
}

export default alertReducer;
