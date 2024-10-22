import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [editText, setEditText] = useState("");

  return (
    <TodoContext.Provider value={{ editText, setEditText }}>
      {children}
    </TodoContext.Provider>
  );
};