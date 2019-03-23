import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div>
    <Link to="/">Home</Link>
    <br></br>
    <Link to="/signup">Signup</Link>
    <br></br>
    <Link to="/login">Login</Link>
    <br></br>
    <Link to="/hidden">The Goods</Link>
  </div>
);

export default Nav;