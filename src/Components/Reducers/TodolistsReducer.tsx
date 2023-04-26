import React from 'react';
import {TodolistsType} from "../../App";
import {v1} from "uuid";

export const TodolistsReducer = (state: TodolistsType, action:ActionsType) => {
switch (action.type){
    case 'ADD-TODOLIST': return [...state,{id: action.payload.id, title: 'New List'}]
    default: return state
}
};
type ActionsType = addNewTodolistACType

type addNewTodolistACType = ReturnType<typeof addNewTodolistAC>
export const addNewTodolistAC = (id)=>{
    let id=v1()
    return {
        type: 'ADD-TODOLIST',
        payload: {id}
    }as const
}