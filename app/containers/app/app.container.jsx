import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ping } from '../../actions/ping.actions';

import Header from '../../components/header/header.component';
import Sidebar from '../../components/sidebar/sidebar.component';
import style from './app.container.scss';

class App extends Component {
  componentWillMount() {
    this.props.ping();
  }
  render() {
    const { children, location } = this.props;
    const sidebarLinks = [
      {
        name: 'campaign',
        path: 'campaign',
      },
      {
        name: 'monsters',
        path: 'monsters',
      },
      {
        name: 'items',
        path: 'items',
      },
    ];

    return (
      <div className={`${style.app} ${style[location.pathname.slice(1)]}`}>
        <Header />
        <div className={style.content}>
          <div className={style.sidebarContainer}>
            <Sidebar location={location} links={sidebarLinks} />
          </div>
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.shape(),
  location: PropTypes.shape({}),
  ping: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ping }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps,
)(App);
