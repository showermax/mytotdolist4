import {v1} from "uuid";
import {Completed, TasksType, Today} from "../App";
import {addNewTodolistAC, deleteTodolistAC} from "./TodolistsReducer";


export function TasksReducer (state: TasksType, action: ActionsType) {
    switch (action.type) {
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.id_List]: [...state[action.payload.id_List], {
                    id: v1(),
                    taskName:action.payload.name,
                    isDone: false,
                    properties: {tags: {priority: 'normal', today: action.payload.id_List === Today}, parent: action.payload.id_List}
                }]
            }
        }
        case 'DELETE-TASK': {
           return {...state, [action.payload.id_List]:state[action.payload.id_List].filter(el=>el.id!==action.payload.id_Task)}
        }
        case 'MAKE-DONE':{
            const parentListId = state[action.payload.id_List].filter(el => el.id == action.payload.id_Task)[0].properties.parent; // достаем id листа, в котором таска создалась
            return (
                (action.payload.id_List !== Completed) ? {
                    ...state,
                    [Completed]: [...state[Completed], ...state[action.payload.id_List].filter(el => el.id === action.payload.id_Task).map(el => ({
                        ...el,
                        isDone: action.payload.e
                    }))],

                    [action.payload.id_List]: state[action.payload.id_List].filter(el => el.id !== action.payload.id_Task),

                }
                :
                {
                    ...state,
                    [Completed]: state[action.payload.id_List].filter(el => el.id !== action.payload.id_Task).map(el => ({...el, isDone: true})),
                    [parentListId]: [...state[parentListId], ...state[action.payload.id_List].filter(el => el.id === action.payload.id_Task).map(el => ({
                        ...el,
                        isDone: action.payload.e
                    }))],

                }
        )
        }
        case 'EDIT-TASK': {
            return {...state,[action.payload.id_List]:state[action.payload.id_List].map(el=>el.id===action.payload.id_Task ? {...el, taskName: action.payload.s} : el) }
        }
        case 'SET-FOR-TODAY':{
            return {...state, [Today]: [...state[Today], ...state[action.payload.id_List].filter(el => el.id === action.payload.id_Task)], [action.payload.id_List]: state[action.payload.id_List].filter(el => el.id !== action.payload.id_Task)}
        }
        case 'ADD-TODOLIST': {
            return {...state,[action.payload.id]:[] }
        }
        case 'DELETE-TODOLIST': {
            delete state[action.payload.id]
            return state
        }
        default: return state
    }
}
type ActionsType = ReturnType<typeof addTaskAC> | ReturnType<typeof deleteTaskAC> | ReturnType<typeof makeDoneAC>| ReturnType<typeof editTaskAC>| ReturnType<typeof deleteTodolistAC> | ReturnType<typeof addNewTodolistAC> | ReturnType<typeof setForTodayAC>
export const addTaskAC = (id_List: string, title:string)=>{
    return {
        type: 'ADD-TASK',
        payload:{
            id_List: id_List,
            name: title
        }
    } as const
}

export const deleteTaskAC = (id_List:string, id_Task:string) => ({type:'DELETE-TASK', payload: {id_List, id_Task}} as const)
export const makeDoneAC=(id_List: string, id_Task: string, e:boolean) => {
    return {
        type: 'MAKE-DONE',
        payload: {
            id_List,
            id_Task,
            e
        }
    } as const
}

export const editTaskAC = (id_List: string, id_Task: string, s: string) => {
    return {
        type: 'EDIT-TASK',
        payload: {id_List, id_Task, s}
    } as const
}
export const setForTodayAC=(id_List: string, id_Task: string) => {
    return {
        type: 'SET-FOR-TODAY',
        payload: {
            id_List,
            id_Task,
        }
    } as const
}

