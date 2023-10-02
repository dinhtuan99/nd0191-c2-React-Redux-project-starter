/* eslint-disable testing-library/prefer-screen-queries */
import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "../components/Login";
import { Provider } from "react-redux";
import middleware from "../middleware";
import reducer from "../reducers";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducer, middleware);

describe("Login", () => {
  it("will display dashboard if all fields are submitted", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(component.getByTestId("username")).toBeInTheDocument();
    expect(component.getByTestId("password")).toBeInTheDocument();
    expect(component.getByTestId("submit-button")).toBeInTheDocument();
  });

  it("will display error-header if all fields are submitted", () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    var component = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    var input1 = component.getByTestId("username");
    fireEvent.change(input1, { target: { value: "bbb" } });
    var input2 = component.getByTestId("password");
    fireEvent.change(input2, { target: { value: "" } });
    var submitButton = component.getByTestId("submit-button");
    fireEvent.click(submitButton);
    expect(component.queryByTestId("success-header")).not.toBeInTheDocument();
    expect(
      component.getByTestId("error-header")
    ).toBeInTheDocument();
  });
});
