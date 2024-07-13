// @flow
import * as React from 'react';
import {FilterType, TaskType} from "../../App";
import {Button} from "../Button/Button";
import {ChangeEvent} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TodolistProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
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
                             removeTodolist,
                             updateTask,
                             updateTodolist
                         }: TodolistProps) => {

    const changeFilterTasksHandler = (filter: FilterType) => {
        changeFilter(todolistId, filter)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskCallback = (title: string) => {
        addTask(todolistId, title)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }

    return (
        <div>
            <div className={'todolist-title-container'}>
                <EditableSpan value={title} onChange={updateTodolistHandler}/>
                <Button title={'x'} onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
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

                            const updateTaskHandler = (title: string) => {
                                updateTask(todolistId, task.id, title)
                            }

                            return (
                                <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                    <input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={updateTaskHandler}></EditableSpan>
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