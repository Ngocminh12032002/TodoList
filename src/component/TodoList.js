import React, { useState, useContext, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import "./Todo.css";
import { ThemeContext } from "../ThemeContext";
import Pagination from "./TodoPagination";
import { getTasks, createTask, updateTask, deleteTask } from '../axios/api';
import useScrollLoad from "../customhook/useTodos"
import { TodoProvider } from "../UpdateContext";
import { fetchTasksRequest, fetchTasks, addNewTask, updateTaskText, removeTask, clearCompletedTasks, toggleTaskCompletion } from '../redux/taskAction';
import { useSelector, useDispatch } from 'react-redux';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayLimit, setDisplayLimit] = useState(5);
  const [filter, setFilter] = useState("All");
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { listRef, todosPerPage } = useScrollLoad(5, 5);
  const getFilteredTodos = () => {
    switch (filter) {
      case "Active":
        return tasks.filter((todo) => !todo.completed);
      case "Completed":
        return tasks.filter((todo) => todo.completed);
      default:
        return tasks;
    }
  };
  const hasCompletedTodos = () => tasks.some((task) => task.completed);
  const filteredTodos = getFilteredTodos();
  const hasCompleted = hasCompletedTodos();
  const currentTodos = filteredTodos.slice(0, todosPerPage);

  useEffect(() => {
    dispatch(fetchTasksRequest());
  }, [dispatch]);

  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchMoreTasks = async () => {
  //     if (loading || todos.length >= todosPerPage) {
  //       return;
  //     }
  //     try {
  //       const newData = await getTasks();
  //       if (isMounted) {
  //         setTodos(prevTodos => {
  //           if (prevTodos.length >= todosPerPage) {
  //             return prevTodos;
  //           }
  //           return [...prevTodos, ...newData];
  //         });
  //       }
  //     } catch (error) {
  //     }
  //   };
  //   fetchMoreTasks();
  //    return () => {
  //     isMounted = false;
  //   };
  // }, [todosPerPage, loading, todos.length]);


  const removeTodo = (id) => {
    dispatch(removeTask(id));
    setCurrentPage((prevPage) => {
      const totalPages = Math.ceil(filteredTodos.length / todosPerPage);
      return Math.max(1, Math.min(prevPage, totalPages));
    });
  };

  const clearCompleted = () => {
    dispatch(clearCompletedTasks());
    setCurrentPage(1);
  };

  const addTodo = (text) => {
    dispatch(addNewTask({ name: text, completed: false }));
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleAll = () => {
    const allCompleted = tasks.every((task) => task.completed);
    tasks.forEach((task) => dispatch(toggleTaskCompletion(task.id, !allCompleted)));
  };

  const updateTodoText = (id, newText) => {
    if (!newText.trim()) return;
    dispatch(updateTaskText(id, newText));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <><TodoProvider>
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
                  onUpdate={(newText) => updateTodoText(todo.id, newText)} />
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
              className={`buttonfilter todo-deleteAll ${hasCompleted ? "visible" : "hidden"}`}
              onClick={clearCompleted}
            >
              Clear completed
            </button>
          </div>
          {/* <Pagination
      todosPerPage={todosPerPage}
      totalTodos={filteredTodos.length}
      currentPage={currentPage}
      paginate={paginate}
    /> */}
        </div>
        <div className="intro">
          <p>Double-click to edit a todo</p>
          <p>Created by the TodoMVC Team</p>
          <p>Part of TodoMVC</p>
        </div>
      </div>
    </TodoProvider>
    </>
  );
}

export default TodoList;
