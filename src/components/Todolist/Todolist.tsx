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
};
export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             filterTasks,
                             addTask
                         }: TodolistProps) => {

    const [taskTitle, setTaskTitle] = useState<string>('')

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement> ) => {
        setTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(taskTitle)
        }
        setTaskTitle('')
    }

    const addTaskOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement> ) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={addTaskOnKeyDownHandler}/>
                <Button title={'+'} onClick={addTaskHandler}/>
            </div>
            <ul>
                {
                    tasks.length === 0
                        ? <p>Тасок нет</p>
                        : tasks.map(task => {
                            const removeTaskHandler = () => {
                                removeTask(task.id)
                            }

                            return (
                                <li key={task.id}>
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={removeTaskHandler}/>
                                </li>
                            )
                        })
                }
            </ul>
            <div>
                <Button title={'All'} onClick={() => filterTasks('all')}/>
                <Button title={'Active'} onClick={() => filterTasks('active')}/>
                <Button title={'Completed'} onClick={() => filterTasks('completed')}/>
            </div>
        </div>
    );
};