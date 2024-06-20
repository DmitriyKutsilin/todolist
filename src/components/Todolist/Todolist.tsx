// @flow
import * as React from 'react';
import {FilterType, TaskType} from "../../App";
import {Button} from "../Button/Button";

type TodolistProps = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    filterTasks: (filter: FilterType) => void
};
export const Todolist = ({title,
                          tasks,
                          removeTask,
                          filterTasks}: TodolistProps) => {

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
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
                <Button title={'Active'}  onClick={() => filterTasks('active')}/>
                <Button title={'Completed'}  onClick={() => filterTasks('completed')}/>
            </div>
        </div>
    );
};