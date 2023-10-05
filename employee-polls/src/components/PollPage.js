import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import {
  useLocation,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const PollPage = ({ question, optionClicked, users, dispatch }) => {
  const [activeOption, setActiveOption] = useState(optionClicked);
  if (!question) return <Navigate to="/notfound" />;
  const avatarURL = users[question.author].avatarURL;

  const handleChooseOptionOne = (e) => {
    e.preventDefault();
    if (activeOption) return;
    setActiveOption("optionOne");
    dispatch(handleAnswerQuestion(question.id, "optionOne"));
  };

  const handleChooseOptionTwo = (e) => {
    e.preventDefault();
    if (activeOption) return;
    setActiveOption("optionTwo");
    dispatch(handleAnswerQuestion(question.id, "optionTwo"));
  };

  const calcPercentageVoted = (option) => {
    const optionOneVoted = question.optionOne.votes.length;
    const optionTwoVoted = question.optionTwo.votes.length;
    const totalVoted = optionOneVoted + optionTwoVoted;
    return option === "optionOne"
      ? ` ${((optionOneVoted / totalVoted) * 100).toFixed(2)}%`
      : ` ${((optionTwoVoted / totalVoted) * 100).toFixed(2)}%`;
  };
  return (
    <div className="container mt-5 text-center">
      <h3>Poll by {question.author}</h3>
      <img
        className="rounded-circle"
        width={100}
        height={100}
        aria-hidden
        src={avatarURL}
        alt="image"
      ></img>
      <h4>Would You Rather</h4>
      <div className="row">
        <div className="col-6 justify-content-center d-flex">
          <div className="card w-100">
            <div className="card-body">
              <p className="card-title">{question.optionOne.text}</p>
              <button
                type="button"
                className={
                  "btn w-100 " +
                  (activeOption === "optionOne" ? "btn-success" : "btn-primary")
                }
                onClick={handleChooseOptionOne}
              >
                Click
              </button>
              {activeOption ? (
                <p>
                  {question.optionOne.votes.length +
                    " voted," +
                    calcPercentageVoted("optionOne")}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="col-6 justify-content-center d-flex">
          <div className="card w-100">
            <div className="card-body">
              <p className="card-title">{question.optionTwo.text}</p>
              <button
                type="button"
                className={
                  "btn w-100 " +
                  (activeOption === "optionTwo" ? "btn-success" : "btn-primary")
                }
                onClick={handleChooseOptionTwo}
              >
                Click
              </button>
              {activeOption ? (
                <p>
                  {question.optionTwo.votes.length +
                    " voted," +
                    calcPercentageVoted("optionTwo")}
                </p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, props) => {
  const { id } = props.router.params;
  const question = Object.values(questions)
    .sort((a, b) => b.timestamp - a.timestamp)
    .find((question) => question.id === id);
  let optionClicked;
  if(!question) return {};
  if (question.optionOne.votes.includes(authedUser.id)) {
    optionClicked = "optionOne";
  }
  if (question.optionTwo.votes.includes(authedUser.id)) {
    optionClicked = "optionTwo";
  }

  return {
    users,
    question,
    optionClicked,
  };
};

export default withRouter(connect(mapStateToProps)(PollPage));
