import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isEditing: false,
    editText: this.props.todo.text
  };

  handleDoubleClick = () => {
    this.setState({ 
      isEditing: true,
      editText: this.props.todo.text 
    });
  };

  handleChange = (e) => {
    this.setState({ editText: e.target.value });
  };

  handleSubmit = (e) => {
    if (e.key === 'Enter') {
      this.submitEdit();
    }
  };

  handleBlur = () => {
    this.submitEdit();
  };

  submitEdit = () => {
    const { editText } = this.state;
    const { onUpdate } = this.props;
    
    if (editText.trim() !== '') {
      onUpdate(editText);
      this.setState({ isEditing: false });
    }
  };

  render() {
    const { todo, onToggle, onRemove } = this.props;
    const { isEditing, editText } = this.state;
    
    return (
      <li className="todo-link">
        <input 
          type="checkbox" 
          checked={todo.completed} 
          onChange={onToggle}
        />
        {isEditing ? (
          <input
            type="text"
            className="edit-input"
            value={editText}
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
            onBlur={this.handleBlur}
            autoFocus
          />
        ) : (
          <span 
            className={todo.completed ? "completed" : ""}
            onDoubleClick={this.handleDoubleClick}
          >
            {todo.text}
          </span>
        )}
        <button className="todo-delete" onClick={onRemove}>
          &times;
        </button>
      </li>
    );
  }
}

export default TodoItem;

// - sửa theme
// - phân trang scroll bar 
