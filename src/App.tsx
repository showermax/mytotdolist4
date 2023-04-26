import React, {useReducer, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {TaskType, Todolist} from "./Components/Todolist";
import {NewTodolist} from "./Components/NewTodolist";
import {TasksReducer, addTaskAC, deleteTaskAC, makeDoneAC, editTaskAC} from "./Components/Reducers/TasksReducer";
import {addNewTodolistAC, TodolistsReducer} from "./Components/Reducers/TodolistsReducer";

export type TasksType = {
    [key:string]: TaskType[]
}
export type TodolistsType= Array<{id: string, title:string}>
export const Inbox: string = 'todolistid-inbox'
export const Today: string = 'todolistid-today'
export const Completed: string = 'todolistid-completed'
function App() {

    // list of tasks
    // const [tasks, setTasks] = useState({
    //     [Inbox]: [
    //         {
    //             id: v1(),
    //             taskName: 'initial task',
    //             isDone: false,
    //             properties: {tags: {priority: 'low', today: false}, parent: Inbox}
    //         },
    //         {
    //             id: v1(),
    //             taskName: 'learn how to use',
    //             isDone: false,
    //             properties: {tags: {priority: 'high', today: false}, parent: Inbox}
    //         }
    //     ],
    //     [Today]: [
    //         {
    //             id: v1(),
    //             taskName: 'this task you should do today',
    //             isDone: false,
    //             properties: {tags: {priority: 'high', today: true}, parent: Today}
    //         },
    //     ],
    //     [Completed]: [
    //         {
    //             id: v1(),
    //             taskName: 'that is already done',
    //             isDone: true,
    //             properties: {tags: {priority: 'normal', today: false}, parent: Completed}
    //         },
    //     ],
    // })
    const [tasks, tasksDispatch] = useReducer(TasksReducer,{
        [Inbox]: [
            {
                id: v1(),
                taskName: 'initial task',
                isDone: false,
                properties: {tags: {priority: 'low', today: false}, parent: Inbox}
            },
            {
                id: v1(),
                taskName: 'learn how to use',
                isDone: false,
                properties: {tags: {priority: 'high', today: false}, parent: Inbox}
            }
        ],
        [Today]: [
            {
                id: v1(),
                taskName: 'this task you should do today',
                isDone: false,
                properties: {tags: {priority: 'high', today: true}, parent: Today}
            },
        ],
        [Completed]: [

        ],
    })
    // list of todolists
    // const [todolists, setTodolists] = useState([
    //         {id: Inbox, title: 'Inbox'},
    //         {id: Today, title: 'Today'},
    //         {id: Completed, title: 'Done'}
    //     ]
    // )
const [todolists,todolistsDispatch]=useReducer(TodolistsReducer, [
            {id: Inbox, title: 'Inbox'},
            {id: Today, title: 'Today'},
            {id: Completed, title: 'Done'}
        ])
    const addNewTodolist = () => {
        let newID = v1()
        // setTodolists([...todolists, {id: newID, title: 'New List'}])
        // // setTasks({...tasks, [newID]: []})
        todolistsDispatch(addNewTodolistAC(newID))
        todolistsDispatch(addNewTodolistAC(newID))
    }

    const deleteTodolist = (id: string) => {
        // setTodolists(todolists.filter(el => el.id !== id))
        // delete tasks[id]
    }

    const addTask = (id_List: string, name: string) => {
        tasksDispatch(addTaskAC(id_List, name))
        // setTasks({
        //     ...tasks,
        //     [id_List]: [...tasks[id_List], {
        //         id: v1(),
        //         taskName: name,
        //         isDone: false,
        //         properties: {tags: {priority: 'normal', today: id_List === Today}, parent: id_List}
        //     }]
        // })
    }
    const deleteTask = (id_List: string, id_Task: string) => {
        tasksDispatch(deleteTaskAC(id_List,id_Task))
        // setTasks({...tasks, [id_List]: tasks[id_List].filter(el => el.id !== id_task)})
    }
    const makeDone = (id_List: string, id_task: string, e: boolean) => {
        tasksDispatch(makeDoneAC(id_List,id_task,e))
        // const parentListId = tasks[id_List].filter(el => el.id == id_task)[0].properties.parent; // достаем id листа, в котором таска создалась
        // (id_List !== Completed) ? setTasks({
        //         ...tasks,
        //         [Completed]: [...tasks[Completed], ...tasks[id_List].filter(el => el.id === id_task).map(el => ({
        //             ...el,
        //             isDone: e
        //         }))],
        //
        //         [id_List]: tasks[id_List].filter(el => el.id !== id_task),
        //
        //     })
        //     :
        //     setTasks({
        //         ...tasks,
        //         [Completed]: tasks[id_List].filter(el => el.id !== id_task).map(el => ({...el, isDone: true})),
        //         [parentListId]: [...tasks[parentListId], ...tasks[id_List].filter(el => el.id === id_task).map(el => ({
        //             ...el,
        //             isDone: e
        //         }))],
        //
        //     })

    }

    const editTask = (id_List: string, id_Task: string, s: string) => {
        tasksDispatch(editTaskAC(id_List,id_Task,s))
        // setTasks({...tasks, [id_List]: tasks[id_List].map(el => el.id === id_task ? {...el, taskName: s} : el)})
    }
    const editTodolist = (id_List: string, s: string) => {
        // setTodolists(todolists.map(el => el.id === id_List ? {...el, title: s} : el))
    }
    const setForToday = (id_List: string, id: string) => {
        // setTasks({
        //     ...tasks,
        //     [Today]: [...tasks[Today], ...tasks[id_List].filter(el => el.id === id)],
        //     [id_List]: tasks[id_List].filter(el => el.id !== id)
        // })
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <div>`The todolists IDs are: Inbox - {Inbox}, Today - {Today}</div>
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
