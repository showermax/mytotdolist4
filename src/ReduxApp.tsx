import React, {useCallback, useEffect, useReducer, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {TaskType, Todolist} from "./Components/Todolist";
import {NewTodolist} from "./Components/NewTodolist";
import {
    addListTC,
    addNewTodolistAC, deleteListTC,
    deleteTodolistAC,
    editTodolistAC, getListsAC, getListsTC, updateListTC
} from "./Reducers/TodoListsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootType, useAppDispatch} from "./redux/store";
import {api, ListType} from "./API/api";

export type TasksType = {
    [key:string]: TaskType[]
}

export const Completed: string = 'todolistid-completed'
function App() {
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(getListsTC())
        },[])
    const todolists = useSelector<RootType,ListType[]>(s => s.todolists)

    const addNewTodolist = useCallback(() => {
        let newID = v1()
        dispatch(addListTC(newID))
    },[])
    const deleteTodolist = useCallback((id: string) => {
        dispatch(deleteListTC(id))
    },[])
    const editTodolist = useCallback((id_List: string, s: string) => {
        dispatch(updateListTC(id_List,s))
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
