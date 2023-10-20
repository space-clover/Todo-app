"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../Components/TaskList';
import { TaskType } from '../Components/Types/TaskType';
import { GiHummingbird, GiNestBirds  } from 'react-icons/gi';
import { AiFillCloseSquare, AiFillPlusCircle, AiOutlineSlackSquare } from "react-icons/ai";


const Home: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [parentState, setParentState] = useState(false);

  const handleChildStateChange = (newChildState: boolean) => {
    setParentState(newChildState);
  };

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };
  const updateTask = async (taskId: number, newText: string) => {
    
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (taskToUpdate) {
      taskToUpdate.text = newText;
      await axios.put(`http://localhost:5000/tasks/${taskId}`, taskToUpdate);
      fetchTasks();
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
    };

    await axios.post('http://localhost:5000/tasks', newTask);
    setNewTaskText('');
    fetchTasks();
  };

  const deleteTask = async (taskId: number) => {
    await axios.delete(`http://localhost:5000/tasks/${taskId}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
                  <AiFillPlusCircle
                    className=" mx-2% text-azul-nocturno text-5xl hover:cursor-pointer  rounded"
                    onClick={addTask}
                  />
                </div>
              </div>
            </div>
          </div> }
          <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} onStateChange={handleChildStateChange} />
        </div>
      </div>
    </div>
  );
};

export default Home;