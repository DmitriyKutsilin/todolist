// @flow
import TextField from '@mui/material/TextField/TextField';
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    value: string
    onChange: (title: string) => void
    className?: string
};
export const EditableSpan = ({value, onChange, className}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    // const [error, setError] = useState<string | null>(null)

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // setError(null)
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        if (title.trim()) {
            setEditMode(false)
            onChange(title)
        }
        // else {
        //     // setTitle(value)
        //     // setEditMode(false)
        //     setError('Title is required!')
        // }
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
                    ? <>
                        <TextField
                            // className={error ? 'error' : ''}

                            // inputProps={{size: title.length}}
                            // sx={{maxWidth: 'fit-content', overflow: "none"}}
                            variant="standard"
                            value={title}
                            onBlur={deactivateEditMode}
                            onChange={changeTitleHandler}
                            onKeyDown={onKeyDownHandler}
                            autoFocus/>
                        {/*{*/}
                        {/*    error && <div className={'error-message'}>{error}</div>*/}
                        {/*}*/}
                    </>

                    : <span className={className} onDoubleClick={activateEditMode}>{value}</span>
            }
        </>
    );
};