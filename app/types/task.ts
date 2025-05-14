export type Task = {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
};

export type TaskFormData = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
