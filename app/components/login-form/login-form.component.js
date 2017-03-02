import React, { Component, PropTypes } from 'react';
import Spinner from '../../components/spinner/spinner.component';
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

    let spinnerToRender;
    if (this.props.loading) {
      spinnerToRender = (
        <div className={style.spinnerWrapper}>
          <Spinner
            text={'Resurrecting Game Master...'}
          />
        </div>
      );
    }

    let errorToRender;
    if (this.props.error) {
      errorToRender = (
        <div className={style.error}>
          <p>Critical Fail:</p>
          <p className={style.message}>{this.props.error}</p>
        </div>
      );
    }

    return (
      <div className={style.loginForm}>
        {spinnerToRender}
        {errorToRender}
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
  error: PropTypes.string,
  loading: PropTypes.bool,
};

LoginForm.defaultProps = {
  error: null,
  loading: null,
};
