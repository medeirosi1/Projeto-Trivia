import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     name: '',
  //     email: '',
  //     score: 0,
  //   };
  // }

  render() {
    const { name, email, score } = this.state;
    const playerHash = md5(email).toString();
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          alt="avatar"
          src={ `https://www.gravatar.com/avatar/${playerHash}` }
        />
        <h1 data-testid="header-player-name">{name}</h1>
        <h2 data-testid="header-score">{score}</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

// const mapDispatchToProps = (dispatch) => ({

// });

export default connect(mapStateToProps)(Header);
