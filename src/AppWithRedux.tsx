import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import Button from '@mui/material/Button/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import {
    FilterType,
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer, TodolistDomainType
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./components/Todolist/TodolistWithRedux";
import {TaskStatuses, TaskType } from './api/todolist-api';

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    // Удаление таски
    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId))
    }, [dispatch])

    //Добавление таски
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }, [dispatch])

    //Изменение статуса таски
    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, status))
    }, [dispatch])

    // Фильтрация тасок
    const changeFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter))
    }, [dispatch])

    //Удаление тудулиста и тасок
    const removeTodolist = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    //Добавление нового тудулиста
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const updateTask = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title))
    }, [dispatch])

    const updateTodolist = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <div className={"addItemForm"}>
                <AddItemForm addItem={addTodolist} label={'New todolist'}/>
            </div>

            <div className={"todolistsFlexbox"}>
                {
                    todolists.map(tl => {
                        return (
                            <Paper key={tl.id} elevation={3} className={"paper"}>
                                <Todolist
                                    todolistId={tl.id}
                                    title={tl.title}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    filter={tl.filter}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    updateTask={updateTask}
                                    updateTodolist={updateTodolist}
                                />
                            </Paper>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default AppWithRedux;
