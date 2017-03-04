import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginForm from '../../components/login-form/login-form.component';

import { createNewUser } from '../../actions/user.actions';
import { login } from '../../actions/login.actions';

function LoginContainer(props) {
  let error;
  if (props.authState.loginError) { error = props.authState.loginError; }
  if (props.authState.createUserError) { error = props.authState.createUserError; }

  return (
    <div>
      <LoginForm
        createNew={props.createNewUser}
        login={props.login}
        loading={props.authState.loading}
        error={error}
      />
    </div>
  );
}

LoginContainer.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authState: PropTypes.shape({
    loading: PropTypes.bool.required,
    loginError: PropTypes.string,
    createUserError: PropTypes.string,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createNewUser, login }, dispatch);
}

function mapStateToProps(state) {
  return {
    authState: state.authState,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
