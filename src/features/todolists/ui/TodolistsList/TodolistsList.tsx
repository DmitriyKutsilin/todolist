import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from 'app/store'
import { fetchTodolistsTC, TodolistDomain } from 'features/todolists/model/todolistsSlice'
import Paper from '@mui/material/Paper'
import { Todolist } from 'features/todolists/ui/TodolistsList/Todolist/Todolist'
import s from 'features/todolists/ui/TodolistsList/TodolistsList.module.css'

export const TodolistsList: React.FC = () => {
  const todolists = useSelector<AppRootStateType, TodolistDomain[]>((state) => state.todolists)
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
