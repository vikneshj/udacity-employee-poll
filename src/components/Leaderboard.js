import {connect} from "react-redux";
import PropTypes from "prop-types";

const Leaderboard = ({users}) => {
    return (
        <div>
            <h1 className="text-3x1 font-bold mt-4">Leaderboard</h1>

            <table className="mt-3">
                <thead className="table-header">
                <tr className="table-row">
                    <th className="p-4 pl-8 text-zinc-500 text-center">User</th>
                    <th className="p-4 pl-8 text-zinc-500 text-center">Answered</th>
                    <th className="p-4 pl-8 text-zinc-500 text-center">Created</th>
                </tr>
                </thead>
                <tbody className="data-group">
                {
                    users.map((user) => (
                        <tr key={user.id}>
                            <td className="p-4 pl-8 text-zinc-800">
                                <span className="font-bold">{user.name}</span>
                                <br/>{user.id}</td>
                            <td className="p-4 pl-8 text-zinc-500">{Object.keys(user.answers).length}</td>
                            <td className="p-4 pl-8 text-zinc-500">{user.questions.length}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

        </div>
    );
};

const mapStateToProps = ({users}) => ({
    users: Object.values(users).sort((a, b) => Object.keys(b.answers).length - Object.keys(a.answers).length),
});

//Fixed review comments to add the propType checker
Leaderboard.propTypes = {
    users: PropTypes.object.isRequired,
}

mapStateToProps.propTypes = {
    users: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Leaderboard);
