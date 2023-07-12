import React, {useCallback, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Components/Todolist";
import {NewTodolist} from "./Components/NewTodolist";
import {addListTC, deleteListTC, FrontListType, getListsTC, updateListTC} from "./Reducers/TodoListsReducer";
import {useSelector} from "react-redux";
import {RootType, useAppDispatch} from "./redux/store";
import {TaskType} from "./Reducers/TasksReducer";
import {RequestStatusType} from "./Reducers/AppReducer";
import {Loading} from "./Helpers/Loading";
import {Notification} from "./Helpers/Notification";
import {Login} from "./Components/Login";
import {Routes, Route, Navigate, NavLink} from "react-router-dom";

export type TasksType = {
    [key: string]: TaskType[]
}

export const Completed: string = 'afe14866-76ac-4f6a-9fae-99eac3566917'

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getListsTC())
    }, [])
    const todolists = useSelector<RootType, FrontListType[]>(s => s.todolists)
    const status = useSelector<RootType, RequestStatusType>(s => s.app.status)

    const addNewTodolist = useCallback(() => {
        let newID = v1()
        dispatch(addListTC(newID))
    }, [])
    const deleteTodolist = useCallback((id: string) => {
        dispatch(deleteListTC(id))
    }, [])
    const editTodolist = useCallback((id_List: string, s: string) => {
        dispatch(updateListTC(id_List, s))
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <div><NavLink to={'/'}> <img src={logo} className="App-logo" alt="logo"/> </NavLink></div>
                <div><h3><NavLink to={'login'}>Log in</NavLink></h3></div>
            </header>
            <Routes>
                <Route path={'/'} element={<div className="todolists">
                    {todolists.map((el) =>
                        <Todolist
                            key={el.id}
                            id_List={el.id}
                            title={el.title}
                            deleteTodolist={deleteTodolist}
                            editTodolist={editTodolist}
                            pending={el.pending}
                        />)
                    }
                    <NewTodolist addNew={addNewTodolist}/>
                    {/*<ErrorAlert error={errorState} />*/}
                </div>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/404'} element={<h1>Page not found</h1>} />
                <Route path={'*'} element={<Navigate to={'404'} />} />
            </Routes>
            {status === 'loading' && <Loading/>}
            <Notification/>
        </div>
    );
}

export default App;
