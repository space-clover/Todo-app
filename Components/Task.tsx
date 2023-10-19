"use client"
import { useState } from 'react';
import { TaskType } from "./Types/TaskType";
interface TaskProps {
    task: TaskType;
    onToggle: () => void;
    onDelete: () => void;
    onUpdate: (text: string) => void; // Nueva función para actualizar
  }
  
  const Task: React.FC<TaskProps> = ({ task, onToggle, onDelete, onUpdate, }) => {
    const [isEditing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
  
    const handleUpdate = () => {
      onUpdate(editedText);
      setEditing(false);
    };
  
    return (
      <div className="flex items-center p-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="mr-2"
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <span className={`flex-1 ${task.completed ? 'line-through' : ''}`}>
            {task.text}
          </span>
        )}
        {isEditing ? (
          <button onClick={handleUpdate} className="text-green-500">
            Actualizar
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="text-blue-500 mr-2">
            Editar
          </button>
        )}
        <button onClick={onDelete} className="text-red-500">
          Eliminar
        </button>
      </div>
    );
  };
  
  export default Task;