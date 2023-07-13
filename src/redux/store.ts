import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TasksReducer} from "../Reducers/TasksReducer";
import {TodoListsReducer} from "../Reducers/TodoListsReducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppReducer} from "../Reducers/AppReducer";
import {AuthReducer} from "../Reducers/AuthRedicer";


const reducers = combineReducers(
    {
        tasks: TasksReducer,
        todolists: TodoListsReducer,
        app: AppReducer,
        auth: AuthReducer
    }
)
export type RootType = ReturnType<typeof reducers>
export const useAppDispatch = () => useDispatch<ThunkDispatch<RootType, any, any>>()
export const store = createStore(reducers, applyMiddleware(thunk))