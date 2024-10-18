// useTodos.js
import { useState, useCallback, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../axios/api';

export const useTodos = () => {
  const [todos, setTodos] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getTasks();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = useCallback(async (text) => {
    try {
      const newTodo = await createTask({ text, completed: false });
      setTodos(prevTodos => [...prevTodos, newTodo]);
    } catch (err) {
      setError('Failed to add todo');
    }
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const removeTodo = useCallback(async (id) => {
    try {
      await deleteTask(id);
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to remove todo');
    }
  }, []);

  const toggleAll = useCallback(() => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({
        ...todo,
        completed: !allCompleted,
      }))
    );
  }, [todos]);

  const clearCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, []);

  const updateTodoText = useCallback(async (id, newText) => {
    if (!newText.trim()) return;
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;
      const updatedTodo = await updateTask(id, { ...todoToUpdate, text: newText });
      setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? updatedTodo : todo));
    } catch (err) {
      setError('Failed to update todo text');
    }
  }, [todos]);

  return {
    todos,
    isLoading,
    setTodos,
    addTodo,
    toggleTodo,
    removeTodo,
    toggleAll,
    clearCompleted,
    updateTodoText,
  };
};