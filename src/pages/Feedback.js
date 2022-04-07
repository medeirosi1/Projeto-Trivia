import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  handleRouteBtnClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { assertion, score, history } = this.props;
    const hit = 3;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        {
          assertion >= hit
            ? <p data-testid="feedback-text">Well Done!</p>
            : <p data-testid="feedback-text">Could be better...</p>
        }
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertion}</p>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ this.handleRouteBtnClick }
        >
          Play Again
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertion: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertion: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Feedback);
