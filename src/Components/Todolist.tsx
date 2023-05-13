import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useMemo, useState} from "react";
import {SuperButton} from "./Super/SuperButton";
import {SuperInput} from "./Super/SuperInput";
import {EditableSpan} from "./EditableSpan";
import {Completed} from "../ReduxApp";
import {addTaskAC, deleteTaskAC, editTaskAC, makeDoneAC, setForTodayAC} from "../Reducers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootType} from "../redux/store";


type PropsType = {
    id_List: string
    title: string
    deleteTodolist: (id_List: string) => void
    editTodolist: (id_List: string, s: string) => void
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
export const Todolist = memo((props: PropsType) => {
    const [newTaskName, setNewTaskName] = useState<string>('')
    const [filter, setFilter] = useState<string>('')
    const dispatch = useDispatch()
    const tasks = useSelector((s: RootType) => s.tasks)

    const deleteTodolistHandler = ()=>(
        props.deleteTodolist(props.id_List)
    )
    const onKeyDownHandler = (k: KeyboardEvent<HTMLInputElement>) => {
        if (k.key === 'Enter') {
            addTask()
            setNewTaskName('')
        }
    }
    const addTask = useCallback(() => {
        dispatch(addTaskAC(props.id_List, newTaskName))
        setNewTaskName('')
        setFilter('')
    },[dispatch,newTaskName])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(e.currentTarget.value)
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
    const makeDone = (id_task: string, e: boolean) => {
        dispatch(makeDoneAC(props.id_List,id_task,e))
    }

    const deleteTask = (id_Task: string) => {
        dispatch(deleteTaskAC(props.id_List,id_Task))
    }
    const editTask = (id_Task: string, s: string) => {
        dispatch(editTaskAC(props.id_List,id_Task,s))
    }
    const setForToday = (id: string) => {
        dispatch(setForTodayAC(props.id_List,id))
    }
    function filtering() {
        // if (filter === 'High') return tasks[props.id_List].filter(el => el.properties.tags.priority === 'high')
        // if (filter === 'Normal') return tasks[props.id_List].filter(el => el.properties.tags.priority === 'normal')
        // if (filter === 'Low') return tasks[props.id_List].filter(el => el.properties.tags.priority === 'low')
        // return tasks[props.id_List]
    }
    useMemo(filtering,[filter])
    return (
        <div className="todolist">
            <div className="listwrapper">
                <div className={'todolistTitle'}><EditableSpan content={props.title}
                                                               editContent={(s: string) => props.editTodolist(props.id_List, s)}
                                                               defaultState={props.title === 'New List'}/></div>
                {props.id_List !== Completed && <div className="input">
                    <SuperInput type="text" value={newTaskName} onChangeCallback={onChangeHandler}
                                onKeyDownCallBack={onKeyDownHandler}/>
                    <SuperButton title='Add' onClickCallBack={addTask}
                                 disabled={!newTaskName}/>
                </div>}
                <div className="list">
                    <ol>
                        {tasks[props.id_List].map((el, i) =>
                            <li key={i}>
                                <div className={'task'}><input type="checkbox" checked={el.isDone}
                                                               onChange={(e: ChangeEvent<HTMLInputElement>) => makeDone(el.id, e.currentTarget.checked)}/>
                                    <EditableSpan content={el.taskName}
                                                  editContent={(s: string) => editTask(el.id, s)}
                                                  defaultState={false}/></div>
                                <div>
                                    {(props.id_List === 'todolistid-inbox') &&
                                        <SuperButton title='>' onClickCallBack={() =>setForToday(el.id)}/>}
                                    <SuperButton title='X' onClickCallBack={() =>deleteTask(el.id)}/>
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
                <img src="/img/delete-button-svgrepo-com.svg" alt="delete the list" onClick={deleteTodolistHandler}/>
            </div>
        </div>

    )
})

