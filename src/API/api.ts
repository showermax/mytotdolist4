import axios from "axios";

const id_List='52a31596-abb7-49a5-a9c4-3fb4e24acdef'
export const api = {
    getLists () {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {"withCredentials": true})
    },
    addList () {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title:"Inbox"},{"withCredentials": true})
    },
    deleteList () {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists${id_List}`,
            {"withCredentials": true})
    },
    updateList () {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists${id_List}`,
            {title:"Inbox2"},{"withCredentials": true})
    }
}