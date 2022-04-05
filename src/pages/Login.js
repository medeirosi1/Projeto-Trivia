import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchToken } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
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

  // handleClick = () => {
  //   const { token } = this.props;
  //   token();
  // }

  render() {
    const { name, email, isButtonDisabled } = this.state;
    const { token, history } = this.props;
    console.log(this.props);
    return (
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
          onClick={ (ev) => {
            ev.preventDefault();
            token();
            history.push('/play');
          } }
        >
          PLAY
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  token: () => dispatch(fetchToken()),
});

export default connect(null, mapDispatchToProps)(Login);
