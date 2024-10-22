import React, { Component, useState, useContext } from "react";
import { TodoContext } from "../UpdateContext";

function TodoItem({ todo, onToggle, onRemove, onUpdate  }) {
  const [isEditing, setEditing] = useState(false);
  const [editText, setEditText] = useState(TodoContext);
  const [localEditText, setLocalEditText] = useState("");
  

  const handleDoubleClick = () => {
    setLocalEditText(todo.name); 
    setEditText(todo.name);
    setEditing(true);
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
    setLocalEditText(e.target.value); 
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      submitEdit();
    }
  };

  const handleBlur = () => {
    this.submitEdit();
  };

  const submitEdit = () => {
    if (editText.trim() !== "") {
      onUpdate(editText);
      setEditing(false);
    }
  };

  return (
    <li className="todo-link">
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      {isEditing ? (
        <input
          type="text"
          className="edit-input"
          value={localEditText}
          onChange={handleChange}
          onKeyDown={handleSubmit}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span
          className={todo.completed ? "completed" : ""}
          onDoubleClick={handleDoubleClick}
        >
          {todo.name}
        </span>
      )}
      <button className="todo-delete" onClick={onRemove}>
        &times;
      </button>
    </li>
  );
}

export default TodoItem;
