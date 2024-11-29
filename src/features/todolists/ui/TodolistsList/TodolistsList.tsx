import React, { useEffect } from 'react'
import { fetchTodolistsTC, selectTodolists } from 'features/todolists/model/todolistsSlice'
import Paper from '@mui/material/Paper'
import { Todolist } from 'features/todolists/ui/TodolistsList/Todolist/Todolist'
import s from 'features/todolists/ui/TodolistsList/TodolistsList.module.css'
import { useAppDispatch, useAppSelector } from 'common/hooks'

export const TodolistsList: React.FC = () => {
  const todolists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Paper key={tl.id} elevation={3} className={s.paper}>
            <Todolist todolist={tl} />
          </Paper>
        )
      })}
    </>
  )
}
