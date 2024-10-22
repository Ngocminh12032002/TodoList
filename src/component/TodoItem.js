import React, { useState, useContext } from "react";
import { TodoContext } from "../UpdateContext";

function TodoItem({ todo, onToggle, onRemove, onUpdate }) {
  const [isEditing, setEditing] = useState(false);
  const { editText, setEditText } = useContext(TodoContext);

  const handleDoubleClick = () => {
    setEditText(todo.name);
    setEditing(true);
  };

  const handleChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      submitEdit();
    }
  };

  const handleBlur = () => {
    submitEdit();
  };

  const submitEdit = () => {
    if (editText.trim() !== "") {
      onUpdate(todo.id, editText);
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
          value={editText}
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