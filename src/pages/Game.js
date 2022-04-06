import he from 'he';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchToken } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
      index: 0,
    };
  }

  async componentDidMount() {
    const { getToken } = this.props;
    const result = await this.requestQuestions();
    const requestFailed = 3;
    if (result.response_code === requestFailed) {
      await getToken();
      this.requestQuestions();
    }
  }

  requestQuestions = async () => {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();
    this.setState({ results: result.results });
    return result;
  }

  renderQuestions = () => {
    const { results, index } = this.state;
    const { category, question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswer } = results[index];
    const answers = [...incorrectAnswer, correctAnswer];
    const half = 0.5;

    return (
      <>
        <h3 data-testid="question-category">{category}</h3>
        <p data-testid="question-text">{he.decode(question)}</p>
        <div data-testid="answer-options">
          {answers.sort(() => Math.random() - half)
            .map((answer) => (
              <button
                type="button"
                key={ answer }
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
    const { results } = this.state; //

    return (
      <div>
        <Header />
        {results.length
          ? this.renderQuestions()
          : ''}
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
