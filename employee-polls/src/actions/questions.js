import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { addQuestionUser, addQuestionAnswerUser } from "./users"

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      author: authedUser.id,
      optionOneText,
      optionTwoText,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionUser(question));
      })
      .then(() => dispatch(hideLoading()))
      .catch(() => alert("Add question fail"));
  };
}

function addQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleAnswerQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestionAnswer({
      authedUser: authedUser.id,
      qid,
      answer,
    })
      .then((_) => {
        dispatch(addQuestionAnswer({ authedUser: authedUser.id, qid, answer }));
        dispatch(addQuestionAnswerUser({ authedUser: authedUser.id, qid, answer }));
      })
      .catch((e) => {
        console.warn("Error in handleAnswerQuestion: ", e);
        alert("The was an error answer question. Try again.");
      });
  };
}
