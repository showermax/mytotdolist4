import React, {useReducer, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {TaskType, Todolist} from "./Components/Todolist";
import {NewTodolist} from "./Components/NewTodolist";
import {TasksReducer, addTaskAC, deleteTaskAC, makeDoneAC, editTaskAC, setForTodayAC} from "./Reducers/TasksReducer";
import {
    addNewTodolistAC,
    deleteTodolistAC,
    editTodolistAC,
    TodolistsReducer
} from "./Reducers/TodolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootType} from "./redux/store";

export type TasksType = {
    [key:string]: TaskType[]
}
export type TodolistsType= Array<{id: string, title:string}>
export const Inbox: string = 'todolistid-inbox'
export const Today: string = 'todolistid-today'
export const Completed: string = 'todolistid-completed'
function App() {
    const tasks = useSelector((s:RootType) => s.tasks)
    const todolists = useSelector((s:RootType) => s.todolists)
    const dispatch=useDispatch()

    console.log(tasks)

    const addNewTodolist = () => {
        let newID = v1()
        dispatch(addNewTodolistAC(newID))

    }

    const deleteTodolist = (id: string) => {
        dispatch(deleteTodolistAC(id))
    }

    const addTask = (id_List: string, name: string) => {
        dispatch(addTaskAC(id_List, name))
    }
    const deleteTask = (id_List: string, id_Task: string) => {
        dispatch(deleteTaskAC(id_List,id_Task))
    }
    const makeDone = (id_List: string, id_task: string, e: boolean) => {
        dispatch(makeDoneAC(id_List,id_task,e))
    }

    const editTask = (id_List: string, id_Task: string, s: string) => {
        dispatch(editTaskAC(id_List,id_Task,s))

    }
    const editTodolist = (id_List: string, s: string) => {
        dispatch(editTodolistAC(id_List,s))
    }
    const setForToday = (id_List: string, id: string) => {
        dispatch(setForTodayAC(id_List,id))
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <div className="todolists">
                {todolists.map((el) =>
                    <Todolist
                        key={el.id}
                        id_List={el.id}
                        tasks={tasks[el.id]}
                        title={el.title}
                        addTask={addTask}
                        deleteTask={(id_task) => deleteTask(el.id, id_task)}
                        deleteTodolist={() => deleteTodolist(el.id)}
                        makeDone={(id_task: string, e: boolean) => makeDone(el.id, id_task, e)}
                        setForToday={(id_task) => setForToday(el.id, id_task)}
                        editTask={(id_Task: string, s: string) => editTask(el.id, id_Task, s)}
                        editTodolist={(s: string) => editTodolist(el.id, s)}
                    />)
                }
                <NewTodolist addNew={addNewTodolist}/>
            </div>
        </div>
    );
}

export default App;
