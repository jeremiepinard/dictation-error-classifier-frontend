import initialState from './initialState';
import {
    FETCH_DICTATIONS,
    RECEIVE_DICTATIONS,
    RECEIVE_DICTATIONS_ERROR,
    UPDATE_DICTATION,
    UPDATE_DICTATION_ERROR,
    UPDATE_DICTATION_SUCCESS,
    CREATE_DICTATION,
    CREATE_DICTATION_ERROR,
    CREATE_DICTATION_SUCCESS
} from '../actions/actionTypes';

export default function dictations(state = initialState.dictations, action) {
    switch (action.type) {
        case FETCH_DICTATIONS:
            console.log('FETCH_DICTATIONS Action');
            return action;
        case RECEIVE_DICTATIONS:
            console.log('RECEIVE_DICTATIONS Action', action);
            return action.dictations;
        case RECEIVE_DICTATIONS_ERROR:
            console.log('RECEIVE_DICTATIONS_ERROR Action');
            return action.dictations;
        case UPDATE_DICTATION:
            console.log('UPDATE_DICTATION Action');
            return action;
        case UPDATE_DICTATION_SUCCESS:
            console.log('UPDATE_DICTATION_SUCCESS Action', action);
            return state.filter(dictation => dictation.id !== action.dictation.id).concat(Object.assign({}, action.dictation));
        case UPDATE_DICTATION_ERROR:
            console.log('UPDATE_DICTATION_ERROR Action');
            return state;
        case CREATE_DICTATION:
            console.log('CREATE_DICTATION Action');
            return action;
        case CREATE_DICTATION_SUCCESS:
            console.log('CREATE_DICTATION_SUCCESS Action', action);
            return state.concat(Object.assign({}, action.dictation));
        case CREATE_DICTATION_ERROR:
            console.log('CREATE_DICTATION_ERROR Action');
            return state;
        default:
            return state;
    }
}