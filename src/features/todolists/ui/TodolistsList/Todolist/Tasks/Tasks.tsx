// @flow
import * as React from 'react'
import { useEffect, useMemo } from 'react'
import { TodolistDomain } from 'features/todolists/model/todolistsSlice'
import { TaskDomainType, fetchTasksTC, selectTasks } from 'features/todolists/model/tasksSlice'
import { Task } from 'features/todolists/ui/TodolistsList/Todolist/Tasks/Task/Task'
import List from '@mui/material/List/List'
import { TaskStatuses } from 'common/enums'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { useGetTasksQuery } from 'features/todolists/api/tasksApi'

type Props = {
  todolist: TodolistDomain
}
export const Tasks = ({ todolist }: Props) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()
  const { data } = useGetTasksQuery(todolist.id)

  //TODO: решить вопрос с подгрузкой тасков

  // useEffect(() => {
  //   dispatch(fetchTasksTC(todolist.id))
  // }, [])

  let todolistTasks = data?.items
  console.log(todolistTasks)
  // let otherTasks = [] as TaskDomainType[]

  todolistTasks = useMemo(() => {
    if (todolist.filter === 'active') {
      todolistTasks = todolistTasks?.filter((t) => t.status === TaskStatuses.New)
    }
    if (todolist.filter === 'completed') {
      todolistTasks = todolistTasks?.filter((t) => t.status === TaskStatuses.Completed)
    }
    return todolistTasks
  }, [todolistTasks, todolist.filter])

  // для того, чтобы тудулист не менял размер при фильтрации
  // otherTasks = useMemo(() => {
  //   if (todolist.filter === 'active') {
  //     otherTasks = tasks[todolist.id].filter((t) => t.status === TaskStatuses.Completed)
  //   }
  //   if (todolist.filter === 'completed') {
  //     otherTasks = tasks[todolist.id].filter((t) => t.status === TaskStatuses.New)
  //   }
  //   return otherTasks
  // }, [tasks[todolist.id], todolist.filter])

  return (
    <List>
      {todolistTasks?.length === 0 ? (
        <p>No tasks</p>
      ) : (
        todolistTasks?.map((task) => {
          return <Task key={task.id} task={task} todolist={todolist} />
        })
      )}
      {/*Для того, чтобы тудулист не менял размер при фильтрации*/}
      {/*{todolistTasks?.length === 0*/}
      {/*  ? otherTasks?.map((task) => {*/}
      {/*      return (*/}
      {/*        <div key={task.id} style={{ display: 'flex', alignItems: 'center' }}>*/}
      {/*          <p style={{ position: 'absolute' }}>No tasks</p>*/}
      {/*          <Task task={task} todolist={todolist} visibility={'hidden'} />*/}
      {/*        </div>*/}
      {/*      )*/}
      {/*    })*/}
      {/*  : otherTasks?.map((task) => {*/}
      {/*      return <Task key={task.id} task={task} todolist={todolist} visibility={'hidden'} />*/}
      {/*    })}*/}
    </List>
  )
}
