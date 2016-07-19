import React, { PropTypes } from 'react';

// function input is shorthand for const { children } = this.props
export default function TestApp({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

TestApp.propTypes = {
  children: PropTypes.any,
};
