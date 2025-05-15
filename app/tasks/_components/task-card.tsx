import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Task } from '@/types';

interface TaskCardProps {
  task: Task;
  onStatusChange: (status: Task['status']) => void;
  onDelete: () => void;
  isUpdating?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onStatusChange, onDelete, isUpdating }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <CardTitle>{task.title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onDelete} disabled={isUpdating}>
            delete
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-500">{task.description}</p>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Select value={task.status} onValueChange={onStatusChange} disabled={isUpdating}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">pending</SelectItem>
                <SelectItem value="in_progress">in progress</SelectItem>
                <SelectItem value="completed">completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Badge
            variant={
              task.priority === 'high'
                ? 'destructive'
                : task.priority === 'medium'
                  ? 'default'
                  : 'secondary'
            }
          >
            {task.priority}
          </Badge>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Created: {new Date(task.createdAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
