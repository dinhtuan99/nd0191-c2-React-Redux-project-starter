/* eslint-disable testing-library/prefer-screen-queries */
import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import PollCreation from "../components/PollCreation";
import { Provider } from "react-redux";
import middleware from "../middleware";
import reducer from "../reducers";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import { setLoginUser } from "../actions/authedUser";

const store = createStore(reducer, middleware);

describe("PollCreation", () => {
  it("will display error-header if all fields are submitted", () => {
    store.dispatch(setLoginUser("tylermcginnis"));
    // eslint-disable-next-line testing-library/render-result-naming-convention
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <PollCreation />
        </BrowserRouter>
      </Provider>
    );
    var input1 = component.getByTestId("firstOption");
    fireEvent.change(input1, { target: { value: "aaa" } });
    var input2 = component.getByTestId("seccondOption");
    fireEvent.change(input2, { target: { value: "" } });
    var submitButton = component.getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(component.queryByTestId("success-header")).not.toBeInTheDocument();
    expect(
      component.getByTestId("error-header")
    ).toBeInTheDocument();
  });
});
