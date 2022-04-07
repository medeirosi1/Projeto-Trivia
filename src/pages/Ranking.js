import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        Ranking
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Jogar
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Ranking;
