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
    const { children, location, authState, campaignState } = this.props;
    let secondaryMenu;
    if (authState && authState.user) {
      secondaryMenu = (
        <ul className={style.secondaryMenu}>
          <li><button className={style.logout} onClick={this.handleLogout}>Logout</button></li>
          <li><Link to={'/campaigns'}>Campaigns</Link></li>
        </ul>
      );
    }

    let authToRender;
    if (authState && !authState.user) {
      authToRender = (
        <Link className={style.login} to="/login">LOGIN</Link>
      );
    }

    if (authState && authState.user) {
      authToRender = (
        <div className={style.loggedIn}>
          <div className={style.name}>{authState.user.username}</div>
          <div className={style.avatar}>
            <img src={authState.user.gravatar} alt={authState.user.name} role="presentation" />
          </div>
        </div>
      );
    }

    const currentPage = location.pathname.slice(1).split('/')[0] ? location.pathname.slice(1).split('/')[0] : 'welcome';
    let campaignName;

    if (campaignState.campaign && authState.user) {
      campaignName = campaignState.campaign.name || authState.user.campaignName;
    }

    return (
      <div className={`${style.app} ${style[currentPage]}`}>
        <div className={style.header}>
          <Link to="/"><h1 className={style.logo}>D&D Scribe</h1></Link>
          <div className={style.menu}>
            <div className={style.campaign}>{campaignName}</div>
            <div className={style.hr} />
            <div className={style.active}>{currentPage}</div>
            <div className={style.list}>
              <ul className={style.primaryMenu}>
                <li><Link to={'/campaign'}>Campaign</Link></li>
                <li><Link to={'/monsters'}>Monsters</Link></li>
                <li><Link to={'/items'}>Items</Link></li>
              </ul>
              {secondaryMenu}
            </div>
          </div>
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
  campaignState: PropTypes.shape({
    campaign: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ping, logout }, dispatch);
}

function mapStateToProps(state) {
  return {
    authState: state.authState,
    campaignState: state.campaignState,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
