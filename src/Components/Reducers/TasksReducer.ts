import {v1} from "uuid";
import {Completed, TasksType, Today} from "../../App";

export function TasksReducer (state: TasksType, action: any) {
    switch (action.type) {
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.id_List]: [...state[action.payload.id_List], {
                    id: v1(),
                    taskName: action.payload.name,
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
        default: return state
    }
}

export const addTaskAC = (id_List: string, name:string)=>{
    return {
        type: 'ADD-TASK',
        payload:{
            id_List: id_List,
            name: name
        }
    } //as const
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
    } //as const
}

export const editTaskAC = (id_List: string, id_Task: string, s: string) => {
    return {
        type: 'EDIT-TASK',
        payload: {id_List, id_Task, s}
    }
}