export const CHANGE_ENV = '@@env/CHANGE_ENV';
export const changeEnv = (env) => ({
  type: CHANGE_ENV,
  payload: {env: env}
})
