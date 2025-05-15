import { Task, TaskFormData } from '@/types';
import { generateId } from '@/lib/utils';

const API_URL = 'http://localhost:3001/tasks';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return response.json();
  },

  async createTask(data: TaskFormData): Promise<Task> {
    const now = new Date().toISOString();
    const newTask: Task = {
      ...data,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      throw new Error('Failed to create task');
    }
    return response.json();
  },

  async updateTask(id: string, data: Partial<TaskFormData>): Promise<Task> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update task');
    }
    return response.json();
  },

  async deleteTask(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
  },
};
