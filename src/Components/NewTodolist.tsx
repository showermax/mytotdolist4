import React from "react";

type PropsType ={
    addNew: ()=> void
}
export function NewTodolist (props:PropsType ){
    return(
        <div className='todolist'>
            <input type="text" />
            <div style={{fontSize: '100px'}} onClick={()=>props.addNew()}>+</div>
        </div>
    )
}