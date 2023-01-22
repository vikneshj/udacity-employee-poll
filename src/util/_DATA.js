let users = {
  vikneshj: {
    id: 'vikneshj',
    password:'udacity12',
    name: 'Viknesh J',
    avatarURL: 'https://github.com/viknesh.png',
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  krishnaRaj: {
    id: 'krishnaRaj',
    password:'reactJs12',
    name: 'Krishna Raj',
    avatarURL: 'https://github.com/krishna.png',
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  myilsamy: {
    id: 'myilsamy',
    password:'peacock98',
    name: 'Myil Samy',
    avatarURL: 'https://github.com/myil.png',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  poojakatta: {
    id: 'poojakatta',
    password:'vicky12',
    name: 'Poojitha Katta',
    avatarURL: 'https://github.com/poojitha.png',
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
    },
    questions: [],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'vikneshj',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['vikneshj'],
      text: 'Build our new application with Javascript',
    },
    optionTwo: {
      votes: [],
      text: 'Build our new application with Typescript'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'myilsamy',
    timestamp: 1468479767190,
    optionOne: {
      votes: [],
      text: 'hire more frontend developers',
    },
    optionTwo: {
      votes: ['myilsamy', 'vikneshj'],
      text: 'hire more backend developers'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'vikneshj',
    timestamp: 1488579767190,
    optionOne: {
      votes: [],
      text: 'conduct a release retrospective 1 week after a release',
    },
    optionTwo: {
      votes: ['vikneshj'],
      text: 'conduct release retrospectives quarterly'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'krishnaRaj',
    timestamp: 1482579767190,
    optionOne: {
      votes: [],
      text: 'have code reviews conducted by peers',
    },
    optionTwo: {
      votes: ['vikneshj'],
      text: 'have code reviews conducted by managers'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'krishnaRaj',
    timestamp: 1489579767190,
    optionOne: {
      votes: ['krishnaRaj'],
      text: 'take a course on ReactJS',
    },
    optionTwo: {
      votes: ['myilsamy'],
      text: 'take a course on unit testing with Jest'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'myilsamy',
    timestamp: 1493579767190,
    optionOne: {
      votes: ['myilsamy', 'poojakatta'],
      text: 'deploy to production once every two weeks',
    },
    optionTwo: {
      votes: ['krishnaRaj'],
      text: 'deploy to production once every month'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author: author.id,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((resolve, reject) => {
    if (!question.optionOneText || !question.optionTwoText || !question.author) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question)
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      resolve(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      reject("Please provide authedUser, qid, and answer");
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      resolve(true)
    }, 500)
  })
}
