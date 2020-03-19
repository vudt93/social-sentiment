import * as env from '../actions/env'
const initialState = {
  env: "local"
}
export default (state=initialState, action) => {
  switch(action.type) {
    case env.CHANGE_ENV:
      return {
        env: action.payload.env
      }
    default:
      return state
  }
}