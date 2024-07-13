// @flow
import * as React from 'react';
import {FilterType, TaskType} from "../../App";
import {Button} from "../Button/Button";
import {ChangeEvent, useState, KeyboardEvent} from "react";

type TodolistProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterType
};
export const Todolist = ({
                             todolistId,
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             filter,
                             addTask,
                             changeTaskStatus,
                             removeTodolist
                         }: TodolistProps) => {

    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(todolistId, taskTitle)
        } else {
            setError('Title is required!')
        }
        setTaskTitle('')
    }

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const changeFilterTasksHandler = (filter: FilterType) => {
        changeFilter(todolistId, filter)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3>{title}</h3>
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </div>
            <div>
                <input className={error ? 'error' : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={addTaskOnKeyDownHandler}/>
                <Button title={'+'} onClick={addTaskHandler}/>
            </div>
            {
                error && <div className={'error-message'}>{error}</div>
            }
            <ul>
                {
                    tasks.length === 0
                        ? <p>Тасок нет</p>
                        : tasks.map(task => {
                            const removeTaskHandler = () => {
                                removeTask(todolistId, task.id)
                            }

                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const isDone = e.currentTarget.checked
                                changeTaskStatus(todolistId, task.id, isDone)
                            }

                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={removeTaskHandler}/>
                                </li>
                            )
                        })
                }
            </ul>
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    );
};