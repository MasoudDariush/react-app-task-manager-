 import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4">
      <NavLink to="/" className={({ isActive }) => `text-white ${isActive ? 'font-bold' : ''} mx-4`}>Home</NavLink>
     </nav>
  );
}

export default Navbar;