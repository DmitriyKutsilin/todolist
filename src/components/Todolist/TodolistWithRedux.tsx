// @flow
import * as React from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton/IconButton';
import Button from '@mui/material/Button/Button';
import List from '@mui/material/List/List';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../state/store";
import {
    changeTodolistFilterAC,
    deleteTodolistTC,
    FilterType,
    TodolistDomainType,
    updateTodolistTC
} from "../../state/todolists-reducer";
import {createTaskTC, fetchTasksTC} from "../../state/tasks-reducer";
import {TaskStatuses, TaskType} from '../../api/todolist-api';
import {TaskWithRedux} from "../Task/TaskWithRedux";
import {useEffect} from "react";

type TodolistProps = {
    todolist: TodolistDomainType
};
export const TodolistWithRedux = ({ todolist }: TodolistProps) => {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, []);

    if (filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed)
    }


    const changeFilterTasksHandler = (filter: FilterType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }

    const removeTodolistHandler = () => {
        dispatch(deleteTodolistTC(id))
    }

    const addTaskCallback = (title: string) => {
        dispatch(createTaskTC(id, title))
    }

    const updateTodolistHandler = (title: string) => {
        dispatch(updateTodolistTC(id, title))
    }

    return (
        <div className={'todolist'}>
            <div className={'todolist-title-container'}>
                <EditableSpan className="todolistHeader" value={title} onChange={updateTodolistHandler}/>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteForeverIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback} label={'New task'}/>
            <List>
                {
                    tasks.length === 0
                        ? <p>Тасок нет</p>
                        : tasks.map(task => {
                            return <TaskWithRedux task={task} todolistId={id}/>
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