import { dologin } from '../../services/UserService';
export const login = (username, password) => {
  return async (dispatch) => {
    await dologin(username, password).then(userinfo => dispatch(loginSuccess(userinfo))).catch(error => dispatch(loginFailure(error)));
  };
};

export const loginSuccess = (user) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: user,
  };
};

export const loginFailure = (error) => {
  return {
    type: 'LOGIN_FAILURE',
    payload: error,
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
