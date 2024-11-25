// @flow
import * as React from 'react'
import { changeTodolistFilter, FilterType, TodolistDomainType } from 'features/todolists/model/todolistsSlice'
import { ButtonWithMemo } from 'components/Button/ButtonWithMemo'
import { useAppDispatch } from 'app/store'
import s from 'features/todolists/ui/TodolistsList/Todolist/FilterTasksButtons/FilterTasksButtons.module.css'

type Props = {
  todolist: TodolistDomainType
}
export const FilterTasksButtons = ({ todolist }: Props) => {
  const { id, filter, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (id: string, filter: FilterType) => {
    dispatch(changeTodolistFilter({ id, filter }))
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
