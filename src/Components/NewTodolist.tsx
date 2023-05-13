import React, {memo} from "react";

type PropsType ={
    addNew: ()=> void
}
export const NewTodolist=memo( (props:PropsType )=>{
    return(
        <div className='todolist'>
            <div style={{fontSize: '100px',opacity: '0.5', cursor:'pointer'}} onClick={()=>props.addNew()}>+</div>
        </div>
    )
})