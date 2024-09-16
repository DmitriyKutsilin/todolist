import {useEffect, useState} from "react";
import {tasksApi} from "../api/tasks-api";

export default {
    title: 'TASKS-API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistID = '78ae5129-b129-48a7-a4a6-8e7a2552c505'
        tasksApi.getTasks(todolistID)
            .then(res => setState(res.data.items))
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistID = '78ae5129-b129-48a7-a4a6-8e7a2552c505'
        const title = '2 TASK'
        tasksApi.createTask(todolistID, title)
            .then(res => setState(res.data))

    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistID = '78ae5129-b129-48a7-a4a6-8e7a2552c505'
        const taskID = 'd15c1e75-8d13-4ab6-af3f-6580cc6f232d'
        const newTitle = 'UPDATED TASK'

        tasksApi.updateTodolist(todolistID, taskID, newTitle)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistID = '78ae5129-b129-48a7-a4a6-8e7a2552c505'
        const taskID = 'fcabe6d0-5759-40e9-9bc5-3cb1a258f97a'

        tasksApi.deleteTodolist(todolistID, taskID)
            .then(res => setState(res.data))
    }, []);

    return <div>{JSON.stringify(state)}</div>
}