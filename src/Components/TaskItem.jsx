import React from 'react'

export default function TaskItem({task,onDelete,onEdit,handleUpdateCompleted}) {


  const updateCompleted = ()=>{
    const updatetask = {...task,
      completed : !task.completed,
  }
  handleUpdateCompleted(task.id,updatetask);
}


  return (<>
   <li className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
  <p className="text-gray-800 mb-3 sm:mb-0">
    <strong className="font-semibold">{task.title}</strong> - {task.desc}
  </p>

  <div className="flex gap-2">
    <button
      className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200
        ${task.completed 
          ? 'bg-green-500 hover:bg-green-600 text-white' 
          : 'bg-yellow-500 hover:bg-yellow-600 text-white'
        }`}
      onClick={updateCompleted}
    >
      {task.completed ? "Done" : "In Progress"}
    </button>

    <button
      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors duration-200"
      onClick={() => onEdit(task)}
    >
      Edit
    </button>

    <button
      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors duration-200"
      onClick={() => onDelete(task.id)}
    >
      Delete
    </button>
  </div>
</li>

    </>
  )
}
