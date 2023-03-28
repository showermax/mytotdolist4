import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {SuperButton} from "./Super/SuperButton";
import {SuperInput} from "./Super/SuperInput";

type PropsType = {
    tasks: TaskType[]
    title?: string
    addTask: ()=>void
    deleteTask: (id: string)=>void
}

export type TaskType={
    id:string
    taskName:string
    isDone: boolean
    properties: {
        priority: string
        assignedTo: boolean
    }
}
export const Todolist = (props: PropsType) => {
    const [newTaskName, setNewTaskName] = useState<string>('')

    const onKeyDownHandler =(k: KeyboardEvent<HTMLInputElement>)=>{
        if (k.key==='Enter') {
            props.addTask()
            setNewTaskName('')
        }
    }
    const onChangeHandler =(e: ChangeEvent<HTMLInputElement>)=>{
        setNewTaskName(e.currentTarget.value)
    }
    const addTaskHandler =(n:string)=>{
        props.addTask(newTaskName)
    }
    return (
        <div className="todolist">
            <div>{props.title}</div>
            <div className="input">
                <SuperInput type="text" value={newTaskName} onChangeCallback={onChangeHandler} onKeyDownCallBack={onKeyDownHandler}/>
                <SuperButton title='Add' onClickCallBack={addTaskHandler}/>
            </div>
            <div className="list">
                <ol>
                    {props.tasks.map((el,i)=>
                        <li key={i}>
                            <input type="checkbox"/>
                            {el.taskName}
                            <SuperButton title='X' onClickCallBack={()=>props.deleteTask(el.id)}/>
                        </li>)}
                </ol>
            </div>
        </div>

    )
}