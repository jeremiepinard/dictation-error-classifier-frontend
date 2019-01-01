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
        const url = endpoint('/api/v1/dictations');
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
        const url = endpoint(`/api/v1/dictations/${dictation.id}`);
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

export function createDictationSuccess(dictation) {
    return {type: types.CREATE_DICTATION_SUCCESS, dictation: dictation};
}

export function createDictationError(i) {
    return {type: types.CREATE_DICTATION_ERROR};
}

export function createDictation(dictation) {
    return dispatch => {
        const url = endpoint('/api/v1/dictations');
        return axios.post(url, {
            name: dictation.name,
            entries: dictation.entries
        })
            .then(function (response) {
                console.log(`POST ${url} returned the successful response: `, response);
                let dictationId = "";
                if(response.headers.location) {
                    const uriSegments = response.headers.location.split('/');
                    dictationId = uriSegments[uriSegments.length - 1];
                }
                console.log(`created dictation has id [${dictationId}]`)
                dispatch(createDictationSuccess(Object.assign({}, dictation, {id: dictationId})));
            })
            .catch(function (error) {
                console.log(`POST ${url} returned the error: `, error);
                dispatch(createDictationError());
            })
    };
}