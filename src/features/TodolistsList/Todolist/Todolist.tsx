// @flow
import * as React from 'react';
import {memo, useCallback, useMemo} from 'react';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton/IconButton';
import List from '@mui/material/List/List';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {ButtonWithMemo} from "../../../components/Button/ButtonWithMemo";
import {Task} from "./Task/Task";
import {FilterType} from '../todolists-reducer';
import {TaskStatuses} from '../../../api/todolist-api';
import {TaskDomainType} from "../tasks-reducer";
import {RequestStatusType} from "../../../app/app-reducer";

type TodolistProps = {
    todolistId: string
    title: string
    entityStatus: RequestStatusType
    tasks: TaskDomainType[]
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
                                  entityStatus,
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

    // const dispatch = useAppDispatch()

    // useEffect(() => {
    //     dispatch(fetchTasksTC(todolistId))
    // }, []);

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
                <EditableSpan className="todolistHeader"
                              value={title}
                              onChange={updateTodolistHandler}
                              disabled={entityStatus === 'loading'}/>
                <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                    <DeleteForeverIcon/>
                </IconButton>
                {/*<Button title={'x'} onClick={removeTodolistHandler}/>*/}
            </div>
            <AddItemForm addItem={addTaskCallback} label={'New task'} disabled={entityStatus === 'loading'}/>
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
                                onClick={onAllClickHandler}
                                disabled={entityStatus === 'loading'}>
                    All
                </ButtonWithMemo>
                <ButtonWithMemo size="small"
                                variant={filter === 'active' ? 'outlined' : 'text'}
                                color={'error'}
                                onClick={onActiveClickHandler}
                                disabled={entityStatus === 'loading'}>
                    Active
                </ButtonWithMemo>
                <ButtonWithMemo size="small"
                                variant={filter === 'completed' ? 'outlined' : 'text'}
                                color={'success'}
                                onClick={onCompletedClickHandler}
                                disabled={entityStatus === 'loading'}>
                    Completed
                </ButtonWithMemo>
            </div>
        </div>
    );
});