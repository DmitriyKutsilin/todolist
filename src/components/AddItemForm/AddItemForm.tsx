// @flow
import * as React from 'react';
import {Button} from "../Button/Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    addItem: (title: string) => void
};
export const AddItemForm = ({addItem}: Props) => {
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
            <input className={error ? 'error' : ''}
                   value={title}
                   onChange={changeItemTitleHandler}
                   onKeyDown={addItemOnKeyDownHandler}/>
            <Button title={'+'} onClick={addItemHandler}/>
            {
                error && <div className={'error-message'}>{error}</div>
            }
        </div>

    );
};