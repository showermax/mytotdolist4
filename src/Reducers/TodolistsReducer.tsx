import React from 'react';
import {TodolistsType} from "../App";
import {v1} from "uuid";

export const TodolistsReducer = (state: TodolistsType, action:ActionsType) => {
switch (action.type){
    case 'ADD-TODOLIST': return [...state,{id: action.payload.id, title: 'New List'}]
    case 'EDIT-TODOLIST': return state.map(el=>el.id===action.payload.id ? {...el, title:action.payload.s} : el)
    case 'DELETE-TODOLIST': return state.filter(el=>el.id!==action.payload.id)

    default: return state
}
};
type ActionsType = addNewTodolistACType

type addNewTodolistACType = ReturnType<typeof addNewTodolistAC> | ReturnType<typeof editTodolistAC> | ReturnType<typeof deleteTodolistAC>
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