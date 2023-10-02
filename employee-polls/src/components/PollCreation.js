import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PollCreation = ({ dispatch, id }) => {
  const navigate = useNavigate();
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleFirstOptionChange = (e) => {
    const text = e.target.value;

    setOption1(text);
  };

  const handleSeccondOptionChange = (e) => {
    const text = e.target.value;

    setOption2(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!option1 || !option2) {
      setError(true);
      setSuccess(false);
      return;
    }

    setSuccess(true);
    setError(false);

    dispatch(handleAddQuestion(option1, option2)).then(() => {
      navigate("/");
    });

    setOption1("");
    setOption2("");
  };

  return (
    <div className="container w-75 mt-5 justify-content-center">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-12 text-center">
          <h3>Would You Rather</h3>
          <p>Create your own poll</p>
        </div>
        <div className="col-12 text-center">
          <label htmlFor="firstOption" className="form-label">
            First Option
          </label>
          <input
            type="text"
            data-testid="firstOption"
            className="form-control"
            id="firstOption"
            value={option1}
            onChange={handleFirstOptionChange}
            placeholder="Option One"
          />
        </div>
        <div className="col-12 text-center">
          <label htmlFor="seccondOption" className="form-label">
            Seccond Option
          </label>
          <input
            type="text"
            className="form-control"
            data-testid="seccondOption"
            id="seccondOption"
            value={option2}
            onChange={handleSeccondOptionChange}
            placeholder="Option Two"
          />
        </div>
        <div className="col-12 text-center">
          <button
            data-testid="submit-button"
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
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

export default connect()(PollCreation);
