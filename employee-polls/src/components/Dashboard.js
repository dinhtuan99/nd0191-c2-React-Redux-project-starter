import { connect } from "react-redux";
import Question from "./Question";

const Dashboard = ({ authedUser, questions }) => {
  const newQuestions = questions.filter(
    (question) =>
      !question.optionOne.votes.includes(authedUser.id) &&
      !question.optionTwo.votes.includes(authedUser.id)
  );

  const doneQuestions = questions.filter(
    (question) =>
      question.optionOne.votes.includes(authedUser.id) ||
      question.optionTwo.votes.includes(authedUser.id)
  );
  return (
    <div data-testid="dashboard-screen">
      <div className="container mt-5 text-center border">
        <div className="row">
          <div className="col border-bottom py-3">
            <h4>New questions</h4>
          </div>
        </div>
        <div className="row justify-content-center py-3">
          {newQuestions.map((question) => (
            <Question key={question.id} question={question}></Question>
          ))}
        </div>
      </div>

      <div className="container mt-5 text-center border">
        <div className="row">
          <div className="col border-bottom py-3">
            <h4>Done</h4>
          </div>
        </div>
        <div className="row justify-content-center py-3">
          <div className="row justify-content-center py-3">
            {doneQuestions.map((question) => (
              <Question key={question.id} question={question}></Question>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions }) => ({
  authedUser,
  questions: Object.values(questions).sort((a, b) => {
    return b.timestamp - a.timestamp;
  }),
});

export default connect(mapStateToProps)(Dashboard);
