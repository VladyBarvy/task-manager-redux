// components/ThemeToggle.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/theme/themeSlice.js';
import soundTheme from '../assets/sound_theme.mp3';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme()); // Меняем тему
    playSound(soundTheme); // Воспроизводим звук
  };

  return (
    <div>
      <button onClick={handleToggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
};

export default ThemeToggle;
