// @flow
import * as React from 'react'
import { memo } from 'react'
import { TodolistDomainType } from 'features/todolists/model/todolistsSlice'
import { createTaskTC } from 'features/todolists/model/tasksSlice'
import { TodolistTitle } from 'features/todolists/ui/TodolistsList/Todolist/TodolistTitle/TodolistTitle'
import { Tasks } from 'features/todolists/ui/TodolistsList/Todolist/Tasks/Tasks'
import { FilterTasksButtons } from 'features/todolists/ui/TodolistsList/Todolist/FilterTasksButtons/FilterTasksButtons'
import { useAppDispatch } from 'app/store'
import { AddItemForm } from 'common/components'

type TodolistProps = {
  todolist: TodolistDomainType
}
export const Todolist = memo(({ todolist }: TodolistProps) => {
  const dispatch = useAppDispatch()

  const addTaskCallback = (title: string) => {
    dispatch(createTaskTC(todolist.id, title))
  }

  return (
    <div className={'todolist'}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} label={'New task'} disabled={todolist.entityStatus === 'loading'} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})