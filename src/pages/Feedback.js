import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Feedback;
