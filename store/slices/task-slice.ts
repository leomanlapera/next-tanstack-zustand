import { Task } from '@/types/task';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TaskStore = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
};

export const useTaskStore = create<TaskStore>()(
  devtools((set, get) => ({
    tasks: [],
    setTasks: (tasks) => set({ tasks }),
    addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
    updateTask: (id, updatedTask) =>
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)),
      })),
    deleteTask: (id) =>
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
    getTaskById: (id) => get().tasks.find((task) => task.id === id),
  }))
);
