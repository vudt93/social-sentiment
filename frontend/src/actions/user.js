import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
import config from "../config";
export const GET_USER_LIST_REQUEST = '@@user/GET_USER_LIST_REQUEST';
export const GET_USER_LIST_SUCCESS = '@@user/GET_USER_LIST_SUCCESS';
export const GET_USER_LIST_FAILURE = '@@user/GET_USER_LIST_FAILURE';
export const GET_USER_REQUEST = '@@user/GET_USER_REQUEST';
export const GET_USER_SUCCESS = '@@user/GET_USER_SUCCESS';
export const GET_USER_FAILURE = '@@user/GET_USER_FAILURE';
export const CREATE_USER_REQUEST = '@@user/CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = '@@user/CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = '@@user/CREATE_USER_FAILURE';
export const UPDATE_USER_REQUEST = '@@user/UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = '@@user/UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = '@@user/UPDATE_USER_FAILURE';
export const DELETE_USER_REQUEST = '@@user/DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = '@@user/DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = '@@user/DELETE_USER_FAILURE';

export const getUserList = () => ({
  [RSAA]: {
      endpoint: config.preUrl + '/api/user/',
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        GET_USER_LIST_REQUEST, GET_USER_LIST_SUCCESS, GET_USER_LIST_FAILURE
      ]
  }
});

export const getUser = (ticket) => ({
  [RSAA]: {
      endpoint: config.preUrl + '/api/userDetail/' + ticket + '/',
      method: 'GET',
      body: JSON.stringify({}),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE
      ]
  }
});

export const createUser = (param) => ({
  [RSAA]: {
      endpoint: config.preUrl + '/api/user/',
      method: 'USER',
      body: JSON.stringify({param: param}),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE
      ]
  }
});

export const updateUser = (ticket, param) => ({
  [RSAA]: {
      endpoint: config.preUrl + '/api/userDetail/' + ticket + '/',
      method: 'PUT',
      body: JSON.stringify({param: param}),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE
      ]
  }
});

export const closeUser = (ticket, param) => ({
  [RSAA]: {
      endpoint: config.preUrl + '/api/userDetail/' + ticket + '/',
      method: 'DELETE',
      body: JSON.stringify({param: param}),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        DELETE_USER_REQUEST, DELETE_USER_SUCCESS, DELETE_USER_FAILURE
      ]
  }
});