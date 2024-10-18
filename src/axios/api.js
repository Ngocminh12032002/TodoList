import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 10000,
});

export const getTasks = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const createTask = async (task) => {
    try {
        const response = await api.post('/', task);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

export const updateTask = async (id, task) => {
    try {
        const response = await api.put(`/${id}`, task);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTask = async (id) => {
    try {
        await api.delete(`/${id}`);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};
