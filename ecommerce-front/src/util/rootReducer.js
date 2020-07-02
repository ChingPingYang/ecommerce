import { combineReducers } from 'redux';
import alertReducer from '../reducers/alertReducer';
import authReducer from '../reducers/authReducer';
import categoryReducer from '../reducers/categoryReducer';
import productReducer from '../reducers/productReducer';

const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    category: categoryReducer,
    product: productReducer
})

export default rootReducer;