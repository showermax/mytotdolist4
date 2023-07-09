import React from 'react';
import style from './Notidication.module.scss'
import {useSelector} from "react-redux";
import {RootType, useAppDispatch} from "../redux/store";
import {MessageType, setMessage} from "../Reducers/AppReducer";

const Alert = (props: any) => {
    console.log(`${style.alert} ${props.alertType}Alert`)
    return (
        <div className={`${style.alert} ${props.alertType}Alert`}>
            <h3>{props.alertText}</h3>
            <a className={style.close} onClick={props.onClose}>&times;</a>
        </div>
    )
}
export const Notification = () => {
    const message = useSelector<RootType, MessageType | null>(s => s.app.message)
    const dispatch = useAppDispatch()
    if (message) setTimeout(()=>dispatch(setMessage(null)),3000)
    const onCloseHandler = () => {
        dispatch(setMessage(null))
    }
    return (
        <div className={style.wrapper}>
            {!!message &&
                <Alert alertType={message.typeOfMessage}  onClose={onCloseHandler} alertText={message.messageText} />}


            {/*{(message.typeOfMessage === "warning") ?*/}
            {/*    style.warningAlert : (message.typeOfMessage === "success") ?*/}
            {/*        style.successAlert : style.errorAlert*/}
            {/*}*/}

{/*<div className={`${style.alert} ${style.simpleAlert}`}>*/
}
{/*    <h3>Simple Alert Message</h3>*/
}
{/*    <a className={style.close}>&times;</a>*/
}
{/*</div>*/
}

{/*<div className={`${style.alert} ${style.successAlert}`}>*/
}
{/*    <h3>Success Alert Message</h3>*/
}
{/*    <a className={style.close}>&times;</a>*/
}
{/*</div>*/
}

{/*<div className={`${style.alert} ${style.dangerAlert}`}>*/
}
{/*    <h3>Danger Alert Message</h3>*/
}
{/*    <a className={style.close}>&times;</a>*/
}
{/*</div>*/
}
{/*<div className={`${style.alert} ${style.warningAlert}`}>*/
}
{/*    <h3>Warning Alert Message</h3>*/
}
{/*    <a className={style.close}>&times;</a>*/
}
{/*</div>*/
}
</div>
)
    ;
};

