import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";

type EditableSpanPropsType = {
    content: string
    editContent: (s: string) => void
    defaultState: boolean
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(props.defaultState)
    const [newName, setNewName] = useState(props.content)
    const [error, setError] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewName(e.currentTarget.value)
    }

    const onKeyDownSetEditsHandler = (key: KeyboardEvent<HTMLInputElement>) => {
        if (key.key === 'Enter') {
            if (newName) {
                props.editContent(newName.trim())
            } else {
                setError(true)
            }
            setEdit(false)
        }
    }
    const setEditsHandler = () => {
        if (newName) {
            props.editContent(newName.trim())
        } else {
            setError(true)
        }
        setEdit(false)
    }
    return (
        <div style={{'display': 'flex'}}>
            {edit
                ?
                    <div className={'editableInput'} onBlur={setEditsHandler}>
                        <input type={'text'} value={newName} onChange={onChangeHandler}
                               placeholder={'type something...'}
                               onKeyDown={onKeyDownSetEditsHandler}
                               autoFocus/>
                        <img onClick={setEditsHandler} src='/img/done_1.svg' alt={'edit'}/>
                    </div>
                :
                <span onDoubleClick={() => {
                    setEdit(true)
                }}>{props.content}</span>}
        </div>
    )
})