import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ping } from '../../actions/ping.actions';
import { logout } from '../../actions/login.actions';
import style from './app.container.scss';

class App extends Component {
  componentWillMount() {
    this.props.ping();
  }

  handleLogout = () => {
    this.props.logout();
  }

  render() {
    const { children, location, authState } = this.props;

    let authToRender;
    if (authState && !authState.user) {
      authToRender = (
        <Link className={style.login} to="/login">LOGIN</Link>
      );
    }

    if (authState && authState.user) {
      authToRender = (
        <div className={style.loggedIn}>
          <div className={style.authGroup}>
            <button className={style.logout} onClick={this.handleLogout}>LOGOUT</button>
            <div className={style.name}>{authState.user.username}</div>
          </div>
          <div className={style.avatar}>
            <img src={authState.user.gravatar} alt={authState.user.name} role="presentation" />
          </div>
        </div>
      );
    }

    return (
      <div className={`${style.app} ${style[location.pathname.slice(1)]}`}>
        <div className={style.header}>
          <Link to="/"><h1 className={style.logo}>D&D Scribe</h1></Link>
          <div className={style.menu}>MENU</div>
          <div className={style.auth}>
            {authToRender}
          </div>
        </div>
        <div className={style.content}>
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.shape(),
  location: PropTypes.shape(),
  ping: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  authState: PropTypes.shape(),
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ping, logout }, dispatch);
}

function mapStateToProps(state) {
  return {
    authState: state.authState,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
