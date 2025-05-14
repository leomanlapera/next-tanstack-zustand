import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTaskStore } from '../store';
import { taskService } from '../services';
import { TaskFormData } from '../types/task';

export function useTasks() {
  const queryClient = useQueryClient();
  const { setTasks, addTask, updateTask, deleteTask } = useTaskStore();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const data = await taskService.getTasks();
      setTasks(data);
      return data;
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: taskService.createTask,
    onSuccess: (newTask) => {
      addTask(newTask);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TaskFormData> }) =>
      taskService.updateTask(id, data),
    onSuccess: (updatedTask) => {
      updateTask(updatedTask.id, updatedTask);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: taskService.deleteTask,
    onSuccess: (_, id) => {
      deleteTask(id);
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    tasks,
    isLoading,
    error,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
}
