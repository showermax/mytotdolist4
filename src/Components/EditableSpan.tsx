import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type EditableSpanPropsType = {
    content: string
    editTask: (s: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [edit, setEdit] = useState(false)
    const [newName, setNewName] = useState(props.content)
    const [error,setError] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }
    const onKeyDownSetEditsHandler = (key: KeyboardEvent<HTMLInputElement>) => {
        if (key.key === 'Enter') {
             if (newName) {
                 props.editTask(newName.trim())
             }  else { setError(true)}
            setEdit(false)
        }
    }
    const setEditsHandler = () => {
        if (newName) {
            props.editTask(newName.trim())
        }  else { setError(true)}
        setEdit(false)
    }
    let typesmth=!newName && <div> type something </div>
    return (
        <div style={{'display': 'flex'}}>
            {edit
                ?
                <>
                    <div className={'editableInput'} onBlur={setEditsHandler}>
                        <input type={'text'} value={newName} onChange={onChangeHandler}
                               onKeyDown={onKeyDownSetEditsHandler}
                               autoFocus/>
                        <img onClick={setEditsHandler} src='/img/done_1.svg' alt={'edit'}/>
                    </div>
                    {typesmth}</>
                :
                <span onDoubleClick={() => {
                    setEdit(true)
                }}>{props.content}</span>}
        </div>
    )
}