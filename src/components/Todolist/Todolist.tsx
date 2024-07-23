// @flow
import * as React from 'react';
import {FilterType, TaskType} from "../../App";
import {ChangeEvent} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton/IconButton';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Button from '@mui/material/Button/Button';
import Checkbox from '@mui/material/Checkbox/Checkbox';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
        <div className={'todolist'}>
            <div className={'todolist-title-container'}>
                <EditableSpan className="todolistHeader" value={title} onChange={updateTodolistHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
                {/*<Button title={'x'} onClick={removeTodolistHandler}/>*/}
            </div>
            <AddItemForm addItem={addTaskCallback} label={'New task'}/>
            <List>
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
                                <ListItem key={task.id}
                                          sx={{
                                              p: 0,
                                              justifyContent: "space-between",
                                              opacity: task.isDone ? 0.5 : 1,
                                          }}>
                                    <div className="taskCenter">
                                        <Checkbox size="medium" checked={task.isDone} onChange={onChangeStatusHandler}/>
                                        <EditableSpan value={task.title} onChange={updateTaskHandler}></EditableSpan>
                                    </div>
                                    <IconButton size="medium" color="default" onClick={removeTaskHandler}>
                                        <RemoveCircleOutlineIcon fontSize="inherit"/>
                                    </IconButton>
                                </ListItem>
                            )
                        })
                }
            </List>
            <div className="filterButtonsContainer">
                <Button size="small"
                        variant={filter === 'all' ? 'outlined' : 'text'}
                        color="primary"
                        onClick={() => changeFilterTasksHandler('all')}>
                    All
                </Button>
                <Button size="small"
                        variant={filter === 'active' ? 'outlined' : 'text'}
                        color={'error'}
                        onClick={() => changeFilterTasksHandler('active')}>
                    Active
                </Button>
                <Button size="small"
                        variant={filter === 'completed' ? 'outlined' : 'text'}
                        color={'success'}
                        onClick={() => changeFilterTasksHandler('completed')}>
                    Completed
                </Button>
            </div>
        </div>
    );
};