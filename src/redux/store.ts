import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TasksReducer} from "../Reducers/TasksReducer";
import {TodoListsReducer} from "../Reducers/TodoListsReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppReducer} from "../Reducers/AppReducer";


const reducers = combineReducers(
    {
        tasks: TasksReducer,
        todolists: TodoListsReducer,
        app: AppReducer

    }
)
export type RootType = ReturnType<typeof reducers>
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootType, any, any>>()
export const store = createStore(reducers, applyMiddleware(thunk))