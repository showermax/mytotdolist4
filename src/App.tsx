import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Components/Todolist";


function App() {
    const Inbox = v1()
    const Today = v1()
    const Done = v1()
    const [tasks, setTasks] = useState({
        [Inbox]: [
            {id: v1(), taskName: 'initial task', isDone: false, properties: {priority: 'low', assignedTo: false}},
            {id: v1(), taskName: 'learn how to use', isDone: false, properties: {priority: 'high', assignedTo: false}}
        ],
        [Today]: [

        ],
        [Done]: [

        ]
    })
    console.log(tasks[Inbox])
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
            </header>
            <div className="todolists">
                <Todolist tasks={tasks[Inbox]} />
            </div>
        </div>
    );
}

export default App;
