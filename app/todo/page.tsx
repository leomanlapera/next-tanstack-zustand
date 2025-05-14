import { Metadata } from 'next';
import TodoList from './_components/todo-list';

export const metadata: Metadata = {
  title: 'todo app',
};

export default function Todo() {
  return (
    <main className="min-h-screen p-8">
      <TodoList />
    </main>
  );
}
