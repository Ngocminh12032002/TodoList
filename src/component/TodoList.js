import React, { useState, useContext } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import "./Todo.css";
import { ThemeContext } from "../ThemeContext";
import Pagination from "./TodoPagination";

function TodoList() {
  const [todos, setTodos] = useState([
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
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(5);
  const [filter, setFilter] = useState();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const getFilteredTodos = () => {
    switch (filter) {
      case "Active":
        return todos.filter((todo) => !todo.completed);
      case "Completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };
  const hasCompletedTodos = () => {
    return todos.some((todo) => todo.completed);
  };
  const filteredTodos = getFilteredTodos();
  const hasCompleted = hasCompletedTodos();
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
  // const currentTodos = filteredTodos.slice(0, displayLimit);

  const listRef = React.createRef();

  const componentDidMount = () => {
    listRef.current.addEventListener("scroll", handleScroll);
  };

  const componentWillUnmount = () => {
    if (listRef.current) {
      listRef.current.removeEventListener("scroll", handleScroll);
    }
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (!loading && scrollHeight - scrollTop - clientHeight <= 0) {
      loadMore();
    }
  };

  const loadMore = () => {
    const filteredTodos = getFilteredTodos();
    if (displayLimit >= filteredTodos.length) return;
    setLoading(true);
    setTimeout(() => {
      setDisplayLimit((prevDisplayLimit) =>
        Math.min(prevDisplayLimit + 5, filteredTodos.length)
      );
      setLoading(false);
    }, 500);
  };

  const addTodo = (text) => {
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1,
      text,
      completed: false,
    };
    setTodos((prevTodo) => [...prevTodo, newTodo]);
  };

  const toggleTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) return;
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const remove = (id) => {
    setTodos((prevTodos) => {
      const filteredTodos = prevTodos.filter((todo) => todo.id !== id);
      const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
      const newCurrentPage =
        totalPages < currentPage ? Math.max(1, totalPages) : currentPage;
      setCurrentPage(newCurrentPage);
      return filteredTodos;
    });
  };

  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos((prevState) =>
      prevState.map((todo) => ({
        ...todo,
        completed: !allCompleted,
      }))
    );
  };

  const clearCompleted = () => {
    setTodos((prevState) =>
      prevState.filter((todo) => !todo.completed),
    );
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const updateTodoText = (id, newText) => {
    if (!newText.trim()) return;
    setTodos((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      ),
    }));
  };
  return (
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
          <button className="toggle-all" onClick={toggleAll}>
            &#9660;
          </button>
          <TodoForm addTodo={addTodo} />
        </div>
        <div className="todo-items-container" ref={listRef}>
          <ul className="todo-ulist">
            {currentTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => toggleTodo(todo.id)}
                onRemove={() => remove(todo.id)}
                onUpdate={(newText) => updateTodoText(todo.id, newText)}
              />
            ))}
          </ul>
          {loading && <div className="loading">Loading more...</div>}
        </div>
        <div className="todo-footer">
          <span className="todo-amount">
            {getFilteredTodos().length} items left!
          </span>
          <div className="filters">
            {["All", "Active", "Completed"].map((filter) => (
              <button
                key={filter}
                onClick={() => setFilter(filter)}
                className={`buttonfilter ${filter === filter ? "active" : ""}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <button
            className={`buttonfilter todo-deleteAll ${hasCompleted ? "visible" : "hidden"
              }`}
            onClick={clearCompleted}
          >
            Clear completed
          </button>
        </div>
        <Pagination
          todosPerPage={todosPerPage}
          totalTodos={filteredTodos.length}
          currentPage={currentPage}
          paginate={paginate}
        />
      </div>
      <div className="intro">
        <p>Double-click to edit a todo</p>
        <p>Created by the TodoMVC Team</p>
        <p>Part of TodoMVC</p>
      </div>
    </div>
  );
}

export default TodoList;
