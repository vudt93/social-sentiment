import * as POST_STATUS from '../actions/post'
import * as env from "../actions/env";

const initialState = {
  post_list: null,
  type: null,
  message: null,
};
export default (state=initialState, action) => {
  switch(action.type) {
      case POST_STATUS.GET_POST_LIST_SUCCESS:
          return {
              ...state,
              post_list: JSON.parse(action.payload),
              type: "SUCCESS",
              message: "LOAD SUCCESS"
          }
          break
      case POST_STATUS.GET_POST_SUCCESS:
      case POST_STATUS.CREATE_POST_SUCCESS:
          return {
              ...state,
              type: "CHANGE_SUCCESS",
              message: 'CREATE_SUCCESS'
          }
          break
      case POST_STATUS.UPDATE_POST_SUCCESS:
          return {
              ...state,
              type: "CHANGE_SUCCESS",
              message: 'UPDATE_SUCCESS'
          }
          break
      case POST_STATUS.CLOSE_POST_SUCCESS:
          return {
              ...state,
              type: "CHANGE_SUCCESS",
              message: 'DELETE_SUCCESS'
          }
          break
      case POST_STATUS.CREATE_POST_FAILURE:
      case POST_STATUS.UPDATE_POST_FAILURE:
      case POST_STATUS.CLOSE_POST_FAILURE:
      case POST_STATUS.GET_POST_FAILURE:
      case POST_STATUS.GET_POST_LIST_FAILURE:
          let message = action.message
          if (!message) {
              message = action.payload.message
          }
          return {
              ...state,
              type: "FAILURE",
              message: message
          }
          break
      case env.CHANGE_ENV:
          return {
              ...state,
          }
          break
      default:
          return {
              ...state
          }
  }
}