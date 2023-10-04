import { connect } from "react-redux";
import Question from "./Question";
import { useState } from "react";

const Dashboard = ({ authedUser, questions }) => {
  const [isFirstElementOpen, setIsFirstElementOpen] = useState(true);
  const [isSecondElementOpen, setIsSecondElementOpen] = useState(false);

  const toggleFirstElement = () => {
    setIsFirstElementOpen(!isFirstElementOpen);
  };

  const toggleSecondElement = () => {
    setIsSecondElementOpen(!isSecondElementOpen);
  };

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
      <div>
        <button className="btn btn-primary me-2" onClick={toggleFirstElement}>
          Show new questions
        </button>
        <button className="btn btn-primary" onClick={toggleSecondElement}>
          Show done questions
        </button>
        <div
          className={`collapse ${isFirstElementOpen ? "show" : ""}`}
          id="multiCollapseExample1"
        >
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
        </div>
        <div
          className={`collapse ${isSecondElementOpen ? "show" : ""}`}
          id="multiCollapseExample2"
        >
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
