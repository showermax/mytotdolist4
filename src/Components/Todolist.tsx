import React from "react";

type PropsType = {
    tasks: TaskType[]
    title?: string
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
                <button>add</button>
            </div>
            <div className="list">
                <ol>
                    {props.tasks.map((el,i)=><li key={i}><input type="checkbox"/>{el.taskName}</li>)}
                </ol>
            </div>
        </div>

    )
}