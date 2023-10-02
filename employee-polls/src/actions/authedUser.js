export const SET_LOGIN_USER = "SET_LOGIN_USER";
export const SET_LOGOUT_USER = "SET_LOGOUT_USER";

export function setLoginUser(id) {
  return {
    type: SET_LOGIN_USER,
    id,
  };
}

export function setLogoutUser() {
  return {
    type: SET_LOGOUT_USER,
  };
}

export function handleLoginUser(username, password) {
  return (dispatch, getState) => {
    const { users } = getState();
    const loginUser = Object.values(users).find(
      (user) => user.id === username && user.password === password
    );
    if (loginUser) {
      return dispatch(setLoginUser(loginUser));
    } else {
      alert("Please try to login again! May be wrong password or username")
    }
  };
}

export function handleLogoutUser() {
  return (dispatch) => {
    return dispatch(setLogoutUser());
  };
}
