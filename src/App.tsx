import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Components/Todolist";
import {NewTodolist} from "./Components/NewTodolist";


function App() {
    const Inbox = v1()
    const Today = v1()
    const Done = v1()
    // list of tasks
    const [tasks, setTasks] = useState({
        [Inbox]: [
            {id: v1(), taskName: 'initial task', isDone: false, properties: {priority: 'low', assignedTo: false}},
            {id: v1(), taskName: 'learn how to use', isDone: false, properties: {priority: 'high', assignedTo: false}}
        ],
        [Today]: [
            {
                id: v1(),
                taskName: 'this task you should do today',
                isDone: false,
                properties: {priority: 'low', assignedTo: false}
            },
        ],
        [Done]: [
            {
                id: v1(),
                taskName: 'that is already done',
                isDone: true,
                properties: {priority: 'normal', assignedTo: false}
            },
        ]
    })
    // list of todolists
    const [todolists, setTodolists] = useState([
            {id: Inbox, title: 'Inbox'},
            {id: Today, title: 'Today'},
            {id: Done, title: 'Done'}
        ]
    )
    const addNewTodolist = () => {
        let newID = v1()
        setTodolists([...todolists, {id: newID, title: 'New'}])
        setTasks({...tasks, [newID]: []})
    }
    const deleteTodolist = (id: string) => {
        setTodolists(todolists.filter(el => el.id !== id))
        delete tasks[id]
    }

    const addTask = (id: string, n: string) => {
        setTasks({
            ...tasks,
            [id]: [...tasks[id], {
                id: v1(),
                taskName: n,
                isDone: false,
                properties: {priority: 'high', assignedTo: false}
            }]
        })
    }
    const deleteTask = (id_List: string, id_task: string) => {
        setTasks({...tasks, [id_List]: tasks[id_List].filter(el => el.id !== id_task)})
    }
    const makeDone = (id_List: string, id_task: string)=>{
        setTasks({...tasks, [id_List]: tasks[id_List].map(el=>el.id===id_task ? {...el, isDone: !el.isDone} : el)})
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
                        tasks={tasks[el.id]}
                        title={el.title}
                        addTask={(n) => addTask(el.id, n)}
                        deleteTask={(id_task) => deleteTask(el.id, id_task)}
                        deleteTodolist={() => deleteTodolist(el.id)}
                        makeDone ={(id_task)=>makeDone(el.id, id_task)}
                    />)
                }
                <NewTodolist addNew={addNewTodolist}/>
            </div>
        </div>
    );
}

export default App;
