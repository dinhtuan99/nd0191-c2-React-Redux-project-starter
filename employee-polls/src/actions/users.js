export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTIONS_USER = "ADD_QUESTIONS_USERS";
export const ADD_QUESTIONS_ANSWER_USER = "ADD_QUESTIONS_ANSWER_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addQuestionAnswerUser({ authedUser, qid, answer }) {
  return {
      type: ADD_QUESTIONS_ANSWER_USER,
      authedUser,
      qid,
      answer,
  };
}

export function addQuestionUser({author, id}) {
  return {
      type: ADD_QUESTIONS_USER,
      author,
      qid: id,
  };
}