'use client';

import React from 'react';
import { useTasks } from '@/hooks';
import { z } from 'zod';
import TaskForm from './task-form';
import { Separator } from '@/components/ui/separator';
import TaskCard from './task-card';
import { taskSchema } from '@/types';

const TaskList = () => {
  const { tasks, isLoading, isCreating, isUpdating, error, createTask, updateTask, deleteTask } =
    useTasks();

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error: {error.message}</div>;

  // Add console.log to debug task creation
  const handleCreateTask = async (data: z.infer<typeof taskSchema>) => {
    console.log('Creating task with data:', data);
    try {
      await createTask(data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-lg space-y-8 p-8">
      <div>
        <h1 className="mb-5 font-bold">task management</h1>
        <TaskForm onSubmit={handleCreateTask} isLoading={isCreating} />
      </div>
      <Separator />
      <div className="space-y-4">
        {tasks?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStatusChange={(status) => updateTask({ id: task.id, data: { status } })}
            onDelete={() => deleteTask(task.id)}
            isUpdating={isUpdating}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
