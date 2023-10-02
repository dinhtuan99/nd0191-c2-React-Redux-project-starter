import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore } from "redux";
import { Provider } from "react-redux";
import middleware from "./middleware";
import { BrowserRouter as Router } from "react-router-dom";
import reducer from "./reducers";

const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
   document.getElementById("root")
);
