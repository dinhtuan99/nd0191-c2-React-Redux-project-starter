import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogoutUser } from "../actions/authedUser";

const Nav = ({ authedUser, dispatch }) => {
  const location = useLocation();
  const path = location.pathname;

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(handleLogoutUser());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Employee poll
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li>
              <Link
                className={"nav-link " + (path === "/" ? "active" : "")}
                to="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={
                  "nav-link " + (path === "/leaderboard" ? "active" : "")
                }
                to="/leaderboard"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                className={"nav-link " + (path === "/new" ? "active" : "")}
                to="/new"
              >
                New
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <img
              className="rounded-circle"
              width={50}
              height={50}
              aria-hidden
              src={authedUser.avatarURL}
              alt="image"
            ></img>
            <p className="fw-bold my-0">{authedUser.id}</p>
          </div>
          <button
            className="btn btn-light"
            onClick={handleLogout}
            type="submit"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
  authedUser,
});

export default connect(mapStateToProps)(Nav);
