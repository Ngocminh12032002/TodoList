import React, { Component } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { text } from "@fortawesome/fontawesome-svg-core";
import "./Todo.css";

class TodoList extends Component {
  state = {
    todos: [],
    filter: "All",
  };

  addTodo = (text) => {
    this.setState((prevState) => ({
      todos: [...prevState.todos, { text, completed: false }],
    }));
  };

  toggleTodo = (index) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  remove = (index) => {
    this.setState((prevState) => ({
      todos: prevState.todos
        .map((todo, i) => (i === index ? null : todo))
        .filter((todo) => todo != null),
    }));
  };

  getFilteredTodos = () => {
    switch (this.state.filter) {
      case "Active":
        return this.state.todos.filter((todo) => !todo.completed);
      case "Completed":
        return this.state.todos.filter((todo) => todo.completed);
      default:
        return this.state.todos;
    }
  };

  toggleAll = () => {
    const allCompleted = this.state.todos.every((todo) => todo.completed);
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) => ({
        ...todo,
        completed: !allCompleted,
      })),
    }));
  };

  clearCompleted = () => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => !todo.completed),
    }));
  };

  hasCompletedTodos = () => {
    return this.state.todos.some((todo) => todo.completed);
  };
  render() {
    const filteredTodos = this.getFilteredTodos();
    const hasCompleted = this.hasCompletedTodos();

    return (
      <div className="todo-app">
        <h1>todos</h1>
        <div className="todo-list">
          <div className="todo-add">
            <button className="toggle-all" onClick={this.toggleAll}>
              &#9660;
            </button>
            <TodoForm addTodo={this.addTodo} />
          </div>
          <ul className="todo-ulist">
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                onToggle={() => this.toggleTodo(index)}
                onRemove={() => this.remove(index)}
              />
            ))}
          </ul>
          <div className="todo-footer">
            <span className="todo-amount">
              {this.getFilteredTodos().length} items left!
            </span>
            <div className="filters">
              {["All", "Active", "Completed"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => this.setFilter(filter)}
                  className={`buttonfilter ${
                    this.state.filter === filter ? "active" : ""
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            <button
              className={`buttonfilter todo-deleteAll ${
                hasCompleted ? "visible" : "hidden"
              }`}
              onClick={this.clearCompleted}
            >
              Clear completed
            </button>
          </div>
        </div>
        <div className="intro">
          <p>Double-click to edit a todo</p>
          <p>Created by the TodoMVC Team</p>
          <p>Part of TodoMVC</p>
        </div>
      </div>
    );
  }
}

export default TodoList;
