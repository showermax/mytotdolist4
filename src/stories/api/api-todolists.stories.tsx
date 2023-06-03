import React, {useEffect, useState} from 'react'
import axios from "axios";
import {api} from "../../API/api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        api.getLists().then(result=>setState(result.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // api.addList().then(result=>setState(result.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // api.deleteList().then(result=>setState(result.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // api.updateList().then(result=>setState(result.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}