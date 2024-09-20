// @flow
import * as React from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {FilterType, TodolistDomainType, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../../state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer";
import {TaskStatuses, TaskType} from '../../api/todolist-api';
import {TaskWithRedux} from "../Task/TaskWithRedux";

type TodolistProps = {
    todolist: TodolistDomainType
};
export const TodolistWithRedux = ({ todolist }: TodolistProps) => {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
    const dispatch = useDispatch()

    if (filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    const changeFilterTasksHandler = (filter: FilterType) => {
        dispatch(changeTodolistFilterAC(id, filter))
        // changeFilter(todolistId, filter)
    }

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
        // removeTodolist(todolistId)
    }

    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC(id, title))
        // addTask(todolistId, title)
    }

    const updateTodolistHandler = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
        // updateTodolist(todolistId, title)
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
                            return <TaskWithRedux task={task} todolistId={id}/>
                            // const removeTaskHandler = () => {
                            //     dispatch(removeTaskAC(id, task.id))
                            //     // removeTask(todolistId, task.id)
                            // }
                            //
                            // const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            //     const isDone = e.currentTarget.checked
                            //     dispatch(changeTaskStatusAC(id, task.id, isDone))
                            //     // changeTaskStatus(todolistId, task.id, isDone)
                            // }
                            //
                            // const updateTaskHandler = (title: string) => {
                            //     dispatch(changeTaskTitleAC(id, task.id, title))
                            //     // updateTask(todolistId, task.id, title)
                            // }
                            //
                            // return (
                            //     <ListItem key={task.id}
                            //               sx={{
                            //                   p: 0,
                            //                   justifyContent: "space-between",
                            //                   opacity: task.isDone ? 0.5 : 1,
                            //               }}>
                            //         <div className="taskCenter">
                            //             <Checkbox size="medium" checked={task.isDone} onChange={onChangeStatusHandler}/>
                            //             <EditableSpan value={task.title} onChange={updateTaskHandler}></EditableSpan>
                            //         </div>
                            //         <IconButton size="medium" color="default" onClick={removeTaskHandler}>
                            //             <RemoveCircleOutlineIcon fontSize="inherit"/>
                            //         </IconButton>
                            //     </ListItem>
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