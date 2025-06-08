// ContextProvider.js - Provides global state/context for the dashboard app

import React, { createContext, useContext, useState } from 'react';

// Create a context for global state
const StateContext = createContext();

// Initial state for UI elements
const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

// ContextProvider component wraps the app and provides state
export const ContextProvider = ({ children }) => {
  // State variables for theme, menu, and UI
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  // Set the theme mode (light/dark) and persist to localStorage
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  // Set the theme color and persist to localStorage
  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  // Handle clicks for UI elements (chat, cart, etc.)
  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // Provide all state and handlers to children components
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the StateContext
export const useStateContext = () => useContext(StateContext);
