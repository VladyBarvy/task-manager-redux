import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, editTask } from '../features/tasks/tasksSlice.js';
import { motion, AnimatePresence } from "framer-motion"; // Импортируем анимацию


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

  // return (
  //   <ul>
  //     {tasks.map(task => (
  //       <li key={task.id}>
  //         {isEditing === task.id ? (
  //           <div>
  //             <input
  //               type="text"
  //               value={newText}
  //               onChange={(e) => setNewText(e.target.value)} // Обновляем новый текст задачи
  //             />
  //             <button onClick={handleSaveEdit}>Save</button>  {/* Сохраняем изменения */}
  //             <button onClick={() => setIsEditing(null)}>Cancel</button> {/* Отменить редактирование */}
  //           </div>
  //         ) : (
  //           <div>
  //             {task.text}  {/* Показываем текст задачи */}
  //             <button onClick={() => handleEdit(task)}>Edit</button> {/* Кнопка редактирования */}
  //             <button onClick={() => handleDelete(task.id)}>×</button> {/* Кнопка удаления */}
  //           </div>
  //         )}
  //       </li>
  //     ))}
  //   </ul>
  // );

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, x: -20 }} // Анимация появления
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }} // Анимация удаления
            transition={{ duration: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#f4f4f4",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            {isEditing === task.id ? (
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setIsEditing(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <span>{task.text}</span>
                <div>
                  <button onClick={() => handleEdit(task)}>Edit</button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    ×
                  </button>
                </div>
              </>
            )}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );



};

export default TaskList;
