// @flow
import * as React from 'react'
import { TodolistDomainType } from 'features/TodolistsList/todolistsSlice'
import { useEffect, useMemo } from 'react'
import { TaskStatuses } from 'api/todolist-api'
import { AppRootStateType, useAppDispatch, useAppSelector } from 'app/store'
import { useSelector } from 'react-redux'
import { fetchTasksTC, TasksStateType } from 'features/TodolistsList/tasksSlice'
import { Task } from 'features/TodolistsList/Todolist/Tasks/Task/Task'
import List from '@mui/material/List/List'

type Props = {
  todolist: TodolistDomainType
}
export const Tasks = ({ todolist }: Props) => {
  const tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(todolist.id))
  }, [])

  let todolistTasks = tasks[todolist.id]

  todolistTasks = useMemo(() => {
    console.log('useMemo')
    if (todolist.filter === 'active') {
      todolistTasks = todolistTasks.filter((t) => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
      todolistTasks = todolistTasks.filter((t) => t.status === TaskStatuses.Completed)
    }
    return todolistTasks
  }, [todolistTasks, todolist.filter])

  return (
    <List>
      {todolistTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        todolistTasks?.map((task) => {
          return <Task key={task.id} task={task} todolist={todolist} />
        })
      )}
    </List>
  )
}
