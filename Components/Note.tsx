import { useState } from 'react';
import { NoteType } from "./Types/NoteType"; 
import { AiOutlineEdit, AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";

interface NoteProps {
  note: NoteType; 
  onUpdatenote: (text: string) => void;
  onDeletenote: () => void;
}

const Note: React.FC<NoteProps> = ({ note, onUpdatenote, onDeletenote }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(note.text);

  const handleUpdate = () => {
    onUpdatenote(editedText);
    setEditing(false);
  };

  return (
        <div className="flex items-center p-0.5 w-full bg-negro-medianoche text-beige-perlado mt-1%">
        <div className='border-beige-perlado flex items-center justify-around text-xl border-2 w-full py-4 px-3'>
            {isEditing ? (
            <input
                className='flex-1 bg-negro-medianoche ml-2 text-beige-perlado h-auto resize-none'
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
            />
            ) : (
            <span className={`flex-1 text-left ml-2`}>
                {note.text}
            </span>
            )}
            <div className='flex items-center justify-around w-20%'>
            {isEditing ? (
                <button onClick={handleUpdate} className="text-green-500 text-2xl flex mr-2 items-center">
                <AiOutlineCheck />
                </button>
            ) : (
                <button onClick={() => setEditing(true)} className="text-azul-crepusculo text-2xl mr-2">
                <AiOutlineEdit />
                </button>
            )}
            <button onClick={onDeletenote} className="text-red-800 text-2xl">
                <AiOutlineDelete />
            </button>
            </div>
        </div>
        </div>
    );
    };

export default Note;
