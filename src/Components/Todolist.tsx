import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {SuperButton} from "./Super/SuperButton";
import {SuperInput} from "./Super/SuperInput";

type PropsType = {
    tasks: TaskType[]
    id_List: string
    title?: string
    addTask: (id_List: string, n: string) => void
    setForToday: (id: string) => void
    deleteTask: (id: string) => void
    deleteTodolist: () => void
    makeDone: (id: string) => void
}

export type TaskType = {
    id: string
    taskName: string
    isDone: boolean
    properties: {
        tags: { priority: string, today: boolean }
        assignedTo: boolean
    }
}
export const Todolist = (props: PropsType) => {
    const [newTaskName, setNewTaskName] = useState<string>('')

    const onKeyDownHandler = (k: KeyboardEvent<HTMLInputElement>) => {
        if (k.key === 'Enter') {
            props.addTask(props.id_List, newTaskName)
            setNewTaskName('')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(e.currentTarget.value)
    }
    const addTaskHandler = (n: string) => {
        props.addTask(props.id_List, n)
        setNewTaskName('')
    }
    return (
        <div className="todolist">
            <div className="listwrapper">
                <div>{props.title}</div>
                <div className="input">
                    <SuperInput type="text" value={newTaskName} onChangeCallback={onChangeHandler}
                                onKeyDownCallBack={onKeyDownHandler}/>
                    <SuperButton title='Add' onClickCallBack={() => addTaskHandler(newTaskName)}/>
                </div>
                <div className="list">
                    <ol>
                        {props.tasks.map((el, i) =>
                            <li key={i}>
                                <input type="checkbox" checked={el.isDone} onChange={() => props.makeDone(el.id)}/>
                                {el.taskName}
                                <div>
                                    {(props.id_List === 'todolistid-inbox') && <SuperButton title='>' onClickCallBack={() => props.setForToday(el.id)}/>}
                                    <SuperButton title='X' onClickCallBack={() => props.deleteTask(el.id)}/>
                                </div>
                            </li>)}
                    </ol>
                </div>
            </div>
            <div className="deletetodolist">
                <img src="/img/delete-button-svgrepo-com.svg" alt="delete the list" onClick={props.deleteTodolist}/>
            </div>
        </div>

    )
}