import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Game extends Component {
  async componentDidMount() {
    const { token } = this.props;
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const result = await response.json();
    console.log(result);
  }

  render() {
    return (
      <div>Game</div>
    );
  }
}

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.token,
});

export default connect(mapStateToProps)(Game);
