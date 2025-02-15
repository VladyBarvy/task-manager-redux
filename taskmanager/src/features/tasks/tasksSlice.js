import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    list: [],
    text: '',
  },
  reducers: {



    updateNewTaskText: (state, action) => {
      state.text = action.payload;
    },



    addTask: (state) => {
      if (state.text.trim()) {
        state.list.push({ id: nanoid(), text: state.text });
        state.text = ''; // очищаем поле ввода после добавления задачи
      }
    },



    deleteTask: (state, action) => {
      state.list = state.list.filter(task => task.id !== action.payload);
    },



    // Редактирование текста задачи
    editTask: (state, action) => {
      const { id, newText } = action.payload;
      const task = state.list.find(task => task.id === id);
      if (task) {
        task.text = newText;  // Обновляем текст задачи
      }
    },



  },
});

export const { updateNewTaskText, addTask, deleteTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
