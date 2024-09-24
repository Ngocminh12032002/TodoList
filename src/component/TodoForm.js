import React, { Component } from "react";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: "" };
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputValue.trim()) {
      this.props.addTodo(this.state.inputValue);
      this.setState({ inputValue: "" });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="todo-form">
        <input
          className="todo-input"
          type="text"
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          placeholder="What needs to be done?"
          autoFocus="true"
        />
      </form>
    );
  }
}

export default TodoForm;
