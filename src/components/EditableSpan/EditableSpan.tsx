// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    value: string
    onChange: (title: string) => void
};
export const EditableSpan = ({value, onChange}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(!editMode)
    }

    const deactivateEditMode = () => {
        setEditMode(!editMode)
        onChange(title)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            deactivateEditMode()
        }
    }

    return (
        <>
            {
                editMode
                    ? <input value={title}
                             onBlur={deactivateEditMode}
                             onChange={changeTitleHandler}
                             onKeyDown={onKeyDownHandler}
                             autoFocus/>
                    : <span onDoubleClick={activateEditMode}>{value}</span>
            }
        </>
    );
};