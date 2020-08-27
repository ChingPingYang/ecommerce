const init = {
  cart: JSON.parse(localStorage.getItem("cart")),
  clientToken: null,
  instance: {},
  address: "",
  error: null
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
    case "GOT_BRAINTREE_TOKEN":
        return {
          ...state,
          clientToken: payload
        }
    case "FAILED_BRAINTREE_TOKEN":
        return {
          ...state,
          clientToken: null,
          error: payload
        }
    default:
      return state;
  }
};

export default cartReducer;