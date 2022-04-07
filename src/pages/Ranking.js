import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Ranking.css';

class Ranking extends Component {
  ranking = JSON.parse(localStorage.getItem('ranking')) || [];

  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {this.ranking.sort((a, b) => b.score - a.score).map((user, index) => (
          <div className="ranking-card" key={ index }>
            <img src={ user.picture } alt="" />
            <h4 data-testid={ `player-name-${index}` }>{ user.name }</h4>
            <p data-testid={ `player-score-${index}` }>{ user.score }</p>
          </div>
        ))}
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
