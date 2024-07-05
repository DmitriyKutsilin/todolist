import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const [filter, setFilter] = useState<FilterType>('all')

    const tasks2: TaskType[] = [
        {id: v1(), title: 'Hello world', isDone: true},
        {id: v1(), title: 'I am Happy', isDone: false},
        {id: v1(), title: 'Yo', isDone: false},
    ]

    // Удаление таски
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    //Добавление таски
    const addTask = (title: string) => {
        setTasks([{id: v1(), title, isDone: false}, ...tasks])
    }

    // Создаем копию для филтрации
    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(t => t.isDone)
    }

    // Фильтрация тасок
    const filterTasks = (filter: FilterType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      filterTasks={filterTasks}
                      addTask={addTask}
            />
            {/*<Todolist title={'What to buy'} tasks={tasks}/>*/}
        </div>
    );
}

export default App;
