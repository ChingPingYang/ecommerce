import { combineReducers } from 'redux';
import alertReducer from '../reducers/alertReducer';
import authReducer from '../reducers/authReducer';
import categoryReducer from '../reducers/categoryReducer';

const rootReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    category: categoryReducer
})

export default rootReducer;