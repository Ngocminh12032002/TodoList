import React, { useState, useContext, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import "./Todo.css";
import { ThemeContext } from "../ThemeContext";
import Pagination from "./TodoPagination";
import { useTodos } from "../customhook/useTodos"
import { getTasks, createTask, updateTask, deleteTask } from '../axios/api';

function TodoList() {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks(); 
        setTodos(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const { } = useTodos();
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

  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      const filteredTodos = prevTodos.filter((todo) => todo.id !== id);
      const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
      const newCurrentPage =
        totalPages < currentPage ? Math.max(1, totalPages) : currentPage;
      setCurrentPage(newCurrentPage);
      return filteredTodos;
    });
  };

  const clearCompleted = () => {
    setTodos((prevState) =>
      prevState.filter((todo) => !todo.completed),
    );
    setCurrentPage(1);
  };

  const addTodo = (text) => {
    try {
      const newTodo = createTask({ name: text, completed: false });
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (err) {
    }
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        completed: !allCompleted,
      }))
    );
  };

  const updateTodoText = (id, newText) => {
    if (!newText.trim()) return;
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;
      const updatedTodo = updateTask(id, { ...todoToUpdate, text: newText });
      setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                onRemove={() => removeTodo(todo.id)}
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
