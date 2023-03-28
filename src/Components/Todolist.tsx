import React from "react";
import {SuperButton} from "./Super/SuperButton";

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
    return (
        <div className="todolist">
            <div>{props.title}</div>
            <div className="input">
                <input type="text"/>
                <SuperButton title='Add' onClickCallBack={props.addTask}/>
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