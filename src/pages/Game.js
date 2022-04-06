import he from 'he';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchToken } from '../redux/actions';
import '../styles/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      index: 0,
      countdown: 30,
      isDisabled: false,
    };
  }

  async componentDidMount() {
    const { getToken } = this.props;
    const millisToSecond = 1000;
    const millisToThirtySeconds = 30000;
    const result = await this.requestQuestions();
    const requestFailed = 3;
    if (result.response_code === requestFailed) {
      await getToken();
      this.requestQuestions();
    }
    const countDown = setInterval(() => {
      this.setState((prevState) => ({
        countdown: prevState.countdown - 1,
      }));
    }, millisToSecond);

    setTimeout(() => {
      clearInterval(countDown);
      this.setState({
        isDisabled: true,
      });
    }, millisToThirtySeconds);
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

  renderQuestions = () => {
    const { results, index, isDisabled } = this.state;
    const { category, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer, answers } = results[index];

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
        <button
          type="button"
          onClick={ () => this.setState({ index: index + 1 }) }
        >
          Próxima pergunta
        </button>
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
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
