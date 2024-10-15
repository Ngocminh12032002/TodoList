import React, { Component } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import "./Todo.css";
import { ThemeContext } from "../ThemeContext";
import Pagination from "./TodoPagination";

class TodoList extends Component {
  state = {
    todos: [
      { id: 1, text: "Buy milk", completed: false },
      { id: 2, text: "Walk the dog", completed: false },
      { id: 3, text: "Do homeWork", completed: false },
      { id: 4, text: "Do laundry", completed: false },
      { id: 5, text: "Do hoouseWork", completed: false },
      { id: 6, text: "Shipping", completed: false },
      { id: 7, text: "Do something", completed: false },
      { id: 8, text: "Walking", completed: false },
      { id: 9, text: "Cooking", completed: false },
      { id: 10, text: "Matching", completed: false },
      { id: 11, text: "Hanging out", completed: false },
      { id: 12, text: "Feeding", completed: false },
      { id: 13, text: "Gaming", completed: false },
      { id: 14, text: "Coding", completed: false },
      { id: 15, text: "Working", completed: false },
      { id: 16, text: "Fighting", completed: false },
      { id: 17, text: "Doing Gym", completed: false },
      { id: 18, text: "Playing", completed: false },
      { id: 19, text: "Loving", completed: false },
      { id: 20, text: "Drying", completed: false },
      { id: 21, text: "Listening music", completed: false },
      { id: 22, text: "Watching film", completed: false },
      { id: 23, text: "Running", completed: false },
      { id: 24, text: "Do exercise", completed: false },
      { id: 25, text: "Fixing", completed: false },
      { id: 26, text: "Studying", completed: false },
    ],
    filter: "All",
    currentPage: 1,
    todosPerPage: 5,
    loading: false,
    displayLimit: 5,
  };

  listRef = React.createRef();

  componentDidMount() {
    this.listRef.current.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    if (this.listRef.current) {
      this.listRef.current.removeEventListener("scroll", this.handleScroll);
    }
  }

  handleScroll = () => {
    const { loading, displayLimit } = this.state;
    const { scrollTop, scrollHeight, clientHeight } = this.listRef.current;
    if (!loading && scrollHeight - scrollTop - clientHeight <= 0) {
      this.loadMore();
    }
  };

  loadMore = () => {
    const { displayLimit } = this.state;
    const filteredTodos = this.getFilteredTodos();
    
    if (displayLimit >= filteredTodos.length) return;
  
    this.setState(
      { loading: true },
      () => {
        setTimeout(() => {
          this.setState((prevState) => ({
            displayLimit: Math.min(prevState.displayLimit + 5, filteredTodos.length),
            loading: false,
          }));
        }, 500);
      }
    );
  };

  addTodo = (text) => {
    const newTodo = {
      id:
        this.state.todos.length > 0
          ? Math.max(...this.state.todos.map((todo) => todo.id)) + 1
          : 1,
      text,
      completed: false,
    };
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
    }));
  };

  toggleTodo = (id) => {
    const todoIndex = this.state.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) return;

    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  setFilter = (filter) => {
    this.setState({
      filter,
      currentPage: 1,
      displayLimit: 5, 
    });
  };

  remove = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
      currentPage:
        Math.ceil((prevState.todos.length - 1) / prevState.todosPerPage) <
          prevState.currentPage
          ? Math.max(
            1,
            Math.ceil((prevState.todos.length - 1) / prevState.todosPerPage)
          )
          : prevState.currentPage,
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
      currentPage: 1,
    }));
  };

  hasCompletedTodos = () => {
    return this.state.todos.some((todo) => todo.completed);
  };

  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  updateTodoText = (id, newText) => {
    if (!newText.trim()) return;

    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    }));
  };
  render() {
    const filteredTodos = this.getFilteredTodos();
    const hasCompleted = this.hasCompletedTodos();
    const { currentPage, todosPerPage, displayLimit, loading } = this.state;
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    // const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
    const currentTodos = filteredTodos.slice(0, displayLimit);


    return (
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div
            className="todo-app"
            style={{
              background: theme === "light" ? "#fff" : "#333",
              color: theme === "light" ? "#000" : "#fff",
            }}
          >
            <h1>todos</h1>
            <div className="todo-theme">
              <button className="buttonfilter" onClick={toggleTheme}>
                Chuyển sang {theme === "light" ? "Dark" : "Light"} Mode
              </button>
            </div>
            <div className="todo-list">
              <div className="todo-add">
                <button className="toggle-all" onClick={this.toggleAll}>
                  &#9660;
                </button>
                <TodoForm addTodo={this.addTodo} />
              </div>
              <div className="todo-items-container" ref={this.listRef}>
                <ul className="todo-ulist">
                  {currentTodos.map((todo) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={() => this.toggleTodo(todo.id)}
                      onRemove={() => this.remove(todo.id)}
                      onUpdate={(newText) =>
                        this.updateTodoText(todo.id, newText)
                      }
                    />
                  ))}
                </ul>
                {loading && <div className="loading">Loading more...</div>}
              </div>
              <div className="todo-footer">
                <span className="todo-amount">
                  {this.getFilteredTodos().length} items left!
                </span>
                <div className="filters">
                  {["All", "Active", "Completed"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => this.setFilter(filter)}
                      className={`buttonfilter ${this.state.filter === filter ? "active" : ""
                        }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
                <button
                  className={`buttonfilter todo-deleteAll ${hasCompleted ? "visible" : "hidden"
                    }`}
                  onClick={this.clearCompleted}
                >
                  Clear completed
                </button>
              </div>
              <Pagination
                todosPerPage={todosPerPage}
                totalTodos={filteredTodos.length}
                currentPage={currentPage}
                paginate={this.paginate}
              />
            </div>
            <div className="intro">
              <p>Double-click to edit a todo</p>
              <p>Created by the TodoMVC Team</p>
              <p>Part of TodoMVC</p>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default TodoList;
