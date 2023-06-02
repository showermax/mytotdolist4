import React from 'react';


import {ListType} from "../API/api";
import {Dispatch} from "redux";

export const Inbox: string = 'todolistid-inbox'
export const Today: string = 'todolistid-today'
export const Completed: string = 'todolistid-completed'

const initialState = [
            {id: Inbox, title: 'Inbox',addedDate: '',order: 0},
            {id: Today, title: 'Today',addedDate: '',order: 1},
            {id: Completed, title: 'Done',addedDate: '',order: 2}
        ]
export const TodoListsReducer = (state: ListType[]=initialState, action:ActionsType) => {
switch (action.type){
    case 'GET-TASKS': return action.payload.lists
    case 'ADD-TODOLIST': return [...state,{id: action.payload.id, title: 'New List'}]
    case 'EDIT-TODOLIST': return state.map(el=>el.id===action.payload.id ? {...el, title:action.payload.s} : el)
    case 'DELETE-TODOLIST': return state.filter(el=>el.id!==action.payload.id)

    default: return state
}
};
type ActionsType = addNewTodolistACType | ReturnType<typeof getListsAC>

type addNewTodolistACType = ReturnType<typeof addNewTodolistAC> | ReturnType<typeof editTodolistAC>
    | ReturnType<typeof deleteTodolistAC>
export const addNewTodolistAC = (id:string)=>{
    return {
        type: 'ADD-TODOLIST',
        payload: {id}
    }as const
}

export const editTodolistAC = (id:string, s:string)=>{
    return {
        type: 'EDIT-TODOLIST',
        payload: {id,s}
    }as const
}

export const deleteTodolistAC = (id:string)=>{
    return {
        type: 'DELETE-TODOLIST',
        payload: {id}
    }as const
}

export const getListsAC = (lists:ListType[]) => ({
    type:'GET-TASKS',
    payload: {lists}
} as const )

export const getListsTC = () => (dispatch: Dispatch) => {

}