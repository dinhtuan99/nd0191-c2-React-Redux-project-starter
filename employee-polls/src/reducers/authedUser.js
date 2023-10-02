import { SET_LOGIN_USER, SET_LOGOUT_USER } from "../actions/authedUser";

export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_LOGIN_USER:
      return action.id;
    case SET_LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
