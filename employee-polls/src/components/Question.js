import { connect } from "react-redux";
import moment from 'moment'
import { Link } from "react-router-dom";


const Question = ({ question }) => {

  const time = new Date(question.timestamp)
  const timeStr = moment(time).format('hh:mm:A | MM/DD/YYYY')


  return (
    <div className="col d-flex justify-content-center">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">{ question.author }</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
          { timeStr }
          </h6>
          <Link to={`/questions/${question.id}`} className="btn btn-primary w-100">Show</Link>
        </div>
      </div>
    </div>
  );
};

export default connect()(Question);
