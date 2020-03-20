import * as USER_STATUS from '../actions/user'
import * as env from "../actions/env";

const initialState = {
  user_list: null,
  type: null,
  message: null,
};
export default (state=initialState, action) => {
  switch(action.type) {
      case USER_STATUS.GET_USER_LIST_SUCCESS:
          return {
              ...state,
              user_list: action.payload,
              type: "SUCCESS",
              message: "LOAD SUCCESS"
          }
          break
      case USER_STATUS.GET_USER_SUCCESS:
      case USER_STATUS.CREATE_USER_SUCCESS:
          return {
              ...state,
              type: "CHANGE_SUCCESS",
              message: 'CREATE_SUCCESS'
          }
          break
      case USER_STATUS.UPDATE_USER_SUCCESS:
          return {
              ...state,
              type: "CHANGE_SUCCESS",
              message: 'UPDATE_SUCCESS'
          }
          break
      case USER_STATUS.DELETE_USER_SUCCESS:
          return {
              ...state,
              type: "CHANGE_SUCCESS",
              message: 'DELETE_SUCCESS'
          }
          break
      case USER_STATUS.CREATE_USER_FAILURE:
      case USER_STATUS.UPDATE_USER_FAILURE:
      case USER_STATUS.DELETE_USER_FAILURE:
      case USER_STATUS.GET_USER_FAILURE:
      case USER_STATUS.GET_USER_LIST_FAILURE:
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