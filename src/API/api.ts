import axios from "axios";

export type ListType =  {
        id: string,
        title: string,
        addedDate: string,
        order: number
    }
type ReponceType<T={}> = {
    resultCode: number
    messages: Array<string>,
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true
})

const id_List='94ca0ed3-3654-4f85-ae98-23e46a915c42'
export const api = {
    getLists () {
        return instance.get<ListType[]>('/todo-lists',
            {"withCredentials": true})
    },
    addList () {
        return instance.post<ReponceType<{ item: ListType }>>('/todo-lists',
            {title:"Inbox"})

    },
    deleteList () {
        return instance.delete<ReponceType>(`/todo-lists/${id_List}`)
    },
    updateList () {
        return instance.put<ReponceType>(`/todo-lists/${id_List}`,
            {title:"Inbox2"})
    }
}