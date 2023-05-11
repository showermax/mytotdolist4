import React from "react";

type PropsType = {
    title: string
    onClickCallBack: ()=>void
    disabled?:boolean
    buttonStyle?: string
}
export function  SuperButton (props: PropsType){
    return (
        <button className={props.buttonStyle} onClick={props.onClickCallBack} disabled={props.disabled}>{props.title} </button>
    )
}