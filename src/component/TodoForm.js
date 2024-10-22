import React, { useContext } from "react";
import { TodoContext } from "../UpdateContext";

function TodoForm({ addTodo }) {
  const { editText, setEditText } = useContext(TodoContext);

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

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        className="todo-input"
        type="text"
        value={editText}
        onChange={handleInputChange}
        placeholder="What needs to be done?"
        autoFocus
      />
    </form>
  );
}

export default TodoForm;