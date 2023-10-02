import * as React from "react";
import { render } from "@testing-library/react";
import Question from "../components/Question";
import middleware from "../middleware";
import reducer from "../reducers";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const store = createStore(reducer, middleware);

describe("Question", () => {
  it("matches the snapshot when a name is passed", () => {
    const question = {
      id: "xj352vofupe1dqz9emx13r",
      author: "mtsamis",
      timestamp: 1493579767190,
      optionOne: {
        votes: ["mtsamis", "zoshikanlu"],
        text: "deploy to production once every two weeks",
      },
      optionTwo: {
        votes: ["tylermcginnis"],
        text: "deploy to production once every month",
      },
    };
    var view = render(
      <Provider store={store}>
        <BrowserRouter>
          <Question question={question} />
        </BrowserRouter>
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });
});
