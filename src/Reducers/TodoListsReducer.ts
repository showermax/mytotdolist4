import {api, ListType, resultCode} from "../API/api";
import {Dispatch} from "redux";
import {setMessage, setStatusLoading} from "./AppReducer";

export const Inbox: string = 'todolistid-inbox'
export const Today: string = 'todolistid-today'
export const Completed: string = 'todolistid-completed'
export type FrontListType = ListType & {pending: boolean}

const initialState: FrontListType[] = [
    // {id: Inbox, title: 'Inbox',addedDate: '',order: 0},
    // {id: Today, title: 'Today',addedDate: '',order: 1},
    // {id: Completed, title: 'Done',addedDate: '',order: 2}
]
export const TodoListsReducer = (state: FrontListType[] = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'GET-LISTS':
            return action.payload.lists
        case 'ADD-TODOLIST':
            return [...state, {...action.payload.todoList, pending: false}]
        case 'EDIT-TODOLIST':
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.s} : el)
        case 'DELETE-TODOLIST':
            return state.filter(el => el.id !== action.payload.id)
        case "CHANGE-PENDING":
            return state.map(el=> el.id === action.payload.id_List ? {...el, pending: !el.pending}:el)
        default:
            return state
    }
};
type ActionsType = addNewTodolistACType | ReturnType<typeof getListsAC>

type addNewTodolistACType = ReturnType<typeof addNewTodolistAC> | ReturnType<typeof editTodolistAC>
    | ReturnType<typeof deleteTodolistAC> | ReturnType<typeof changePendingAC>
export const addNewTodolistAC = (todoList: ListType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {todoList}
    } as const
}

export const editTodolistAC = (id: string, s: string) => {
    return {
        type: 'EDIT-TODOLIST',
        payload: {id, s}
    } as const
}

export const deleteTodolistAC = (id: string) => {
    return {
        type: 'DELETE-TODOLIST',
        payload: {id}
    } as const
}

export const getListsAC = (lists: ListType[]) => ({
    type: 'GET-LISTS',
    payload: {lists}
} as const)

export const changePendingAC = (id_List: string) => {
    return {
        type: 'CHANGE-PENDING',
        payload: {id_List}
    } as const
}
export const getListsTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusLoading('loading'))
    api.getLists().then((result) => {
        dispatch(getListsAC(result.data))
        dispatch(setStatusLoading('succeeded'))
    })
}

export const addListTC = (newId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusLoading('loading'))
    api.addList('New List')
        .then((result) => {
            if (result.data.resultCode === resultCode.success) {
                dispatch(addNewTodolistAC(result.data.data.item))
                dispatch(setMessage({messageText:'Please, enter the title of your list', typeOfMessage: 'warning'}))
                dispatch(setStatusLoading('succeeded'))}
            else {
                dispatch(setMessage({messageText: result.data.messages[0] ? result.data.messages[0] : 'Something went wrong, call 911', typeOfMessage: 'error'}))
            }
        }
    )
        .catch((e) => {
            console.log(e)})
        .finally(()=>dispatch(setStatusLoading('succeeded')))
}

export const deleteListTC = (id_List: string) => (dispatch: Dispatch) => {
    dispatch(setStatusLoading('loading'))
    dispatch(changePendingAC(id_List))
    api.deleteList(id_List).then((result) => dispatch(deleteTodolistAC(id_List)))
}

export const updateListTC = (id_List: string, title: string) => (dispatch: Dispatch) => {
    // dispatch(setStatusLoading('loading'))
    api.updateList(id_List, title).then((result) => dispatch(editTodolistAC(id_List, title)))
}