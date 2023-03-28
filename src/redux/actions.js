// import * as types from './actionType';
import {GET_USERS, DELETE_USER, ADD_USER,UPDATE_USER, GET_SINGLE_USER} from './actionType'
import axios from 'axios';

const getUsers = (users) => ({
    type: GET_USERS,
    payload: users,
})

const userDeleted = () => ({
    type: DELETE_USER
})

const userAdded = () => ({
    type: ADD_USER
})

const userUpdated = () => ({
    type: UPDATE_USER
})

const getUser = (user) => ({
    type: GET_SINGLE_USER,
    payload: user
})

export const loadUsers = () => {
    return function (dispatch) {
        axios
            .get(`${process.env.REACT_APP_API}`)
            .then((response) => {
                console.log('response', response)
                dispatch(getUsers(response.data));
            })
            .catch((error) => console.log(error));
    }
}

export const deleteUser = (id) => {
    return function (dispatch) {
        axios
            .delete(`${process.env.REACT_APP_API}/${id}`)
            .then((response) => {
                console.log('response', response)
                dispatch(userDeleted());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    }
}

export const addUser = (user) => {
    return function (dispatch) {
        axios
            .post(`${process.env.REACT_APP_API}`,user)
            .then((response) => {
                console.log('response', response)
                dispatch(userAdded());
            })
            .catch((error) => console.log(error));
    }
}

export const getSingleUser = (id) => {
    return function (dispatch) {
        axios
            .get(`${process.env.REACT_APP_API}/${id}`)
            .then((response) => {
                console.log('response', response)
                dispatch(getUser(response.data));               
            })
            .catch((error) => console.log(error));
    }
}

export const updateUser = (user, id) => {
    return function (dispatch) {
        axios
            .put(`${process.env.REACT_APP_API}/${id}`,user)
            .then((response) => {
                console.log('response', response)
                dispatch(userUpdated());               
            })
            .catch((error) => console.log(error));
    }
}