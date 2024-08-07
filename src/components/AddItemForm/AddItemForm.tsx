// @flow
import * as React from 'react';
import {Button} from "../Button/Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from '@mui/material/IconButton/IconButton';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField/TextField';


type Props = {
    addItem: (title: string) => void
    label: string
};
export const AddItemForm = ({addItem, label}: Props) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        if (title.trim()) {
            addItem(title.trim())
        } else {
            setError('Title is required!')
        }
        setTitle('')
    }

    const addItemOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            {/*<input className={error ? 'error' : ''}*/}
            {/*       value={title}*/}
            {/*       onChange={changeItemTitleHandler}*/}
            {/*       onKeyDown={addItemOnKeyDownHandler}/>*/}
            <TextField
                size="small"
                error={!!error}
                helperText={error}
                id="outlined"
                variant="outlined"
                label={label}
                value={title}
                onChange={changeItemTitleHandler}
                onKeyDown={addItemOnKeyDownHandler}
            />
            <IconButton size="medium" color="primary" onClick={addItemHandler}>
                <AddCircleOutline fontSize="medium"/>
            </IconButton>
            {/*<Button title={'+'} onClick={addItemHandler}/>*/}
            {/*{*/}
            {/*    error && <div className={'error-message'}>{error}</div>*/}
            {/*}*/}
        </div>

    );
};