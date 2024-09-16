import {useEffect, useState} from "react";
import {todolistApi, TodolistType} from "../api/todolist-api";

export default {
    title: 'TODOLIST-API'
}

export const GetTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.getTodolists()
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistTitle = 'FOR TASKS'
        todolistApi.createTodolist(todolistTitle)
            .then(res => setState(res.data.data.item))
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistTitle = 'UPDATED TODOLIST'
        const todolistID = '53163a6b-cb32-4baa-a424-5c215aa66a1d'
        todolistApi.updateTodolist(todolistID, todolistTitle)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistID = '16bdbedb-2c4b-40ce-b13f-453ac9f1680f'
        todolistApi.deleteTodolist(todolistID)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
}