import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions';
import setPlayerData from '../redux/actions/playerAction';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      score: 0,
      isButtonDisabled: true,
    };
  }

  validateButton = () => {
    const { name, email } = this.state;
    const regexEmail = /[a-zA-Z0-9._]+@[a-zA-Z]+\.[a-zA-Z.]*\w$/;
    const isEmailValid = regexEmail.test(email);
    this.setState({ isButtonDisabled: !((isEmailValid && name)) });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateButton);
  }

  handleClickSubmit = () => {
    const { getToken, history, dispatchPlayerData } = this.props;
    await getToken();
    dispatchPlayerData(this.state);
    history.push('/play');
  }

  handleSettingsBtnClick = () => {
    const { history } = this.props;
    history.push('/config');
  }

  render() {
    const { name, email, isButtonDisabled } = this.state;
    return (
      <div>
        <header>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettingsBtnClick }
          >
            Configuração
          </button>
        </header>
        <form>
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={ name }
            data-testid="input-player-name"
            onChange={ this.handleChange }
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            onChange={ this.handleChange }
            required
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isButtonDisabled }
            onClick={ this.handleClickSubmit }
          >
            PLAY
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getToken: () => dispatch(fetchToken()),
  dispatchPlayerData: (playerData) => dispatch(setPlayerData(playerData)),
});

Login.propTypes = {
  getToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  dispatchPlayerData: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
