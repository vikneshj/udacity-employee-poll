import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {useState} from "react";
import {handleLogin} from "../actions/authedUser";
import PropTypes from "prop-types";

const Login = ({dispatch, loggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    if (loggedIn) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirectTo');
        return <Navigate to={redirectUrl ? redirectUrl : "/"}/>;
    }

    const handleUsername = (e) => {
        const value = e.target.value;
        setUsername(value);
    };

    const handlePassword = (e) => {
        const value = e.target.value;
        setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(handleLogin(username, password));
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center" data-testid="login-heading">Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="text-center">User</label>
                    <div className="mt-1">
                        <input
                            value={username}
                            placeholder="User"
                            onChange={handleUsername}
                            type="text"
                            name="username"
                            id="username"
                            data-testid="username"
                            className="px-3 py-2 border w-full"/>
                    </div>
                </div>
                <div className="mt-6">
                    <label className="text-center">Password</label>
                    <div className="mt-1">
                        <input
                            value={password}
                            placeholder="password"
                            onChange={handlePassword}
                            type="password"
                            name="password"
                            id="password"
                            data-testid="password"
                            className="px-3 py-2 border w-full"/>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <button type="submit"
                            data-testid="submit"
                            className="bg-sky-500 px-5 py-2.5 font-bold text-white">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
}

mapStateToProps.propTypes = {
    authedUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(Login);
