import {connect} from "react-redux";
import Card from "./Card";

const Dashboard = ({authedUser, questions, users}) => {

    const unanswered = (question) => (!question.optionOne.votes.includes(authedUser.id)
        && !question.optionTwo.votes.includes(authedUser.id));

    const answered = (question) => (question.optionOne.votes.includes(authedUser.id)
        || question.optionTwo.votes.includes(authedUser.id));

    return (
        <div>
            <h1 className="text-4xl font-bold mt-9" data-testid="heading">Dashboard</h1>

            <h2 className="text-2xl font-semibold mt-6">New Questions</h2>
            <ul className="grid md:grid-cols-2">
                {questions
                    .filter(unanswered)
                    .map((question) => (
                        <li key={question.id}>
                            <Card question={question} author={users[question.author]}/>
                        </li>
                    ))}
            </ul>

            <h2 className="text-2xl font-semibold mt-6">Answered Questions</h2>
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
    );
}

const mapStateToProps = ({authedUser, questions, users}) => ({
    authedUser,
    questions: Object.values(questions).sort(
        (a, b) => b.timestamp - a.timestamp
    ),
    users,
});

export default connect(mapStateToProps)(Dashboard);
