'use client';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTodoStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  todo: z.string().min(2, {
    message: 'todo must be at least 2 characters.',
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
      <h1 className="mb-5 font-bold">todo list</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
          <FormField
            control={form.control}
            name="todo"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="add new todo..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">add</Button>
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
            all
          </Button>
          <Button
            size="sm"
            onClick={() => setFilter('active')}
            className={cn({ 'bg-blue-500': filter === 'active' })}
          >
            active
          </Button>
          <Button
            size="sm"
            onClick={() => setFilter('completed')}
            className={cn({ 'bg-blue-500': filter === 'completed' })}
          >
            completed
          </Button>
        </div>
        {todos.some((todo) => todo.completed) && (
          <Button onClick={clearCompleted} variant="destructive" size="sm">
            clear completed
          </Button>
        )}
      </div>
      <ul className="mb-5 space-y-2">
        {filteredTodos.map((todo) => (
          <li key={todo.id} className="flex justify-between gap-5">
            <div className="flex items-start space-x-2">
              <Checkbox
                className="relative top-[2px] leading-none"
                checked={todo.completed}
                onClick={() => toggleTodo(todo.id)}
              />
              <span className="leading-tight">{todo.title}</span>
            </div>
            <Button onClick={() => deleteTodo(todo.id)} variant="destructive" size="sm">
              delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
