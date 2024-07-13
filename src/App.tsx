import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
        })
    }

    //Добавление таски
    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title, isDone: false};
        setTasks({
            ...tasks,
            [todolistId]: [newTask, ...tasks[todolistId]]
        })
    }

    //Изменение статуса таски
    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)
        })
    }

    // Фильтрация тасок
    const changeFilter = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    //Удаление тудулиста и тасок
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
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
                        <Todolist key={tl.id}
                                  todolistId={tl.id}
                                  title={tl.title}
                                  tasks={filteredTasks}
                                  removeTask={removeTask}
                                  filter={tl.filter}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeTaskStatus}
                                  removeTodolist={removeTodolist}
                        />
                    )
                })
            }

            {/*<Todolist title={'What to learn'}*/}
            {/*          tasks={filteredTasks}*/}
            {/*          removeTask={removeTask}*/}
            {/*          filter={filter}*/}
            {/*          filterTasks={filterTasks}*/}
            {/*          addTask={addTask}*/}
            {/*          changeTaskStatus={changeTaskStatus}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
