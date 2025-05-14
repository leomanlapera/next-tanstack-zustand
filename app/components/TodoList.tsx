'use client';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTodoStore } from '../store/useTodoStore';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  todo: z.string().min(2, {
    message: 'Todo must be at least 2 characters.',
  }),
});

export default function TodoList() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      todo: '',
    },
  });
  const { todos, filter, addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } =
    useTodoStore();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addTodo(values.todo);
    form.reset();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-5 text-2xl font-bold">Todo List</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Add new todo..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add</Button>
        </form>
      </Form>
      <div className="mb-5 mt-10 flex justify-between gap-2">
        <div className="space-x-2">
          <Button
            size="sm"
            onClick={() => setFilter('all')}
            className={cn({
              'bg-blue-500': filter === 'all',
            })}
          >
            All
          </Button>
          <Button
            size="sm"
            onClick={() => setFilter('active')}
            className={cn({ 'bg-blue-500': filter === 'active' })}
          >
            Active
          </Button>
          <Button
            size="sm"
            onClick={() => setFilter('completed')}
            className={cn({ 'bg-blue-500': filter === 'completed' })}
          >
            Completed
          </Button>
        </div>
        {todos.some((todo) => todo.completed) && (
          <Button onClick={clearCompleted} variant="destructive" size="sm">
            Clear completed
          </Button>
        )}
      </div>
      <ul className="mb-5 space-y-2">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex justify-between gap-5">
            <div className="flex items-start space-x-2">
              <Checkbox
                className="relative top-[3px]"
                checked={todo.completed}
                onClick={() => toggleTodo(todo.id)}
              />
              <span>{todo.title}</span>
            </div>
            <Button onClick={() => deleteTodo(todo.id)} variant="destructive" size="sm">
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
