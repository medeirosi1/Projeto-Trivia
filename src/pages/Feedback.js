import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const { player: { name, score, gravatarEmail } } = this.props;
    const picture = `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}`;
    const newUser = {
      name,
      score,
      picture,
    };
    const rankingList = JSON.parse(localStorage.getItem('ranking')) || [];
    localStorage.setItem('ranking', JSON.stringify([...rankingList, newUser]));
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="feedback-text">Feedback</h1>
        <Header />
        <button type="button" data-testid="btn-ranking" onClick={ () => history.push('/ranking') }>Ranking</button>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
