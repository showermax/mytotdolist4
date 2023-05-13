import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {SuperButton} from "./Super/SuperButton";
import {SuperInput} from "./Super/SuperInput";
import {EditableSpan} from "./EditableSpan";
import {Completed} from "../App";
import {addTaskAC} from "../Reducers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootType} from "../redux/store";


type PropsType = {
    tasks: TaskType[]
    id_List: string
    title: string
    addTask: (id_List: string, n: string) => void
    setForToday: (id: string) => void
    deleteTask: (id: string) => void
    deleteTodolist: () => void
    makeDone: (id: string, e: boolean) => void
    editTask: (id: string, s: string) => void
    editTodolist: (s: string) => void
}

export type TaskType = {
    id: string
    taskName: string
    isDone: boolean
    properties: {
        tags: { priority: string, today: boolean }
        parent: string
    }
}
export const Todolist = (props: PropsType) => {
    const [newTaskName, setNewTaskName] = useState<string>('')
    const [filter, setFilter] = useState<string>('')
    // const dispatch = useDispatch()
    // const tasks = useSelector((s: RootType) => s.tasks)

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
    const changeFilterHigh = () => {
        setFilter('High')
    }
    const changeFilterMedium = () => {
        setFilter('Medium')
    }
    const changeFilterLow = () => {
        setFilter('Low')
    }
    const changeFilterAll = () => {
        setFilter('')
    }

    function filtering() {
        if (filter === 'High') return props.tasks.filter(el => el.properties.tags.priority === 'high')
        if (filter === 'Normal') return props.tasks.filter(el => el.properties.tags.priority === 'normal')
        if (filter === 'Low') return props.tasks.filter(el => el.properties.tags.priority === 'low')
        return props.tasks
    }

    return (
        <div className="todolist">
            <div className="listwrapper">
                <div className={'todolistTitle'}><EditableSpan content={props.title}
                                                               editContent={(s: string) => props.editTodolist(s)}
                                                               defaultState={props.title === 'New List'}/></div>
                {props.id_List !== Completed && <div className="input">
                    <SuperInput type="text" value={newTaskName} onChangeCallback={onChangeHandler}
                                onKeyDownCallBack={onKeyDownHandler}/>
                    <SuperButton title='Add' onClickCallBack={() => addTaskHandler(newTaskName)}
                                 disabled={!newTaskName}/>
                </div>}
                <div className="list">
                    <ol>
                        {filtering().map((el, i) =>
                            <li key={i}>
                                <div className={'task'}><input type="checkbox" checked={el.isDone}
                                                               onChange={(e: ChangeEvent<HTMLInputElement>) => props.makeDone(el.id, e.currentTarget.checked)}/>
                                    <EditableSpan content={el.taskName}
                                                  editContent={(s: string) => props.editTask(el.id, s)}
                                                  defaultState={false}/></div>
                                <div>
                                    {(props.id_List === 'todolistid-inbox') &&
                                        <SuperButton title='>' onClickCallBack={() => props.setForToday(el.id)}/>}
                                    <SuperButton title='X' onClickCallBack={() => props.deleteTask(el.id)}/>
                                </div>
                            </li>)}
                    </ol>
                </div>
            </div>
            {props.id_List !== Completed &&
                <div>
                    <SuperButton title={'High'} onClickCallBack={changeFilterHigh} buttonStyle={'filter'}/>
                    <SuperButton title={'Normal'} onClickCallBack={changeFilterMedium} buttonStyle={'filter'}/>
                    <SuperButton title={'Low'} onClickCallBack={changeFilterLow} buttonStyle={'filter'}/>
                    <SuperButton title={'All'} onClickCallBack={changeFilterAll} buttonStyle={'filter'}/>
                </div>}
            <div className="deletetodolist">
                <img src="/img/delete-button-svgrepo-com.svg" alt="delete the list" onClick={props.deleteTodolist}/>
            </div>
        </div>

    )
}

