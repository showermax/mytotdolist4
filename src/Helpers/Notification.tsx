import React, {useState} from 'react';
import style from './Notidication.module.scss'
import {useSelector} from "react-redux";
import {RootType, useAppDispatch} from "../redux/store";
import {setError} from "../Reducers/AppReducer";

const Alert = (props:any) => {
    return (
        <div className={`${style.alert} ${props.alertType}`}>
            <h3>Simple Alert Message</h3>
            <a className={style.close} onClick={props.onClose}>&times;</a>
        </div>
    )
}
export const Notification = () => {
    const message = useSelector<RootType, null | string>(s=>s.app.error)
    const dispatch = useAppDispatch()
    const [showMe, setShowMe] = useState(false)
    if (message) {
        setShowMe(true)
        dispatch(setError(null))
        setTimeout(() => {
            setShowMe(false)

        }, 3000)
    }
    const onCloseHandler =()=>{
        setShowMe(false)
        dispatch(setError(null))
    }

    return (
        <div className={style.wrapper}>
            {showMe && <Alert alertType={style.successAlert} onClose={onCloseHandler}/>}
            {/*<div className={`${style.alert} ${style.simpleAlert}`}>*/}
            {/*    <h3>Simple Alert Message</h3>*/}
            {/*    <a className={style.close}>&times;</a>*/}
            {/*</div>*/}

            {/*<div className={`${style.alert} ${style.successAlert}`}>*/}
            {/*    <h3>Success Alert Message</h3>*/}
            {/*    <a className={style.close}>&times;</a>*/}
            {/*</div>*/}

            {/*<div className={`${style.alert} ${style.dangerAlert}`}>*/}
            {/*    <h3>Danger Alert Message</h3>*/}
            {/*    <a className={style.close}>&times;</a>*/}
            {/*</div>*/}
            {/*<div className={`${style.alert} ${style.warningAlert}`}>*/}
            {/*    <h3>Warning Alert Message</h3>*/}
            {/*    <a className={style.close}>&times;</a>*/}
            {/*</div>*/}
        </div>
    );
};

