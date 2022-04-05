import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  render() {
    const { name, email, isButtonDisabled } = this.state;
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
          onClick={  }
        >
          PLAY
        </button>
      </form>
    );
  }
}

export default connect()(Login);
