import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch, useAppSelector } from '../../app/store'
import {
  changeTodolistFilterAC,
  createTodolistTC,
  deleteTodolistTC,
  fetchTodolistsTC,
  FilterType,
  TodolistDomainType,
  updateTodolistTC,
} from './todolists-reducer'
import { createTaskTC, deleteTaskTC, TasksStateType, updateTaskTC } from './tasks-reducer'
import { TaskStatuses } from '../../api/todolist-api'
import { AddItemForm } from '../../components/AddItemForm/AddItemForm'
import Paper from '@mui/material/Paper'
import { Todolist } from './Todolist/Todolist'

export const TodolistsList: React.FC = () => {
  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists)
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
  const isLoggedIn = useAppSelector<boolean>((state) => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLoggedIn) {
      return
    }
    dispatch(fetchTodolistsTC())
  }, [])

  // Удаление таски
  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(deleteTaskTC(todolistId, taskId))
    },
    [dispatch],
  )

  //Добавление таски
  const addTask = useCallback(
    (todolistId: string, title: string) => {
      dispatch(createTaskTC(todolistId, title))
    },
    [dispatch],
  )

  //Изменение статуса таски
  const changeTaskStatus = useCallback(
    (todolistId: string, taskId: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(todolistId, taskId, { status }))
      // dispatch(changeTaskStatusAC(todolistId, taskId, status))
    },
    [dispatch],
  )

  // Фильтрация тасок
  const changeFilter = useCallback(
    (todolistId: string, filter: FilterType) => {
      dispatch(changeTodolistFilterAC(todolistId, filter))
    },
    [dispatch],
  )

  //Удаление тудулиста и тасок
  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(deleteTodolistTC(todolistId))
    },
    [dispatch],
  )

  //Добавление нового тудулиста
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolistTC(title))
    },
    [dispatch],
  )

  const updateTask = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      dispatch(updateTaskTC(todolistId, taskId, { title }))
      // dispatch(changeTaskTitleAC(todolistId, taskId, title))
    },
    [dispatch],
  )

  const updateTodolist = useCallback(
    (todolistId: string, title: string) => {
      dispatch(updateTodolistTC(todolistId, title))
    },
    [dispatch],
  )

  // if (!isLoggedIn) {
  //     return <Navigate to='/login'/>
  // }

  return (
    <>
      <div className={'addItemForm'}>
        <AddItemForm addItem={addTodolist} label={'New todolist'} />
      </div>

      <div className={'todolistsFlexbox'}>
        {todolists.map((tl) => {
          //TODO: заменить отдельные пропсы на tl
          return (
            <Paper key={tl.id} elevation={3} className={'paper'}>
              <Todolist
                todolistId={tl.id}
                title={tl.title}
                entityStatus={tl.entityStatus}
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
        })}
      </div>
    </>
  )
}
