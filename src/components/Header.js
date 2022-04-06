import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, email, score } = this.props;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="avatar"
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
        />
        <h1 data-testid="header-player-name">{name}</h1>
        <h2 data-testid="header-score">
          Pontuação:
          {' '}
          {score}
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.playerData.name,
  email: state.player.playerData.email,
  score: state.player.playerData.score,
});

Header.defaultProps = {
  name: '',
  email: '',
  score: 0,
};

Header.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  score: PropTypes.number,
};

export default connect(mapStateToProps, null)(Header);
