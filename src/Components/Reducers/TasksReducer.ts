import {TaskType} from "../Todolist";
import {v1} from "uuid";
import {TasksType} from "../../App";

export function TasksReducer (state: TasksType, action: any) {
    switch (action.type) {
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.id_List]: [...state[action.payload.id_List], {
                    id: v1(),
                    taskName: action.payload.name,
                    isDone: false,
                    properties: {tags: {priority: 'normal', today: action.payload.id_List === 'Today'}, parent: action.payload.id_List}
                }]
            }
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
    } as const
}