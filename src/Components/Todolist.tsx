import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useEffect, useMemo, useState} from "react";
import {SuperButton} from "./Super/SuperButton";
import {SuperInput} from "./Super/SuperInput";
import {EditableSpan} from "./EditableSpan";
import {Completed} from "../ReduxApp";
import {
    addTaskAC, addTaskTC,
    changePriorityAC,
    deleteTaskAC, deleteTaskTC,
    editTaskAC, editTaskTC, getTasksTC,
    makeDoneAC, ModelType,
    setForTodayAC, TaskType
} from "../Reducers/TasksReducer";
import {useSelector} from "react-redux";
import {RootType, useAppDispatch} from "../redux/store";
import {getListsTC} from "../Reducers/TodoListsReducer";


type PropsType = {
    id_List: string
    title: string
    deleteTodolist: (id_List: string) => void
    editTodolist: (id_List: string, s: string) => void
}

export type PriorityType = 'High' | 'Normal' | 'Low'
// export type TaskType = {
//     id: string
//     taskName: string
//     isDone: boolean
//     properties: {
//         tags: { priority: string, today: boolean }
//         parent: string
//     }
// }
export const Todolist = memo((props: PropsType) => {
    const [newTaskName, setNewTaskName] = useState<string>('')
    const [filter, setFilter] = useState<string>('')
    const dispatch = useAppDispatch()
    const tasks = useSelector<RootType, TaskType[]>(s => s.tasks[props.id_List])
    const deleteTodolistHandler = () => (
        props.deleteTodolist(props.id_List)
    )
    useEffect(() => {
        dispatch(getTasksTC(props.id_List))
    }, [])
    const onKeyDownHandler = useCallback((k: KeyboardEvent<HTMLInputElement>) => {
        if (k.key === 'Enter') {
            dispatch(addTaskTC(props.id_List, newTaskName))
            setNewTaskName('')
        }
    }, [])
    const addTask = useCallback(() => {
        dispatch(addTaskTC(props.id_List, newTaskName))
        setNewTaskName('')
        setFilter('')
    }, [dispatch, newTaskName])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskName(e.currentTarget.value)
    }, [dispatch])
    const changeFilterHigh = () => {
        setFilter('High')
    }
    const changeFilterMedium = () => {
        setFilter('Normal')
    }
    const changeFilterLow = () => {
        setFilter('Low')
    }
    const changeFilterAll = () => {
        setFilter('')
    }
    const makeDone = (id_task: string, e: boolean) => {
        dispatch(makeDoneAC(props.id_List, id_task, e))
    }
    const deleteTask = (id_Task: string) => {
        dispatch(deleteTaskTC(props.id_List, id_Task))
    }
    const editTask = (id_Task: string, s: string) => {
        dispatch(editTaskTC(props.id_List, id_Task, {title: s}))
    }
    const setForToday = (id: string) => {
        dispatch(setForTodayAC(props.id_List, id))
    }
    function filtering() {
        if (filter === 'High') return tasks.filter(el => el.priority === 2)
        if (filter === 'Normal') return tasks.filter(el => el.priority === 1)
        if (filter === 'Low') return tasks.filter(el => el.priority === 0)
        return tasks
    }

    useMemo(filtering, [])

    const editHandler = useCallback((s: string) => props.editTodolist(props.id_List, s), [])
    const selectOnchangeHandler = (e: ChangeEvent<HTMLSelectElement>, id_Task: string) => {
        // dispatch(changePriorityAC(props.id_List, id, e.currentTarget.value))
        dispatch(editTaskTC(props.id_List, id_Task, {priority: +e.currentTarget.value}))

    }
    return (
        <div className="todolist">
            <div className="listwrapper">
                <div className={'todolistTitle'}><EditableSpan content={props.title}
                                                               editContent={editHandler}
                                                               defaultState={props.title === 'New List'}/></div>
                {props.id_List !== Completed && <div className="input">
                    <SuperInput type="text" value={newTaskName} onChangeCallback={onChangeHandler}
                                onKeyDownCallBack={onKeyDownHandler}/>
                    <SuperButton title='Add' onClickCallBack={addTask}
                                 disabled={!newTaskName}/>
                </div>}
                <div className="list">
                    <ol>
                        {filtering().map((el, i) =>
                            <li key={i}>
                                <div className={'task'}><input type="checkbox" checked={el.completed}
                                                               onChange={(e: ChangeEvent<HTMLInputElement>) => makeDone(el.id, e.currentTarget.checked)}/>
                                    <EditableSpan content={el.title}
                                                  editContent={(s: string) => editTask(el.id, s)}
                                                  defaultState={false}/></div>
                                <div>
                                    <select onChange={(e) => selectOnchangeHandler(e, el.id)} value={el.priority}>
                                        <option value ={0}>Low</option>
                                        <option value ={1}>Normal</option>
                                        <option value ={2}>High</option>
                                    </select>
                                    {(props.id_List === 'todolistid-inbox') &&
                                        <SuperButton title='>' onClickCallBack={() => setForToday(el.id)}/>}
                                    <SuperButton title='X' onClickCallBack={() => deleteTask(el.id)}/>
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

