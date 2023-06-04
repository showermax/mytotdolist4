import {v1} from "uuid";
import {TasksType} from "../ReduxApp";
import {addNewTodolistAC, deleteTodolistAC, getListsAC} from "./TodoListsReducer";
import {Dispatch} from "redux";
import {api} from "../API/api";

export const Inbox: string = 'todolistid-inbox'
export const Today: string = 'todolistid-today'
export const Completed: string = 'todolistid-completed'

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
const model = {
    description: '',
    completed: false,
    status: 0,
    priority: 0,
    startDate: '',
    deadline: '',
    order: 0,
    addedDate: new Date()
}
const initialState: TasksType = {}


export function TasksReducer(state: TasksType = initialState, action: ActionsType) {
    switch (action.type) {
        case 'GET-LISTS': {
            const copyState = {...state}
            action.payload.lists.forEach(el => copyState[el.id] = [])
            return copyState
        }
        case 'GET-TASKS': {
            return {...state, [action.payload.id_List]: action.payload.tasks}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]: [...state[action.payload.task.todoListId], action.payload.task]
            }
        }
        case 'DELETE-TASK': {
            return {
                ...state,
                [action.payload.id_List]: state[action.payload.id_List].filter(el => el.id !== action.payload.id_Task)
            }
        }
        // case 'MAKE-DONE':{
        //     const parentListId = state[action.payload.id_List].filter(el => el.id == action.payload.id_Task)[0].properties.parent; // достаем id листа, в котором таска создалась
        //     return (
        //         (action.payload.id_List !== Completed) ? {
        //             ...state,
        //             [Completed]: [...state[Completed], ...state[action.payload.id_List].filter(el => el.id === action.payload.id_Task).map(el => ({
        //                 ...el,
        //                 isDone: action.payload.e
        //             }))],
        //
        //             [action.payload.id_List]: state[action.payload.id_List].filter(el => el.id !== action.payload.id_Task),
        //
        //         }
        //         :
        //         {
        //             ...state,
        //             [Completed]: state[action.payload.id_List].filter(el => el.id !== action.payload.id_Task).map(el => ({...el, isDone: true})),
        //             [parentListId]: [...state[parentListId], ...state[action.payload.id_List].filter(el => el.id === action.payload.id_Task).map(el => ({
        //                 ...el,
        //                 isDone: action.payload.e
        //             }))],
        //
        //         }
        // )
        // }
        case 'EDIT-TASK': {
            return {
                ...state,
                [action.payload.id_List]: state[action.payload.id_List].map(el => el.id === action.payload.id_Task ? {
                    ...el,
                    taskName: action.payload.s
                } : el)
            }
        }
        case 'SET-FOR-TODAY': {
            return {
                ...state,
                [Today]: [...state[Today], ...state[action.payload.id_List].filter(el => el.id === action.payload.id_Task)],
                [action.payload.id_List]: state[action.payload.id_List].filter(el => el.id !== action.payload.id_Task)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.id]: []}
        }
        case 'DELETE-TODOLIST': {
            delete state[action.payload.id]
            return state
        }
        // case "CHANGE-PRIORITY": {
        //     return {
        //         ...state,
        //         [action.payload.id_List]: state[action.payload.id_List].map(el => el.id === action.payload.id ? {
        //             ...el,
        //             properties: {...el.properties, tags: {...el.properties.tags, priority: action.payload.priority}}
        //         } : el)
        //     }
        // }
        default:
            return state
    }
}

type ActionsType = ReturnType<typeof addTaskAC> | ReturnType<typeof deleteTaskAC> | ReturnType<typeof makeDoneAC>
    | ReturnType<typeof editTaskAC> | ReturnType<typeof deleteTodolistAC> | ReturnType<typeof addNewTodolistAC>
    | ReturnType<typeof setForTodayAC> | ReturnType<typeof changePriorityAC> | ReturnType<typeof getTasksAC> |
    ReturnType<typeof getListsAC>


export const getTasksAC = (id_List: string, tasks: TaskType[]) => {
    return {
        type: 'GET-TASKS',
        payload: {
            id_List,
            tasks
        }
    } as const
}
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        payload: {
            task
        }
    } as const
}

export const deleteTaskAC = (id_List: string, id_Task: string) => ({
    type: 'DELETE-TASK',
    payload: {id_List, id_Task}
} as const)
export const makeDoneAC = (id_List: string, id_Task: string, e: boolean) => {
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
export const setForTodayAC = (id_List: string, id_Task: string) => {
    return {
        type: 'SET-FOR-TODAY',
        payload: {
            id_List,
            id_Task,
        }
    } as const
}
export const changePriorityAC = (id_List: string, id: string, priority: string) => {
    return {
        type: 'CHANGE-PRIORITY',
        payload: {
            id_List,
            id,
            priority
        }
    } as const
}
export const getTasksTC = (id_List: string) => (dispatch: Dispatch) => {
    api.getTasks(id_List).then(result => dispatch(getTasksAC(id_List, result.data.items)))
}
export const addTaskTC = (id_List: string, title: string) => (dispatch: Dispatch) => {
    api.addTask(id_List, title).then(result => dispatch(addTaskAC(result.data.data.item)))
}

export const deleteTaskTC = () => () => {}
// const InitialState: TasksType = {
//     [Inbox]: [
//         {
//             id: v1(),
//             taskName: 'Low',
//             isDone: false,
//             properties: {tags: {priority: 'High', today: false}, parent: Inbox}
//         },
//         {
//             id: v1(),
//             taskName: 'High',
//             isDone: false,
//             properties: {tags: {priority: 'High', today: false}, parent: Inbox}
//         },
//         {
//             id: v1(),
//             taskName: 'Normal',
//             isDone: false,
//             properties: {tags: {priority: 'High', today: false}, parent: Inbox}
//         }
//     ],
//     [Today]: [
//         {
//             id: v1(),
//             taskName: 'this task you should do today',
//             isDone: false,
//             properties: {tags: {priority: 'High', today: true}, parent: Today}
//         },
//     ],
//     [Completed]: [
//
//     ],
// }