import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateNewTaskText, addTask } from '../features/tasks/tasksSlice.js';

const TaskForm = () => {
  const dispatch = useDispatch();
  const text = useSelector(state => state.tasks.text);

  const handleChange = (e) => {
    dispatch(updateNewTaskText(e.target.value));
  };

  const handleAddTask = () => {
    dispatch(addTask());
  };

  return (
    <div>
      <input 
        type="text" 
        value={text} 
        onChange={handleChange} 
        placeholder="Enter a task"
      />
      <button onClick={handleAddTask}>Add</button>
    </div>
  );
};

export default TaskForm;
