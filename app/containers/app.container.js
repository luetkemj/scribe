import React, { PropTypes } from 'react';

// function input is shorthand for const { children } = this.props
export default function App({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

App.propTypes = {
  children: PropTypes.any,
};
