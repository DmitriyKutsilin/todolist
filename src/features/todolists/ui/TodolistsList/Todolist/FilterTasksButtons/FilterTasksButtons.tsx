// @flow
import * as React from 'react'
import { changeTodolistFilter, FilterType, TodolistDomain } from 'features/todolists/model/todolistsSlice'
import s from 'features/todolists/ui/TodolistsList/Todolist/FilterTasksButtons/FilterTasksButtons.module.css'
import { ButtonWithMemo } from 'common/components'
import { useAppDispatch } from 'common/hooks'
import { todolistsApi } from 'features/todolists/api/todolistsApi'

type Props = {
  todolist: TodolistDomain
}
export const FilterTasksButtons = ({ todolist }: Props) => {
  const { id, filter, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (id: string, filter: FilterType) => {
    // dispatch(changeTodolistFilter({ id, filter }))

    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      }),
    )
  }

  return (
    <div className={s.buttonsContainer}>
      <ButtonWithMemo
        size="small"
        variant={filter === 'all' ? 'outlined' : 'text'}
        color="primary"
        onClick={() => changeFilterTasksHandler(id, 'all')}
        disabled={entityStatus === 'loading'}
      >
        All
      </ButtonWithMemo>
      <ButtonWithMemo
        size="small"
        variant={filter === 'active' ? 'outlined' : 'text'}
        color={'error'}
        onClick={() => changeFilterTasksHandler(id, 'active')}
        disabled={entityStatus === 'loading'}
      >
        Active
      </ButtonWithMemo>
      <ButtonWithMemo
        size="small"
        variant={filter === 'completed' ? 'outlined' : 'text'}
        color={'success'}
        onClick={() => changeFilterTasksHandler(id, 'completed')}
        disabled={entityStatus === 'loading'}
      >
        Completed
      </ButtonWithMemo>
    </div>
  )
}
