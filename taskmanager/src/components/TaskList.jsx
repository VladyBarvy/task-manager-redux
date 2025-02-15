import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, editTask } from '../features/tasks/tasksSlice.js';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.list);

  const [isEditing, setIsEditing] = useState(null); // Хранит id задачи, которую редактируем
  const [newText, setNewText] = useState(''); // Новый текст для редактируемой задачи

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    setIsEditing(task.id);  // Включаем режим редактирования для этой задачи
    setNewText(task.text);   // Заполняем форму текущим текстом задачи
  };

  const handleSaveEdit = () => {
    if (newText.trim()) {
      dispatch(editTask({ id: isEditing, newText })); // Отправляем экшен для редактирования
      setIsEditing(null); // Выключаем режим редактирования
      setNewText('');     // Очищаем поле ввода
    }
  };

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {isEditing === task.id ? (
            <div>
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)} // Обновляем новый текст задачи
              />
              <button onClick={handleSaveEdit}>Save</button>  {/* Сохраняем изменения */}
              <button onClick={() => setIsEditing(null)}>Cancel</button> {/* Отменить редактирование */}
            </div>
          ) : (
            <div>
              {task.text}  {/* Показываем текст задачи */}
              <button onClick={() => handleEdit(task)}>Edit</button> {/* Кнопка редактирования */}
              <button onClick={() => handleDelete(task.id)}>×</button> {/* Кнопка удаления */}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
