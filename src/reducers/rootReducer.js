import {combineReducers} from 'redux';
import dictations from './dictationReducer';

const rootReducer = combineReducers({
    dictations
});

export default rootReducer;