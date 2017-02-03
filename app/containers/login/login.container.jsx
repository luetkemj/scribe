import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import style from './login.container.scss';
import LoginForm from '../../components/login-form/login-form.component';

import { createNewUser } from '../../actions/user.actions';
import { login } from '../../actions/auth.actions';

function LoginContainer(props) {
  return (
    <div className={style.loginContainer}>
      <LoginForm
        createNew={props.createNewUser}
        login={props.login}
      />
    </div>
  );
}

LoginContainer.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createNewUser, login }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps,
)(LoginContainer);
