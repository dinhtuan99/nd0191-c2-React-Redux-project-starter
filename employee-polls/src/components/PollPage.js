import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const PollPage = ({ questions, id, users, dispatch }) => {
  const navigate = useNavigate();
  const question = questions.find((question) => question.id === id);
  const avatarURL = users[question.author].avatarURL;

  const handleChooseOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAnswerQuestion(question.id, 'optionOne')).then(() => {
      navigate('/');
    });
  }

  const handleChooseOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAnswerQuestion(question.id, 'optionTwo')).then(() => {
      navigate('/');
    });
  }

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
              <button type="button" className="btn btn-primary w-100" onClick={handleChooseOptionOne}>Click</button>
            </div>
          </div>
        </div>
        <div className="col-6 justify-content-center d-flex">
          <div className="card w-100">
            <div className="card-body">
              <p className="card-title">{question.optionTwo.text}</p>
              <button type="button" className="btn btn-primary w-100" onClick={handleChooseOptionTwo}>Click</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users}, props) => {
  const { id } = props.router.params;

  return {
    id,
    users,
    questions: Object.values(questions).sort((a, b) => {
      return b.timestamp - a.timestamp;
    }),
  };
};

export default withRouter(connect(mapStateToProps)(PollPage));
