const init = {
  cart: JSON.parse(localStorage.getItem("cart")),
  loading: false,
};

const cartReducer = (state = init, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADDED_CART":
      return {
        ...state,
        cart: payload,
      };
    case "PLUS_QUANTITY":
        return {
            ...state,
            cart: payload
        }
    case "MINUS_QUANTITY":
        return {
            ...state,
            cart: payload
        }
    case "REMOVE_CART":
        return {
            ...state,
            cart: payload
        }
    default:
      return state;
  }
};

export default cartReducer;
