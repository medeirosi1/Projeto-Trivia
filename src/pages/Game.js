import he from 'he';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchToken } from '../redux/actions';
import { scorePlayer } from '../redux/actions/playerAction';
import '../styles/Game.css';

class Game extends Component {
  countDown = 0;

  constructor() {
    super();
    this.state = {
      results: [],
      index: 0,
      countdown: 30,
      areAnswersDisabled: false,
      isNextDisabled: true,
    };
  }

  async componentDidMount() {
    const { getToken } = this.props;
    const millisToThirtySeconds = 30000;
    const result = await this.requestQuestions();
    const requestFailed = 3;
    if (result.response_code === requestFailed) {
      await getToken();
      this.requestQuestions();
    }
    this.countDown = this.createInterval();

    setTimeout(() => {
      clearInterval(this.countDown);
      this.setState({
        isDisabled: true,
        isDisabledNext: false,
      });
    }, millisToThirtySeconds);
  }

  handleNextQuestion = () => {
    const { index, results } = this.state;
    const { history } = this.props;

    clearInterval(this.countDown);
    if (index === results.length - 1) {
      history.push('/feedback');
      return;
    }
    this.setState({ index: index + 1, isDisabled: false, countdown: 30 });
    this.countDown = this.createInterval();

    this.setState({
      isDisabledNext: true,
    });
  }

  requestQuestions = async () => {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();
    const half = 0.5;
    const questionsList = result.results.map((question) => (
      {
        ...question,
        answers: [...question.incorrect_answers, question.correct_answer]
          .sort(() => Math.random() - half),
      }
    ));
    this.setState({ results: questionsList });
    return result;
  }

  createInterval = () => {
    const millisToSecond = 1000;
    return setInterval(() => {
      this.setState((prevState) => ({
        countdown: prevState.countdown - 1,
      }));
    }, millisToSecond);
  }

  renderQuestions = () => {
    const { results, index, isDisabled, countdown, isDisabledNext } = this.state;
    const three = 3;
    const ten = 10;
    const { getScore } = this.props;
    const { category, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer, answers } = results[index];

    const getDifficultyMultipler = () => {
      if (results[index].difficulty === 'hard') {
        return three;
      } if (results[index].difficulty === 'medium') {
        return 2;
      }
      return 1;
    };

    const scoreCalculation = (ten + (countdown * getDifficultyMultipler()));

    return (
      <>
        <h3 data-testid="question-category">{category}</h3>
        <p data-testid="question-text">{he.decode(question)}</p>
        <div data-testid="answer-options" className="answers-list">
          {answers.map((answer) => (
            <button
              type="button"
              key={ answer }
              disabled={ isDisabled }
              onClick={ () => {
                document.querySelectorAll('.answer').forEach((item) => {
                  item.classList.add('clicked');
                });
                clearInterval(this.countDown);
                this.setState({
                  isDisabledNext: false,
                  isDisabled: true,
                });
                return (answer === correctAnswer)
                  ? getScore(scoreCalculation)
                  : getScore(0);
              } }
              className={ answer === correctAnswer
                ? 'answer correct'
                : 'answer wrong' }
              data-testid={ answer === correctAnswer
                ? 'correct-answer'
                : `wrong-answer-${incorrectAnswer.indexOf(answer)}` }
            >
              {he.decode(answer)}
            </button>
          ))}
        </div>
        <br />
        {
          isDisabledNext
            ? ''
            : (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.handleNextQuestion }
              >
                Next
              </button>
            )
        }
      </>
    );
  };

  render() {
    const { results, countdown } = this.state;

    return (
      <div>
        <Header />
        {results.length
          ? this.renderQuestions()
          : ''}
        <p>{countdown}</p>
      </div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
  getScore: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  getScore: (score) => dispatch(scorePlayer(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
