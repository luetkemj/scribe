import React, { Component, PropTypes } from 'react';
import style from './login-form.component.scss';

export default class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    form: 'login',
  }

  setFormLogin = () => {
    this.setState({ form: 'login' });
  }

  setFormSignup = () => {
    this.setState({ form: 'signup' });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  createNew = (event) => {
    this.props.createNew(this.state);

    event.currentTarget.blur();
    event.preventDefault();
  };

  login = (event) => {
    this.props.login(this.state);

    event.currentTarget.blur();
    event.preventDefault();
  };

  render() {
    const disableLogin = !(this.state.password && this.state.email);
    const disableSignup = !(this.state.username && this.state.password && this.state.email);

    let username;
    if (this.state.form === 'signup') {
      username = (
        <input
          className={style.input}
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          placeholder="username"
          autoComplete="off"
        />
      );
    }

    let button;
    if (this.state.form === 'login') {
      button = (
        <button
          type="submit"
          className={style.submit}
          onClick={this.login}
          disabled={disableLogin}
        >LOGIN</button>
      );
    }

    if (this.state.form === 'signup') {
      button = (
        <button
          type="button"
          className={style.submit}
          onClick={this.createNew}
          disabled={disableSignup}
        >SIGNUP</button>
      );
    }

    return (
      <div className={style.loginForm}>
        <div className={style.container}>
          <div className={`${style.toggle} ${style[this.state.form]}`}>
            <button className={style.loginToggle} onClick={this.setFormLogin}>Login</button>
            <button className={style.signupToggle} onClick={this.setFormSignup}>Sign up</button>
          </div>
          <form className={style.form}>
            <input
              className={style.input}
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="email"
              autoComplete="off"
            />
            {username}
            <input
              className={style.input}
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="password"
              autoComplete="off"
            />

            <div className={style.controls}>
              {button}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  createNew: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};
