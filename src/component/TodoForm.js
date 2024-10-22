import React, { Component, useState, useContext, useEffect } from "react";
import { TodoContext } from "../UpdateContext";

function TodoForm({ addTodo }) {
  const { editText, setEditText } = useContext(TodoContext);
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      addTodo(editText);
      setEditText("");
    }
  };

  useEffect(() => {
    setInputValue(editText);
  }, [editText]);

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        className="todo-input"
        type="text"
        value={editText}
        onChange={handleInputChange}
        placeholder="What needs to be done?"
        autoFocus="true"
      />
    </form>
  );
}

export default TodoForm;
