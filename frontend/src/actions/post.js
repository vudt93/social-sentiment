import { RSAA } from 'redux-api-middleware';
import { withAuth } from '../reducers'
import config from "../config";
export const GET_POST_LIST_REQUEST = '@@post/GET_POST_LIST_REQUEST';
export const GET_POST_LIST_SUCCESS = '@@post/GET_POST_LIST_SUCCESS';
export const GET_POST_LIST_FAILURE = '@@post/GET_POST_LIST_FAILURE';
export const GET_POST_REQUEST = '@@post/GET_POST_REQUEST';
export const GET_POST_SUCCESS = '@@post/GET_POST_SUCCESS';
export const GET_POST_FAILURE = '@@post/GET_POST_FAILURE';
export const CREATE_POST_REQUEST = '@@post/CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = '@@post/CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = '@@post/CREATE_POST_FAILURE';
export const UPDATE_POST_REQUEST = '@@post/UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = '@@post/UPDATE_POST_SUCCESS';
export const UPDATE_POST_FAILURE = '@@post/UPDATE_POST_FAILURE';
export const DELETE_POST_REQUEST = '@@post/DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = '@@post/DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = '@@post/DELETE_POST_FAILURE';

export const getPostList = () => ({
  [RSAA]: {
      endpoint: config.preUrl + '/api/post',
      method: 'GET',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        GET_POST_LIST_REQUEST, GET_POST_LIST_SUCCESS, GET_POST_LIST_FAILURE
      ]
  }
});

export const getPost = (id) => ({
  [RSAA]: {
      endpoint: config.preUrl + '/api/post/' + id + '/',
      method: 'GET',
      body: JSON.stringify({}),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        GET_POST_REQUEST, GET_POST_SUCCESS, GET_POST_FAILURE
      ]
  }
});

export const createPost = (param) => ({
  [RSAA]: {
      endpoint: config.preUrl + '/api/post',
      method: 'POST',
      body: JSON.stringify(param),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE
      ]
  }
});

export const updatePost = (id, param) => ({
  [RSAA]: {
      endpoint: config.preUrl + '/api/post/' + id + '/',
      method: 'PUT',
      body: JSON.stringify(param),
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        UPDATE_POST_REQUEST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE
      ]
  }
});

export const deletePost = (id) => ({
  [RSAA]: {
      endpoint: config.preUrl + '/api/post/' + id + '/',
      method: 'DELETE',
      headers: withAuth({ 'Content-Type': 'application/json' }),
      types: [
        DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE
      ]
  }
});