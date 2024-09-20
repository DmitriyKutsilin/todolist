// @flow
import * as React from 'react';
import {memo, useCallback, useMemo} from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton/IconButton';
import List from '@mui/material/List/List';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {ButtonWithMemo} from "../Button/ButtonWithMemo";
import {Task} from "../Task/Task";
import {FilterType} from '../../state/todolists-reducer';
import {TaskStatuses, TaskType} from '../../api/todolist-api';

type TodolistProps = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
    filter: FilterType
};
export const Todolist = memo(({
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

    console.log("todolist")

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskCallback = useCallback((title: string) => {
        addTask(todolistId, title)
    }, [addTask, todolistId])

    const updateTodolistHandler = useCallback((title: string) => {
        updateTodolist(todolistId, title)
    }, [updateTodolist, todolistId])

    const onAllClickHandler = useCallback(() => {
        changeFilter(todolistId, 'all')
    }, [changeFilter, todolistId])
    const onActiveClickHandler = useCallback(() => {
        changeFilter(todolistId, 'active')
    }, [changeFilter, todolistId])
    const onCompletedClickHandler = useCallback(() => {
        changeFilter(todolistId, 'completed')
    }, [changeFilter, todolistId])

    let todolistTasks = tasks

    todolistTasks = useMemo(() => {
        console.log("useMemo")
        if (filter === 'active') {
            todolistTasks = todolistTasks.filter(t => t.status === TaskStatuses.New)
        }
        if (filter === 'completed') {
            todolistTasks = todolistTasks.filter(t => t.status === TaskStatuses.Completed)
        }
        return todolistTasks
    }, [todolistTasks, filter])



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
                    todolistTasks.length === 0
                        ? <p>Тасок нет</p>
                        : todolistTasks.map(task => {
                            return (
                                // <TaskWithRedux key={task.id} task={task} todolistId={todolistId}/>
                                <Task key={task.id}
                                      task={task}
                                      todolistId={todolistId}
                                      changeTaskStatus={changeTaskStatus}
                                      removeTask={removeTask}
                                      updateTask={updateTask}/>
                            )
                        })
                }
            </List>
            <div className="filterButtonsContainer">
                <ButtonWithMemo size="small"
                                variant={filter === 'all' ? 'outlined' : 'text'}
                                color="primary"
                                onClick={onAllClickHandler}>
                    All
                </ButtonWithMemo>
                <ButtonWithMemo size="small"
                                variant={filter === 'active' ? 'outlined' : 'text'}
                                color={'error'}
                                onClick={onActiveClickHandler}>
                    Active
                </ButtonWithMemo>
                <ButtonWithMemo size="small"
                                variant={filter === 'completed' ? 'outlined' : 'text'}
                                color={'success'}
                                onClick={onCompletedClickHandler}>
                    Completed
                </ButtonWithMemo>
            </div>
        </div>
    );
});