import React from 'react';
import PropTypes from 'prop-types';

const Logout = ({ logout }) => (
  <button onClick={() => logout()}>
    Logout
  </button>
);

export default Logout;