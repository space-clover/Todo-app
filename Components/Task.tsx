"use client"
import { useState } from 'react';
import { TaskType } from "./Types/TaskType";
import { AiFillEdit, AiFillStar, AiOutlineCheck, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
interface TaskProps {
    task: TaskType;
    onToggle: () => void;
    onDelete: () => void;
    onUpdate: (text: string) => void; 
  }
  
  const Task: React.FC<TaskProps> = ({ task, onToggle, onDelete, onUpdate, }) => {
    const [isEditing, setEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
  
    const handleUpdate = () => {
      onUpdate(editedText);
      setEditing(false);
    };
  
    return (  
      <div className="flex items-center p-0.5 z-10  relative w-full bg-negro-medianoche text-beige-perlado mt-1% ">
          <AiFillStar className={`absolute top-1 right-1 text-xl   ${task.important ? 'text-yellow-600' : 'text-negro-medianoche'}`}/>
        <div className='border-beige-perlado flex items-center justify-around text-xl  border-2 w-full py-4 px-3'>
      
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="mr-2"
          />
          {isEditing ? (
            <input
            className='flex-1 bg-negro-medianoche ml-2 text-beige-perlado h-auto resize-none'
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            />
          ) : (
            <span className={`flex-1  text-left ml-2 ${task.completed ? 'line-through' : ''}`}>
              {task.text}
            </span>
          )}
          <div className='flex items-center justify-around w-20%'>
            {isEditing ? (
              <button onClick={handleUpdate} className="text-green-500 text-2xl flex mr-2 items-center">
                <AiOutlineCheck/>
              </button>
            ) : (
              <button onClick={() => setEditing(true)} className="text-azul-crepusculo text-2xl mr-2">
                <AiOutlineEdit/>
              </button>
            )}
            <button onClick={onDelete} className="text-red-800 text-2xl">
              <AiOutlineDelete/>
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Task;