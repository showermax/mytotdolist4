import React from 'react';
import style from './Loading.module.css'

export const Loading = () => {
    return (
        <div className={style.loader}>
            <div className={style.loader__element}></div>
        </div>
    );
};

