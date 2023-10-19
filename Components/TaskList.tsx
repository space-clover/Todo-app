import { TaskType } from './Types/TaskType';
import Task from './Task';

interface TaskListProps {
    tasks: TaskType[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onUpdate: (id: number, newText: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete, onUpdate }) => {
    return (
        <div className=' '>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onToggle={() => onToggle(task.id)}
                    onDelete={() => onDelete(task.id)}
                    onUpdate={(newText) => onUpdate(task.id, newText)} 
                />
            ))}
        </div>
    );
};
export default TaskList;