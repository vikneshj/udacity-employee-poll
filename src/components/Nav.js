import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {handleLogout} from "../actions/authedUser";
import PropTypes from "prop-types";

const Nav = ({dispatch, authedUserId, author}) => {

    const logout = (e) => {
        e.preventDefault();
        dispatch(handleLogout());
    };

    return (
        <nav className="flex justify-center space-x-4 underline">
            <Link to="/"
                  className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Home</Link>
            <Link to="/leaderboard"
                  className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Leaderboard</Link>
            <Link to="/new"
                  className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">New
                Poll</Link>
            <span
                className="font-medium px-3 py-2 text-slate-700"
                data-testid="user-information">User: {authedUserId}
                </span>
            <img className="h-8 w-8 rounded-md" src={author?.avatarURL} alt="" />
            <button onClick={logout}
                    className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Logout
            </button>
        </nav>


    );
};

const mapStateToProps = ({authedUser}) => ({
    authedUserId: authedUser.id,
});

Nav.propTypes = {
    dispatch: PropTypes.func.isRequired,
    authedUserId: PropTypes.string.isRequired,
    auther: PropTypes.array,
} 

mapStateToProps.propTypes = {
    authedUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Nav);
