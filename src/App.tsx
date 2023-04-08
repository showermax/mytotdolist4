import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Components/Todolist";
import {NewTodolist} from "./Components/NewTodolist";


function App() {
    const Inbox:string = 'todolistid-inbox'
    const Today:string = 'todolistid-today'
    const Completed:string = 'todolistid-completed'
    // list of tasks
    const [tasks, setTasks] = useState({
        [Inbox]: [
            {
                id: v1(),
                taskName: 'initial task',
                isDone: false,
                properties: {tags: {priority: 'low', today: false}, assignedTo: false}
            },
            {
                id: v1(),
                taskName: 'learn how to use',
                isDone: false,
                properties: {tags: {priority: 'high', today: false}, assignedTo: false}
            }
        ],
        [Today]: [
            {
                id: v1(),
                taskName: 'this task you should do today',
                isDone: false,
                properties: {tags: {priority: 'high', today: true}, assignedTo: false}
            },
        ],
        [Completed]: [
            {
                id: v1(),
                taskName: 'that is already done',
                isDone: true,
                properties: {tags: {priority: 'normal', today: false}, assignedTo: false}
            },
        ],
    })
    // list of todolists
    const [todolists, setTodolists] = useState([
            {id: Inbox, title: 'Inbox'},
            {id: Today, title: 'Today'},
            {id: Completed, title: 'Done'}
        ]
    )
    // useEffect(()=>{setTasks(tasks)},[tasks])
    const addNewTodolist = () => {
        let newID = v1()
        setTodolists([...todolists, {id: newID, title: 'New'}])
        setTasks({...tasks, [newID]: []})
    }
    const deleteTodolist = (id: string) => {
        setTodolists(todolists.filter(el => el.id !== id))
        delete tasks[id]
    }

    const addTask = (id_List: string, n: string) => {
        setTasks({
            ...tasks,
            [id_List]: [...tasks[id_List], {
                id: v1(),
                taskName: n,
                isDone: false,
                properties: {tags: {priority: 'normal', today: id_List === Today}, assignedTo: false}
            }]
        })
    }
    const deleteTask = (id_List: string, id_task: string) => {
        setTasks({...tasks, [id_List]: tasks[id_List].filter(el => el.id !== id_task)})
    }
    const makeDone = (id_List: string, id_task: string, e: boolean) => {
        setTasks({...tasks,
            [id_List]: tasks[id_List].map(el => el.id === id_task ? {...el, isDone: e} : el)})
    }
    const editTask = (id_List: string, id_task: string, s: string) =>{
        setTasks({...tasks, [id_List]: tasks[id_List].map(el=> el.id===id_task ? {...el, taskName: s}:el)})
    }
    const setForToday = (id_List: string, id: string) => {
        setTasks({
            ...tasks,
            [Today]: [...tasks[Today], ...tasks[id_List].filter(el => el.id === id)],
            [id_List]: tasks[id_List].filter(el => el.id !== id)
        })
    }
    console.log(tasks[Completed])
    console.log(tasks[Inbox])
    console.log(tasks[Today])
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
                        makeDone={(id_task:string, e:boolean) => makeDone(el.id, id_task, e)}
                        setForToday={(id_task) => setForToday(el.id, id_task)}
                        editTask={(id_Task:string, s:string)=>editTask(el.id, id_Task,s)}
                    />)
                }
                <NewTodolist addNew={addNewTodolist}/>
            </div>
        </div>
    );
}

export default App;
