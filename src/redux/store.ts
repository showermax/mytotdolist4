import {combineReducers, legacy_createStore as createStore} from "redux";
import {TasksReducer} from "../Reducers/TasksReducer";
import {TodolistsReducer} from "../Reducers/TodolistsReducer";


const reducers = combineReducers(
    {
        tasks: TasksReducer,
        todolists: TodolistsReducer
    }
)
export type RootType = ReturnType<typeof reducers>
export const store = createStore(reducers)