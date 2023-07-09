import React, {useCallback, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {v1} from "uuid";
import {Todolist} from "./Components/Todolist";
import {NewTodolist} from "./Components/NewTodolist";
import {addListTC, deleteListTC, getListsTC, updateListTC} from "./Reducers/TodoListsReducer";
import {useSelector} from "react-redux";
import {RootType, useAppDispatch} from "./redux/store";
import {ListType} from "./API/api";
import {TaskType} from "./Reducers/TasksReducer";
import {RequestStatusType} from "./Reducers/AppReducer";
import {Loading} from "./Helpers/Loading";
import {Notification} from "./Helpers/Notification";

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
    const status = useSelector<RootType,RequestStatusType>(s => s.app.status)
    const errorState = useSelector<RootType,null | string>(s => s.app.error)

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
    console.log(status)
    console.log(errorState)
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
                {/*<ErrorAlert error={errorState} />*/}
                {status === 'loading' && <Loading />}
                <Notification />
            </div>
        </div>
    );
}

export default App;
