"use client"
import { TaskType } from './Types/TaskType';
import { NoteType } from './Types/NoteType';
import React, { useState, useEffect } from 'react';
import Task from './Task';
import axios from 'axios';
import Note from './Note';
import { motion } from "framer-motion"
import { AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';

interface TaskListProps {
    tasks: TaskType[];
    notes: NoteType[]; 
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onDeletenote: (id: number) => void;
    onUpdate: (id: number, newText: string) => void;
    onUpdatenote: (id: number, newText: string) => void;
    onStateChange: (newState: boolean) => void;
    onStateChangenote: (newState: boolean) => void;
    onstateimportant: (newState: boolean) => void;
    uncompletedstate: (newState: boolean) => void;
    Onrelevantstate: (newState: boolean) => void;
}

const apiUrl = 'http://worldtimeapi.org/api/ip';


const TaskList: React.FC<TaskListProps> = ({ notes, tasks, onDeletenote, onUpdatenote ,onToggle, onDelete, onUpdate, onStateChange, onStateChangenote, onstateimportant, uncompletedstate, Onrelevantstate }) => {
    const [childState, setChildState] = useState(false);
    const [childStatenote, setChildStatenote] = useState(false);
    const [importants, setimportants] = useState(false);
    const [complet, setcomplet] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [isImportant, setIsImportant] = useState(false);
    const [Relevantstate, setRelevant] = useState(false);
    const fetchCurrentTime = () => {
        axios.get(apiUrl)
            .then((response) => {
                const currentTime = response.data.datetime;
                setCurrentTime(currentTime);
            })
            .catch((error) => {
                console.error('Error al obtener la hora:', error);
            });
    };
    useEffect(() => {
        fetchCurrentTime();
    }, []);
    useEffect(() => {
        const intervalId = setInterval(fetchCurrentTime, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);
    const horaMatch: RegExpMatchArray | null = currentTime.match(/\d{2}:\d{2}:\d{2}/);
    const toggleState = () => {
        const newState = !childState;
        setChildState(newState);
        onStateChange(newState);
    };
    const toggleStatenote = () => {
        const newState = !childStatenote;
        setChildStatenote(newState);
        onStateChangenote(newState);
    };
    const important = () => {
        const newState = !importants;
        setimportants(newState);
        setIsImportant(!isImportant);
        onstateimportant(newState);
    };
    const Uncompleted = () => {
        const newState = !complet;
        setcomplet(newState);
        uncompletedstate(newState);
    };
    const Relevant = () => {
        const newState = !Relevantstate;
        setRelevant(newState);
        Onrelevantstate(newState);
    };
    
    const lineanimation = {
        initial: { width: "0px" },
        animate: { width: isImportant ? "100%" : "0px", transition: { duration: 0.6 } },  
    };
    const lineanimationuncompleted = {
        initial: { width: "0px" },
        animate: { width: complet ? "100%" : "0px", transition: { duration: 0.6 } },  
    };
    const lineanimationrelevant = {
        initial: { width: "0px" },
        animate: { width: Relevantstate ? "100%" : "0px", transition: { duration: 0.6 } },  
    };
    return (
        
        <section className='flex w-full justify-around px-1%'>
            <div className=' w-42% flex flex-col '>
                <div className='my-1%  p-0.5 bg-azul-crepusculo'>
                    <div className='border p-2 border-beige-perlado flex justify-around items-center '>
                        <h1 className='text-center tracking-widest text-3xl font-bold '> TASK TO DO </h1>
                        <AiOutlinePlusCircle className="text-3xl hover:cursor-pointer hover:text-negro-medianoche hover:bg-beige-perlado rounded-full transition duration-300 text-beige-perlado"
                        onClick={toggleState}/>
                    </div>
                </div>
                <div className=' h-48vh overflow-y-auto border-2 border-black p-2 scrollbar-thin  scrollbar-thumb-slate-400'>
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
                
                <p className='text-8xl text-center my-2 flex-1 flex items-center justify-center text-negro-medianoche'> {horaMatch}</p>

        </div>
            <div className=' w-50%  '>
                <div className='mt-1% mb-2%  p-0.5 bg-azul-crepusculo'>
                    <div className='border p-2 border-beige-perlado '>
                        <h1 className='text-center tracking-widest text-3xl font-bold text-beige-perlado ' 
                        > TASK TO DO TYPE </h1>
                    </div>
                </div>
                <div className=' w-full flex justify-between '>
                <button
                    className=" hover:text-azul-profundo text-negro  transition duration-200 w-32% border-2 px-2  flex flex-col relative  border-negro-medianoche cursor-pointer"
                    onClick={important}>
                    <motion.p className='border-y-2 border-azul-profundo absolute top-0 left-0 w-full  '
                    {...lineanimation}/>
                    <h1 className="text-center py-3 tracking-wider text-lg w-full font-bold ">COMPLETED</h1>
                </button>
                        <button className=' hover:text-azul-profundo text-negro  transition duration-200 w-32% border-2 relative px-2 py-3 border-negro-medianoche'
                        onClick={Uncompleted}>
                            <motion.p className='border-y-2 border-azul-profundo absolute top-0 left-0 w-full  '
                            {...lineanimationuncompleted}/>
                            <h1 className='text-center tracking-wider w-full text-lg font-bold '> UNCOMPLETED</h1>
                        </button>
                        <button className=' hover:text-azul-profundo text-negro  transition duration-200 w-32% border-2 px-2 py-3 border-negro-medianoche relative' onClick={Relevant}>
                        <motion.p className='border-y-2 border-azul-profundo absolute top-0 left-0 w-full  '
                            {...lineanimationrelevant}/>
                            <h1 className='text-center tracking-wider text-lg font-bold  '>IMPORTANT</h1>
                        </button>
                </div>
                <div className='my-2%  p-0.5 bg-azul-crepusculo'>
                    <div className='border p-2 border-beige-perlado flex justify-around items-center '>
                        <h1 className='text-center tracking-widest text-3xl font-bold text-beige-perlado w-3/4 '> NOTES </h1>
                        <AiOutlinePlusCircle className="text-3xl hover:cursor-pointer text-beige-perlado hover:text-negro-medianoche hover:bg-beige-perlado rounded-full transition duration-300"
                        onClick={toggleStatenote}/>
                    </div>
                </div>
                <div className='p-2 border-2 mb-2% border-negro-medianoche h-39vh overflow-y-auto  scrollbar-thin  scrollbar-thumb-slate-400  '>
                {notes.map((note) => (
                    <Note
                    key={note.id}
                    note={note}
                    onUpdatenote={(newText) => onUpdatenote(note.id, newText)}
                    onDeletenote={() => onDeletenote(note.id)}
                    />
                ))}
                </div>
                <h1 className='text-negro-medianoche text-6xl font-bold text-center'>旅程、今日で終わり</h1>
                <div className='flex justify-between items-center mt-1'>
                    <div className='w-30% border-y border-negro-medianoche'></div>
                    <div><p className=' text-xl font-bold text-negro-medianoche'>チーズ入りフライドポテト </p></div>
                    <div className='w-30% border-y border-negro-medianoche'></div>
                </div>
                <h1 className='text-negro-medianoche text-2xl text-center'>2023 年 10 月 19 日に作成されたタスク マネージャー</h1>
            </div>
        
            
        </section>
        
    );
};
export default TaskList;