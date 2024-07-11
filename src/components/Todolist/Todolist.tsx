// @flow
import * as React from 'react';
import {FilterType, TaskType} from "../../App";
import {Button} from "../Button/Button";
import {ChangeEvent, useState, KeyboardEvent} from "react";

type TodolistProps = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    filterTasks: (filter: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterType
};
export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             filterTasks,
                             filter,
                             addTask,
                             changeTaskStatus
                         }: TodolistProps) => {

    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(taskTitle)
        } else {
            setError('Title is required!')
        }
        setTaskTitle('')
    }

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement> ) => {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
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
                                removeTask(task.id)
                            }

                            const onChangeStatusHandler = (e:  ChangeEvent<HTMLInputElement>) => {
                                const isDone = e.currentTarget.checked
                                changeTaskStatus(task.id, isDone)
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
                        onClick={() => filterTasks('all')}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => filterTasks('active')}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => filterTasks('completed')}/>
            </div>
        </div>
    );
};