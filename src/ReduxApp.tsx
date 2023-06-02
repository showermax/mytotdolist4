import React, {useCallback, useEffect, useReducer, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {TaskType, Todolist} from "./Components/Todolist";
import {NewTodolist} from "./Components/NewTodolist";
import {
    addNewTodolistAC,
    deleteTodolistAC,
    editTodolistAC, getListsAC,
} from "./Reducers/TodoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootType} from "./redux/store";
import {api, ListType} from "./API/api";

export type TasksType = {
    [key:string]: TaskType[]
}

export const Completed: string = 'todolistid-completed'
function App() {
    const dispatch=useDispatch()
    useEffect(()=>{
        api.getLists().
        then((result) => dispatch(getListsAC(result.data)))},[])

    const todolists = useSelector<RootType,ListType[]>(s => s.todolists)
    const addNewTodolist = useCallback(() => {
        let newID = v1()
        dispatch(addNewTodolistAC(newID))
        api.addList()
    },[])
    const deleteTodolist = useCallback((id: string) => {
        dispatch(deleteTodolistAC(id))
    },[])
    const editTodolist = useCallback((id_List: string, s: string) => {
        dispatch(editTodolistAC(id_List,s))
    },[])
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
                        title={el.title}
                        deleteTodolist={deleteTodolist}
                        editTodolist={editTodolist}
                    />)
                }
                <NewTodolist addNew={addNewTodolist}/>
            </div>
        </div>
    );
}

export default App;
