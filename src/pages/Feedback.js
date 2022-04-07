import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertion, score } = this.props;
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
};

export default connect(mapStateToProps)(Feedback);
