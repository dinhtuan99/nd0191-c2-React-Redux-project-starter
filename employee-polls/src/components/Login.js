import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { handleLoginUser } from "../actions/authedUser";

const Login = ({ dispatch }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleUsernameChange = (e) => {
    const text = e.target.value;

    setUsername(text);
  };

  const handlePasswordChange = (e) => {
    const text = e.target.value;

    setPassword(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError(true);
      setSuccess(false);
      return;
    }

    setSuccess(true);
    setError(false);
  
    dispatch(handleLoginUser(username, password));
    setUsername("");
    setPassword("");
    navigate(state?.from?.pathname || "/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            data-testid="username"
            value={username}
            onChange={handleUsernameChange}
            aria-describedby="textlHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            data-testid="password"
            value={password}
            onChange={handlePasswordChange}
            id="exampleInputPassword1"
          />
        </div>
        <button
          data-testid="submit-button"
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
      {success && <h5 data-testid="success-header">Form Submitted!</h5>}
      {error && (
        <h5 data-testid="error-header">
          Error: Please ensure all fields are filled out.
        </h5>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  isLogin: authedUser,
});

export default connect(mapStateToProps)(Login);
