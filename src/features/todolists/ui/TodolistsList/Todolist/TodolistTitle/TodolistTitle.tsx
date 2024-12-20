// @flow
import * as React from 'react'
import { TodolistDomain } from 'features/todolists/model/todolistsSlice'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import s from 'features/todolists/ui/TodolistsList/Todolist/TodolistTitle/TodolistTitle.module.css'
import { EditableSpan } from 'common/components'
import {
  todolistsApi,
  useDeleteTodolistMutation,
  useUpdateTodolistTitleMutation,
} from 'features/todolists/api/todolistsApi'
import { useAppDispatch } from 'common/hooks'
import { RequestStatusType } from 'app/appSlice'

type Props = {
  todolist: TodolistDomain
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const [deleteTodolist] = useDeleteTodolistMutation()
  const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

  const updateTodolistHandler = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  const updateQueryDataEntityStatus = (status: RequestStatusType) => {
    dispatch(
      todolistsApi.util.updateQueryData('getTodolists', undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.entityStatus = status
        }
      }),
    )
  }

  const removeTodolistHandler = () => {
    updateQueryDataEntityStatus('loading')
    deleteTodolist(id)
      .unwrap()
      .catch(() => {
        updateQueryDataEntityStatus('failed')
      })
  }

  return (
    <div className={s.titleContainer}>
      <EditableSpan
        sx={{
          '& .MuiInputBase-input': {
            fontSize: '1.5rem',
            fontWeight: '600',
          },
        }}
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
