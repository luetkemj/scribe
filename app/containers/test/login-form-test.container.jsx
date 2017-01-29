import React from 'react';
import LoginForm from '../../components/login-form/login-form.component';

export default function LoginFormTestContainer() {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#efefef',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoginForm
        createNew={() => {}}
        login={() => {}}
      />
    </div>
  );
}
