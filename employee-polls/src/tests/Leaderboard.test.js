/* eslint-disable testing-library/prefer-screen-queries */
import * as React from "react";
import { render } from "@testing-library/react";
import Leaderboard from "../components/Leaderboard";
import { Provider } from "react-redux";
import middleware from "../middleware";
import reducer from "../reducers";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import { handleInitialData } from "../actions/shared";

const store = createStore(reducer, middleware);

describe("Leaderboard", () => {
  it("will display table", async () => {
    await store.dispatch(handleInitialData());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );
    expect(component.getByTestId("table")).toBeInTheDocument();
  });

  it("will display sarahedo first", async () => {
    await store.dispatch(handleInitialData());
    // eslint-disable-next-line testing-library/render-result-naming-convention
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Leaderboard />
        </BrowserRouter>
      </Provider>
    );
    expect(component.queryAllByTestId("user").length).toEqual(4);
  });
});
