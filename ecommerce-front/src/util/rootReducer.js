import { combineReducers } from 'redux';
import alertReducer from '../reducers/alertReducer';
import authReducer from '../reducers/authReducer';
import categoryReducer from '../reducers/categoryReducer';
import productReducer from '../reducers/productReducer';
import cartReducer from '../reducers/cartReducer';
import orderReducer from '../reducers/orderReducer';

const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer
})

export default rootReducer;