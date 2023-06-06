import axios from "axios";
import {ModelType, TaskType} from "../Reducers/TasksReducer";

export type ListType =  {
        id: string,
        title: string,
        addedDate: string,
        order: number
    }
type ResponceType<T={}> = {
    resultCode: number
    messages: Array<string>,

    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

// const id_List='94ca0ed3-3654-4f85-ae98-23e46a915c42'
export const api = {
    getLists () {
        return instance.get<ListType[]>('/todo-lists')
    },
    addList (id:string,title:string) {
        return instance.post<ResponceType<{ item: ListType }>>('/todo-lists',
            {id,title})
    },
    deleteList (id_List:string) {
        return instance.delete<ResponceType>(`/todo-lists/${id_List}`)
    },
    updateList (id_List:string,title:string) {
        return instance.put<ResponceType>(`/todo-lists/${id_List}`,
            {title})
    },
    getTasks (id_List:string) {
        return instance.get(`/todo-lists/${id_List}/tasks`)
    },
    addTask (id_List: string, title:string) {
        return instance.post<ResponceType<{item:TaskType}>>(`/todo-lists/${id_List}/tasks`, {title})
    },
    deleteTask (id_List: string, id_Task:string) {
        return instance.delete<ResponceType<{item:TaskType}>>(`/todo-lists/${id_List}/tasks/${id_Task}`)
    },
    editTask (id_List: string, id_Task:string, model:ModelType) {
        return instance.put<ResponceType<{item:TaskType}>>(`/todo-lists/${id_List}/tasks/${id_Task}`, model)
    }
}