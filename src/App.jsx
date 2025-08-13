import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskManager from './Components/TaskManager.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskManager />} />
         
      </Routes>
    </Router>
  );
}
