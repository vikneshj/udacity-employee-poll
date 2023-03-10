import React, {useEffect} from 'react';
import './App.css';
import Nav from "./components/Nav";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import NewPoll from "./components/NewPoll";
import PollPage from "./components/PollPage";
import {connect} from "react-redux";
import Login from "./components/Login";
import {handleInitialData} from "./actions/shared";
import Leaderboard from "./components/Leaderboard";
import Error404 from "./components/404";
import PrivateRoute from "./components/PrivateRoute";
import PropTypes from "prop-types";

function App({dispatch, loggedIn}) {
    useEffect(() => {
        dispatch(handleInitialData());
    });

    return (
        <div className="container mx-auto">
            {loggedIn && <Nav/>}
            <Routes>
                <Route path="/login" exact element={<Login/>}/>
                <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="/leaderboard" exact element={<PrivateRoute><Leaderboard/></PrivateRoute>}/>
                <Route path="/questions/:id" element={<PrivateRoute><PollPage/></PrivateRoute>}/>
                <Route path="/new" exact element={<PrivateRoute><NewPoll/></PrivateRoute>}/>
                <Route path="/404" exact element={<Error404/>}/>
            </Routes>
        </div>
    );
}

const mapStateToProps = ({authedUser}) => ({
    loggedIn: !!authedUser,
});

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
}

mapStateToProps.propTypes = {
    authedUser: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(App);
