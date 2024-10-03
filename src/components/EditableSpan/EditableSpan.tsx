// @flow
import TextField from '@mui/material/TextField/TextField';
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, memo, useState} from "react";

type Props = {
    value: string
    onChange: (title: string) => void
    className?: string
    disabled?: boolean
};
export const EditableSpan = memo(({value, onChange, className, disabled}: Props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)
    // const [error, setError] = useState<string | null>(null)

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        if (!disabled) {
            setEditMode(true)
            setTitle(value)
        }
    }

    const deactivateEditMode = () => {
        if (title.trim()) {
            setEditMode(false)
            onChange(title)
        }
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

                    : <span className={className}
                            style={disabled ? {opacity: 0.5} : {}}
                            onDoubleClick={activateEditMode}>{value}</span>
            }
        </>
    );
});