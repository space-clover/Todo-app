"use client"
import { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import TaskList from '../Components/TaskList';
import { TaskType } from '../Components/Types/TaskType';
import { NoteType } from '@/Components/Types/NoteType';
import { GiHummingbird, GiNestBirds  } from 'react-icons/gi';
import { AiFillCloseSquare, AiFillPlusCircle, AiOutlineSlackSquare } from "react-icons/ai";


const Home: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [notes, setNotes] = useState<NoteType[]>([]); 
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [newTaskTextnote, setNewTaskTextnote] = useState<string>('');
  const [parentState, setParentState] = useState(false);
  const [parentStatenote, setParentStatenote] = useState(false);
  const [importantlist, setImportantlist] = useState(false);
  const [uncompleted, setuncompleted] = useState(false);
  const [isTaskImportant, setIsTaskImportant] = useState(false);
  const [isTaskRelevant, setIsTaskrelevant] = useState(false);

const relevant = () => {
  setIsTaskrelevant(!isTaskRelevant);
  console.log(isTaskRelevant)
}
const togglerelevant = () => {
  setImportantlist(!importantlist);

  if (importantlist) {
    fetchTasks()
  } else {
    fetchTasks()
  }
};
const uncompletedstate = () => {
  setuncompleted(!uncompleted);

  if (uncompleted) {
    fetchTasks()
  } else {
    fetchTasks()
  }
};
  const handleChildStateChange = (newChildState: boolean) => {
    setParentState(newChildState);
  };
  const handleChildStateChangenote = (newChildStatenote: boolean) => {
    setParentStatenote(newChildStatenote);
  };
  const onUpdatenote = async (noteId: number, newText: string) => {
    const noteToUpdate = notes.find((note) => note.id === noteId);
    if (noteToUpdate) {
      noteToUpdate.text = newText;
      await axios.put(`http://localhost:5000/notes/${noteId}`, noteToUpdate);
      fetchNotes();
    };
  }

  const onDeletenote = async (noteId: number) => {
    await axios.delete(`http://localhost:5000/notes/${noteId}`);
    fetchNotes();
  };
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tasks');
      const allTasks = response.data;
      const completeTasks = allTasks.filter(task => task.completed);
      const importantTasks = allTasks.filter(task => task.important)
      const unimportantTasks = allTasks.filter(task => !task.important);
      const uncompletedTasks = allTasks.filter(task => !task.completed);
      const completeAndImportantTasks = completeTasks.filter(task => task.important);
      const uncompletedAndImportantTasks = uncompletedTasks.filter(task => task.important);


      if (importantlist && uncompleted && isTaskRelevant) {
        setTasks(importantTasks);
      } else if (importantlist && uncompleted && !isTaskRelevant) {
        setTasks(unimportantTasks);
      } else if (importantlist && !uncompleted && isTaskRelevant) {
        setTasks(completeAndImportantTasks);
      } else if (importantlist && !uncompleted && !isTaskRelevant) {
        setTasks(completeTasks);
      } else if (!importantlist && uncompleted && isTaskRelevant) {
        setTasks(uncompletedAndImportantTasks);
      } else if (!importantlist && uncompleted && !isTaskRelevant) {;
        setTasks(uncompletedTasks);
      } else if (!importantlist && !uncompleted && isTaskRelevant) {
        setTasks(importantTasks);
      } else {
        setTasks(allTasks);
      }
      
    } catch (error) {
      console.error(
        'Error al obtener las tareas:', error);
    }
  };
  
 
  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:5000/Notes');
    setNotes(response.data);
  };
  const updateTask = async (taskId: number, newText: string) => {
    
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.text = newText;
      await axios.put(`http://localhost:5000/tasks/${taskId}`, taskToUpdate);
      fetchTasks();
      console.log(importantlist)
    }
  };
  const toggleTask = async (taskId: number) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.completed = !taskToUpdate.completed;
      await axios.put(`http://localhost:5000/tasks/${taskId}`, taskToUpdate);
      fetchTasks();
     
    }
  };

  const addTask = async () => {
    if (newTaskText.trim() === '') {
      return;
    }
  
    const newTask = {
      text: newTaskText,
      completed: false,
      important: isTaskImportant, // Aquí establecemos el valor de importante según el estado del checkbox
    };
  
    await axios.post('http://localhost:5000/tasks', newTask);
    setNewTaskText('');
    setIsTaskImportant(false); // Reiniciamos el estado del checkbox
    fetchTasks();
  };
  const addNote = async () => {
    if (newTaskTextnote.trim() === '') {
      return;
    }
  
    const newNote = {
      text: newTaskTextnote,
      completed: false,
    };
  
    await axios.post('http://localhost:5000/Notes', newNote); // Aquí debería ser '/notes' en lugar de '/tasks'
    setNewTaskTextnote(''); // Debes utilizar setNewNoteText para limpiar el campo de entrada
    fetchNotes();
  };
  
  

  const deleteTask = async (taskId: number) => {
    await axios.delete(`http://localhost:5000/tasks/${taskId}`);
    fetchTasks();
    console.log(importantlist)
  };

  useEffect(() => {
    fetchTasks();
    fetchNotes();
    uncompletedstate;
    togglerelevant;
    setIsTaskrelevant
  }, [importantlist, uncompleted,isTaskRelevant]);
  
  return (
    <div className=" bg-beige-perlado h-screen w-full flex items-center justify-center px-3 ">

      <div className='border-4 container mx-auto  border-negro-medianoche p-1'>
        <div className='border container mx-auto border-negro-medianoche p-1 relative'>

          <h1 className="text-8xl font-bold mb-3 text-negro-medianoche ml-2% ">TORITETSU LIST</h1>
          <div className='absolute top-1% right-3% py-4 px-4 rounded-full border-4 flex flex-col border-negro-medianoche'>
          <GiNestBirds className="text-azul-nocturno text-5xl "/>
          </div>
          { parentState && <div className=" w-1/2 absolute top-1/3 left-1/4 bg-beige-perlado   mb-4 ">
            <div className='border-4 border-negro-medianoche p-0.5'>
              <div className='border border-negro-medianoche  space-x-2 p-2 '>
                <div className='flex justify-around'>
                  <h1 className='text-left text-3xl font-bold text-negro-medianoche w-full '> Nueva tarea</h1>
                </div>
                <div className='flex w-full justify-around items-center mt-2%'>
                  <input
                    type="text"
                    className="w-full  border-2 border-negro-medianoche rounded-xl p-2 text-negro-medianoche bg-beige-perlado"
                    placeholder="Agregar una nueva tarea..."
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={isTaskImportant}
                      onChange={() => setIsTaskImportant(!isTaskImportant)}
                    />
                    Importante
                  </label>
                  <AiFillPlusCircle
                    className=" mx-2% text-azul-nocturno text-5xl hover:cursor-pointer  rounded"
                    onClick={addTask}
                  />
                </div>
              </div>
            </div>
          </div> }
          { parentStatenote && <div className=" w-1/2 absolute top-1/3 left-1/4 bg-beige-perlado   mb-4 ">
            <div className='border-4 border-negro-medianoche p-0.5'>
              <div className='border border-negro-medianoche  space-x-2 p-2 '>
                <div className='flex justify-around'>
                  <h1 className='text-left text-3xl font-bold text-negro-medianoche w-full '> Nueva Nota</h1>
                </div>
                <div className='flex w-full justify-around items-center mt-2%'>
                  <input
                    type="text"
                    className="w-full  border-2 border-negro-medianoche rounded-xl p-2 text-negro-medianoche bg-beige-perlado"
                    placeholder="Agregar una nueva tarea..."
                    value={newTaskTextnote}
                    onChange={(e) => setNewTaskTextnote(e.target.value)}
                  />
                  <AiFillPlusCircle
                    className=" mx-2% text-azul-nocturno text-5xl hover:cursor-pointer  rounded"
                    onClick={addNote}
                  />
                </div>
              </div>
            </div>
          </div> }
          <TaskList notes={notes} Onrelevantstate={relevant} uncompletedstate={uncompletedstate} onstateimportant={togglerelevant} tasks={tasks} onDeletenote={onDeletenote} onUpdatenote={onUpdatenote} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} onStateChange={handleChildStateChange} onStateChangenote={handleChildStateChangenote} />
        </div>
      </div>
    </div>
  );
};

export default Home;