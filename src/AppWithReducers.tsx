import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import Button from '@mui/material/Button/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Paper from '@mui/material/Paper';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

function AppWithReducers() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    // Удаление таски
    const removeTask = (todolistId: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(todolistId, taskId))
    }

    //Добавление таски
    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(todolistId, title))
    }

    //Изменение статуса таски
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(todolistId, taskId, isDone))
    }

    // Фильтрация тасок
    const changeFilter = (todolistId: string, filter: FilterType) => {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))
    }

    //Удаление тудулиста и тасок
    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    //Добавление нового тудулиста
    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistId, taskId, title))
    }

    const updateTodolist = (todolistId: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
    }

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
                        const todolistTasks = tasks[tl.id]
                        let filteredTasks = todolistTasks
                        if (tl.filter === 'active') {
                            filteredTasks = todolistTasks.filter(t => !t.isDone)
                        }
                        if (tl.filter === 'completed') {
                            filteredTasks = todolistTasks.filter(t => t.isDone)
                        }

                        return (
                            <Paper key={tl.id} elevation={3} className={"paper"}>
                                <Todolist
                                          todolistId={tl.id}
                                          title={tl.title}
                                          tasks={filteredTasks}
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

export default AppWithReducers;
