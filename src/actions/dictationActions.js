import * as types from './actionTypes';
import endpoint from '../env';

const axios = require('axios');

export function receiveDictations(dictations) {
    return {type: types.RECEIVE_DICTATIONS, dictations: dictations};
}

export function receiveDictationsError() {
    return {type: types.RECEIVE_DICTATIONS_ERROR, dictations: []};
}

export function fetchDictations() {
    return dispatch => {
        const url = `${endpoint}/api/v1/dictations`;
        return axios.get(url)
            .then(function (response) {
                console.log(`GET ${url} returned the successful response: `, response);
                dispatch(receiveDictations(response.data.dictations));
            })
            .catch(function (error) {
                console.log(`GET ${url} returned the error: `, error);
                dispatch(receiveDictationsError());
            })
    };
}

export function updateDictationSuccess(dictation) {
    return {type: types.UPDATE_DICTATION_SUCCESS, dictation: dictation};
}

export function updateDictationError(i) {
    return {type: types.UPDATE_DICTATION_ERROR};
}

export function updateDictation(dictation) {
    return dispatch => {
        const url = `${endpoint}/api/v1/dictations/${dictation.id}`;
        return axios.put(url, {
                name: dictation.name,
                entries: dictation.entries
            })
            .then(function (response) {
                console.log(`PUT ${url} returned the successful response: `, response);
                dispatch(updateDictationSuccess(dictation));
            })
            .catch(function (error) {
                console.log(`PUT ${url} returned the error: `, error);
                dispatch(updateDictationError());
            })
    };
}