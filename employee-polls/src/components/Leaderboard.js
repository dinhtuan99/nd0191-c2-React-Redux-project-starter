import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
  return (
    <div className="mx-5 mt-5">
      <table className="table" data-testid="table">
        <thead>
          <tr>
            <th scope="col">Users</th>
            <th scope="col">Answered</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} data-testid="user">
              <td>
                <div className="d-flex">
                  <div>
                    <img
                      className="rounded-circle"
                      width={50}
                      height={50}
                      aria-hidden
                      src={user.avatarURL}
                      alt="image"
                    ></img>
                  </div>
                  <div>
                    <div>
                      <div>{user.name}</div>
                      <div>{user.id}</div>
                    </div>
                  </div>
                </div>
              </td>
              <td>{user.answeredCount}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({
  users: Object.values(users)
    .map((user) => ({
      ...user,
      answeredCount: Object.values(user.answers).length,
      questionsCount: user.questions.length,
    }))
    .sort(
      (a, b) =>
        b.answeredCount +
        b.questionsCount -
        (a.answeredCount + a.questionsCount)
    ),
});

export default connect(mapStateToProps)(Leaderboard);
