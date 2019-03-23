import React from 'react';
import PropTypes from 'prop-types';

const Logout = ({ logout }) => (
  <button onClick={() => logout()}>
    Logout
  </button>
);

Logout.proptypes = {
  logout: PropTypes.func,
};
export default Logout;