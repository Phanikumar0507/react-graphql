import * as actionType from './actionTypes';
import axios from 'axios';

export const getUser = () => dispatch => {

    axios.get("https://jsonplaceholder.typicode.com/users").then(data => {
        setTimeout(() => {
            dispatch({
                type: actionType.GET_USERS_SUCCESS,
                payload: data.data
            })
        }, 500)
    }).catch(err => {
        dispatch({
            type: actionType.GET_USERS_FAILURE,
            payload: [],
            error: err.data
        })
    })
};