import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';


// Функция для загрузки задач из LocalStorage
const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};


const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: loadTasksFromLocalStorage(), // Загружаем задачи при старте
    text: '',
  },
  reducers: {



    updateNewTaskText: (state, action) => {
      state.text = action.payload;
    },



    addTask: (state) => {
      if (state.text.trim()) {
        const newTask = { id: nanoid(), text: state.text };
        state.list.push(newTask); //state.list.push({ id: nanoid(), text: state.text });
        state.text = ''; // очищаем поле ввода после добавления задачи
        localStorage.setItem("tasks", JSON.stringify(state.list)); // Сохраняем в LocalStorage
      }
    },



    deleteTask: (state, action) => {
      state.list = state.list.filter(task => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.list)); // Обновляем LocalStorage
    },



    // Редактирование текста задачи
    editTask: (state, action) => {
      const { id, newText } = action.payload;
      const task = state.list.find(task => task.id === id);
      if (task) {
        task.text = newText;  // Обновляем текст задачи
        localStorage.setItem("tasks", JSON.stringify(state.list)); // Сохраняем изменения в LocalStorage
      }
    },



  },
});

export const { updateNewTaskText, addTask, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
