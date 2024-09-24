import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { todo, onToggle, onRemove } = this.props;

    return (
      <li className="todo-link">
        <input type="checkbox" checked={todo.completed} onChange={onToggle} />
        <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
        <button className="todo-delete" onClick={onRemove}>
          &times;
        </button>
      </li>
    );
  }
}

export default TodoItem;
