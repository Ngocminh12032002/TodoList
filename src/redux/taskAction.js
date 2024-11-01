// src/actions/tasksActions.js
import { getTasks, createTask, updateTask, deleteTask } from "../axios/api";

export const FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const TOGGLE_TASK_SUCCESS = "TOGGLE_TASK_SUCCESS";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const REMOVE_TASK_SUCCESS = "REMOVE_TASK_SUCCESS";
export const CLEAR_COMPLETED_TASKS_SUCCESS = "CLEAR_COMPLETED_TASKS_SUCCESS";

export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const tasks = await getTasks();
    dispatch(fetchTasksSuccess(tasks));
  } catch (error) {
    dispatch(fetchTasksFailure(error.message));
  }
};

export const addNewTask = (taskData) => async (dispatch) => {
  try {
    const newTask = await createTask(taskData);
    dispatch({ type: ADD_TASK_SUCCESS, payload: newTask });
  } catch (error) {
    console.error(error);
  }
};

export const toggleTaskCompletion = (taskId) => async (dispatch, getState) => {
  try {
    const task = getState().tasks.tasks.find((t) => t.id === taskId);
    const updatedTask = await updateTask(taskId, {
      completed: !task.completed,
    });
    dispatch({ type: TOGGLE_TASK_SUCCESS, payload: updatedTask });
  } catch (error) {
    console.error(error);
  }
};

export const updateTaskText =
  (taskId, newText) => async (dispatch, getState) => {
    try {
      const task = getState().tasks.tasks.find((t) => t.id === taskId);
      const updatedTask = await updateTask(taskId, { ...task, text: newText });
      dispatch({ type: UPDATE_TASK_SUCCESS, payload: updatedTask });
    } catch (error) {
      console.error(error);
    }
  };

export const removeTask = (taskId) => async (dispatch) => {
  try {
    await deleteTask(taskId);
    dispatch({ type: REMOVE_TASK_SUCCESS, payload: taskId });
  } catch (error) {
    console.error(error);
  }
};

export const clearCompletedTasks = () => (dispatch, getState) => {
  const tasks = getState().tasks.tasks.filter((task) => !task.completed);
  dispatch({ type: CLEAR_COMPLETED_TASKS_SUCCESS, payload: tasks });
};
