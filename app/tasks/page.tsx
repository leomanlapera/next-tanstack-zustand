import { Metadata } from 'next';
import TaskList from './_components/task-list';

export const metadata: Metadata = {
  title: 'task management app',
};

export default function Tasks() {
  return <TaskList />;
}
