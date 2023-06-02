import {combineReducers, legacy_createStore as createStore} from "redux";
import {TasksReducer} from "../Reducers/TasksReducer";
import {TodoListsReducer} from "../Reducers/TodoListsReducer";


const reducers = combineReducers(
    {
        tasks: TasksReducer,
        todolists: TodoListsReducer
    }
)
export type RootType = ReturnType<typeof reducers>
export const store = createStore(reducers)