import React from 'react';
import TaskItem from './TaskItem.jsx';

export default function TaskList({ tasks, onDelete, onEdit, handleUpdateCompleted }) {
  return (
    <ul className="mt-6 space-y-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg font-medium">No Tasks Yet</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onEdit={onEdit}
            handleUpdateCompleted={handleUpdateCompleted}
          />
        ))
      )}
    </ul>
  );
}
