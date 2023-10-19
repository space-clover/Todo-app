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
      <div className="flex items-center p-0.5  w-40% bg-negro-medianoche text-beige-perlado mt-1% ">
        <div className='border-beige-perlado flex ites-center justify-around text-xl  border-2 w-full py-4 px-3'>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="mr-2"
          />
          {isEditing ? (
            <input
            className='w-50% bg-negro-medianoche text-beige-perlado h-auto resize-none'
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            />
          ) : (
            <span className={`flex-1  text-center ml-2 ${task.completed ? 'line-through' : ''}`}>
              {task.text}
            </span>
          )}
          <div className='flex items-center justify-around w-40%'>
            {isEditing ? (
              <button onClick={handleUpdate} className="text-green-500 flex items-center">
                Actualizar
              </button>
            ) : (
              <button onClick={() => setEditing(true)} className="text-azul-crepusculo mr-2">
                Editar
              </button>
            )}
            <button onClick={onDelete} className="text-red-700">
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Task;