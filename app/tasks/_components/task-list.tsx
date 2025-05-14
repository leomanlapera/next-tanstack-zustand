'use client';

import { Form } from '@/components/ui/form';
import React from 'react';
import { useForm } from 'react-hook-form';
import { TaskSchema, Task } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';

const TaskList = () => {
  const form = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
    },
  });

  return (
    <div className="mx-auto min-h-screen max-w-md p-8">
      <h1 className="mb-5 font-bold">task management</h1>
    </div>
  );
};

export default TaskList;
