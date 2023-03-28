import React from "react";

type PropsType = {
    title: string
    onClickCallBack: ()=>void
    buttonStyle?: string
}
export function  SuperButton (props: PropsType){
    return (
        <button className={props.buttonStyle} onClick={props.onClickCallBack}>{props.title}</button>
    )
}