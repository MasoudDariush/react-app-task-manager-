import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Header from './Components/Header.jsx';
import TaskForm from './Components/TaskForm.jsx';
import TaskList from './Components/TaskList.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const [tasks,setTasks] = useState([]);
    const [editTask,setEditTask] = useState(null);
    const [filter, setFilter] = useState('All');
    const [currentPage,setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
  
  ///////////////////////////////////////////////////////////////////
    useEffect(()=>{
      fetch('http://localhost:3000/tasks')
      .then((res)=> res.json())
      .then((data)=>{
        setTasks(data)
      })
      toast.success('The list has been updated');
    },[])

   //////////////////////////////////////////////////////////////////////////
   useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filter]); 
  //////////////////////////////////////////////////////////////////////////////////////////
  const handleAddTask = (newTask)=>{
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    .then((res)=> res.json())
    .then((data) => setTasks((prev) => [...prev, data]))
    toast.success('The list has been updated');
  }
/////////////////////////////////////////////////////////////////////////////////////////////////
  const handleDelete = (id) => {

    fetch(`http://localhost:3000/tasks/${id}`,{
      method: 'DELETE',
    })
    .then(()=>{
      setTasks((prev)=> prev.filter((task)=> task.id !== id))
    })
    toast.info('The task has been removed');
  }

//////////////////////////////////////////////////////////////////////////
  const handleUpdate = (id,updatedTask)=>{
    fetch(`http://localhost:3000/tasks/${id}`,{
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
  })
  .then((res) => res.json())
    .then((data) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? data : task))
      );
      toast.success('The tasks has been updated');
      setEditTask(null);
    })}
    
 ///////////////////////////////////////////////////////////////////////////////
    const handleUpdateCompleted = (id,updatetask)=>{
    fetch(`http://localhost:3000/tasks/${id}`,{
      method: 'PUT',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatetask),
  })
  .then((res) => res.json())
    .then((data) => {
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? data : task))
      );
    })}   
    //////////////////////////////////////////////////////////////////////////////////
     const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Completed" && task.completed) return true;
    if (filter === "Not Completed" && !task.completed) return true;
    return false;
  });
    ////////////////////////////////////////////////////////////////////////////////////////////
  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
    ///////////////////////////////////////////////////////////////////////////////////////
  const tasksPerPage = 5;
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = searchedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.max(1, Math.ceil(searchedTasks.length / tasksPerPage));
    ///////////////////////////////////////////////////////////////////////////////////////////
  return (<>
    <Router>
      <Navbar />

      <div className="w-[100vw] h-[100vh] flex justify-center text-left bg-gray-100 p-4">
        <div className=" w-full bg-white rounded-lg shadow-lg p-6">
          <Header />

          <Routes>
            <Route path="/" element={<h2 className="mt-60 text-8xl ali text-center">Welcome to Task Manager 🚀</h2>}/>

             <Route
              path="/add"
              element={
                <TaskForm
                  onAdd={handleAddTask}
                  editTask={editTask}
                  onUpdate={handleUpdate}
                />
              }
            />

             <Route
              path="/tasks"
              element={
                <>
                   <input
                    className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                   <div className="flex gap-3 mt-4">
                    <button
                      className={`px-4 py-2 rounded-lg font-medium border ${
                        filter === "All"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setFilter("All")}
                    >
                      All
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium border ${
                        filter === "Completed"
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setFilter("Completed")}
                    >
                      Completed
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg font-medium border ${
                        filter === "Not Completed"
                          ? "bg-yellow-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setFilter("Not Completed")}
                    >
                      In Progress
                    </button>
                  </div>

                  
                  <TaskList
                    tasks={currentTasks}
                    onDelete={handleDelete}
                    onEdit={setEditTask}
                    handleUpdateCompleted={handleUpdateCompleted}
                  />

                   <div className="flex justify-between items-center mt-6">
                    <button
                      className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Prev
                    </button>

                    <span className="text-gray-700 font-medium">
                      page {currentPage} / {totalPages}
                    </span>

                    <button
                      className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          prev < totalPages ? prev + 1 : prev
                        )
                      }
                      disabled={currentPage >= totalPages}
                    >
                      Next
                    </button>
                  </div>
                </>
              }
            />
          </Routes>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </Router></>
  );
}


  







  

