import {connect} from "react-redux";
import Card from "./Card";
import PropTypes from "prop-types";

const Home = ({authedUser, questions, users}) => {

    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser.id)
        && !question.optionTwo.votes.includes(authedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authedUser.id)
        || question.optionTwo.votes.includes(authedUser.id));

    return (
        <div>
            <h1 className="text-4xl font-bold mt-9" data-testid="heading">Home</h1>

            <div className="border mt-4 bg-sky-100">
            <h2 className="text-2xl font-semibold bg-sky-600 text-center block border">New Questions</h2>
            <ul className="grid md:grid-cols-2">
                {questions
                    .filter(unanswered)
                    .map((question) => (
                        <li key={question.id}>
                            <Card question={question} author={users[question.author]}/>
                        </li>
                    ))}
            </ul>
            </div>

            <div className="border mt-4 bg-sky-100">
            <h2 className="text-2xl font-semibold bg-sky-600 text-center block border">Done</h2>
            <ul className="grid md:grid-cols-2">
                {questions
                    .filter(answered)
                    .map((question) => (
                        <li key={question.id}>
                            <Card question={question} author={users[question.author]}/>
                        </li>
                    ))}
            </ul>
            </div>
        </div>
    );
}

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

Home.propTypes = {
    authedUser: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,
} 

mapStateToProps.propTypes = {
    authedUser: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired,
    users: PropTypes.object.isRequired,
}
export default connect(mapStateToProps)(Home);
