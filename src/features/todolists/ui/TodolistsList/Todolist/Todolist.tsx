// @flow
import * as React from 'react'
import { memo } from 'react'
import { TodolistDomain } from 'features/todolists/model/todolistsSlice'
import { createTaskTC } from 'features/todolists/model/tasksSlice'
import { TodolistTitle } from 'features/todolists/ui/TodolistsList/Todolist/TodolistTitle/TodolistTitle'
import { Tasks } from 'features/todolists/ui/TodolistsList/Todolist/Tasks/Tasks'
import { FilterTasksButtons } from 'features/todolists/ui/TodolistsList/Todolist/FilterTasksButtons/FilterTasksButtons'
import { AddItemForm } from 'common/components'
import { useAppDispatch } from 'common/hooks'
import { useCreateTaskMutation } from 'features/todolists/api/tasksApi'

type TodolistProps = {
  todolist: TodolistDomain
}
export const Todolist = memo(({ todolist }: TodolistProps) => {
  const dispatch = useAppDispatch()

  const [createTask] = useCreateTaskMutation()

  const addTaskCallback = (title: string) => {
    // dispatch(createTaskTC(todolist.id, title))
    createTask({ todolistId: todolist.id, title })
  }

  return (
    <div className={'todolist'}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} label={'Add task'} disabled={todolist.entityStatus === 'loading'} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})
