import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import PollCreation from "./PollCreation";
import PollPage from "./PollPage";
import Nav from "./Nav";
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, authedUser }) => {
  const location = useLocation();
  if (!authedUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

const App = (props) => {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      <div className="container">
        {props.authedUser && <Nav />}
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ProtectedRoute authedUser={props.authedUser}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/questions/:id"
            element={
              <ProtectedRoute authedUser={props.authedUser}>
                <PollPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute authedUser={props.authedUser}>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add"
            element={
              <ProtectedRoute authedUser={props.authedUser}>
                <PollCreation />
              </ProtectedRoute>
            }
          />

          <Route path="/login" exact element={<Login />} />
        </Routes>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  authedUser,
});

export default connect(mapStateToProps)(App);
