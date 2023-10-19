"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskList from '../Components/TaskList';
import { TaskType } from '../Components/Types/TaskType';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskText, setNewTaskText] = useState<string>('');

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
    <div className="container mx-auto  bg-beige-perlado h-screen w-full p-5">
      <h1 className="text-7xl font-semibold mb-3 text-negro-medianoche">Lista de Tareas</h1>
      <div className="flex space-x-2 mb-4 hidden">
        <input
          type="text"
          className="w-full p-2"
          placeholder="Agregar una nueva tarea..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={addTask}
        >
          Agregar
        </button>
      </div>
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} />
    </div>
  );
};

export default Home;