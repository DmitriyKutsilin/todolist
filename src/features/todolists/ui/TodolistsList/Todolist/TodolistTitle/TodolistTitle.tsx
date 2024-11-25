// @flow
import * as React from 'react'
import { deleteTodolistTC, TodolistDomainType, updateTodolistTC } from 'features/todolists/model/todolistsSlice'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useAppDispatch } from 'app/store'
import s from 'features/todolists/ui/TodolistsList/Todolist/TodolistTitle/TodolistTitle.module.css'

type Props = {
  todolist: TodolistDomainType
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
