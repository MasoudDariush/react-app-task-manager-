 import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-orange-500 p-4 flex gap-6">
      <NavLink to="/" className={({ isActive }) => isActive ? "text-white font-bold underline" : "text-white"}>
        Home
      </NavLink>
      <NavLink to="/add" className={({ isActive }) => isActive ? "text-white font-bold underline" : "text-white"}>
        Add Task
      </NavLink>
      <NavLink to="/tasks" className={({ isActive }) => isActive ? "text-white font-bold underline" : "text-white"}>
        Task List
      </NavLink>
    </nav>
  );
}

export default Navbar;