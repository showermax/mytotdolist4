import axios from "axios";

type ListType =  {
        id: string,
        title: string,
        addedDate: string,
        order: number
    }
type GenericType<T> = {
    resultCode: number
    messages: Array<string>,
    data: T
}


const id_List='94ca0ed3-3654-4f85-ae98-23e46a915c42'
export const api = {
    getLists () {
        return axios.get<ListType[]>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {"withCredentials": true})
    },
    addList () {
        return axios.post<GenericType<{ item: ListType }>>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title:"Inbox"},{"withCredentials": true})
    },
    deleteList () {
        return axios.delete<GenericType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id_List}`,
            {"withCredentials": true})
    },
    updateList () {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id_List}`,
            {title:"Inbox2"},{"withCredentials": true})
    }
}