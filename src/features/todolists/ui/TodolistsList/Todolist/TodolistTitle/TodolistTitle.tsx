// @flow
import * as React from 'react'
import { deleteTodolistTC, TodolistDomain, updateTodolistTC } from 'features/todolists/model/todolistsSlice'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import s from 'features/todolists/ui/TodolistsList/Todolist/TodolistTitle/TodolistTitle.module.css'
import { EditableSpan } from 'common/components'
import { useAppDispatch } from 'common/hooks'

type Props = {
  todolist: TodolistDomain
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const updateTodolistHandler = (title: string) => {
    dispatch(updateTodolistTC(id, title))
  }

  const removeTodolistHandler = () => {
    dispatch(deleteTodolistTC(id))
  }

  return (
    <div className={s.titleContainer}>
      <EditableSpan
        className={s.header}
        value={title}
        onChange={updateTodolistHandler}
        disabled={entityStatus === 'loading'}
      />
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
        <DeleteForeverIcon />
      </IconButton>
    </div>
  )
}
