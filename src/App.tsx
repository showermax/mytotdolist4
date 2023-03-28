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
                isDone: false,
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
        setTodolists([...todolists, {id: 'New', title: 'New'}])
        setTasks({...tasks, New: []})
    }
    const addTask = (id: string) => {
        console.log(id)
        setTasks({
            ...tasks,
            [id]: [...tasks[id], {
                id: v1(),
                taskName: 'убрать фотку с лешиным компрессором',
                isDone: false,
                properties: {priority: 'high', assignedTo: false}
            }]
        })
    }
    const deleteTask =(id_List: string, id_task:string)=>{
        setTasks({...tasks, [id_List]: tasks[id_List].filter(el=>el.id!==id_task)})
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <div className="todolists">
                {todolists.map((el, i) =>
                    <Todolist tasks={tasks[el.id]}
                              title={el.title}
                              addTask={() => addTask(el.id)}
                              deleteTask={(id) => deleteTask(el.id, id)}
                    />)
                }
                <NewTodolist addNew={addNewTodolist}/>
            </div>
        </div>
    );
}

export default App;
