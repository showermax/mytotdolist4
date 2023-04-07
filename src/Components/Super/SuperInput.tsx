import React, {ChangeEvent, KeyboardEvent} from 'react';

type PropsType ={
    type:string
    value: string
    onChangeCallback: (e:ChangeEvent<HTMLInputElement>)=>void
    onKeyDownCallBack: (k: KeyboardEvent<HTMLInputElement>)=>void
}
export const SuperInput = (props: PropsType) => {
    return (
        <div>
            <input type={props.type} value={props.value} onChange={props.onChangeCallback} onKeyDown={props.onKeyDownCallBack} onBlur={props.onKeyDownCallBack}/>
        </div>
    );
};

