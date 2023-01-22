import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({question, author}) => {
    return (
        <Link to={'questions/' + question.id}>
        <div className="m-3 p-2 bg-zinc-200 max-w-sm flex space-x-6">
            <div className="card">
                <img className="h-14 w-14" src={author?.avatarURL} alt="Author" />
            </div>
            <div>
                <div className="text-xl font-semibold text-black">{question.author}</div>
                <p className="italic">{new Date(question.timestamp).toDateString()}</p>
                <p className="border block text-center mt-4 border-green-900 text-green-900">Show</p>
            </div>
        </div>
        </Link>
    );
}

//Fixed review comments to add the propType checker
Card.propTypes={
  question: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
}

export default connect()(Card);


/*
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
  <div class="shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-slate-500">You have a new message!</p>
  </div>
</div>
 */
