import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { AppRootStateType, useAppDispatch } from 'app/store'
import { createTodolistTC, fetchTodolistsTC, TodolistDomainType } from 'features/todolists/model/todolistsSlice'
import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import Paper from '@mui/material/Paper'
import { Todolist } from 'features/todolists/ui/TodolistsList/Todolist/Todolist'
import s from 'features/todolists/ui/TodolistsList/TodolistsList.module.css'

export const TodolistsList: React.FC = () => {
  const todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists)
  const dispatch = useAppDispatch()

  useEffect(() => {
    // if (!isLoggedIn) {
    //   return
    // }
    dispatch(fetchTodolistsTC())
  }, [])

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolistTC(title))
    },
    [dispatch],
  )

  return (
    <>
      <div className={s.addItemForm}>
        <AddItemForm addItem={addTodolist} label={'New todolist'} />
      </div>

      <div className={s.container}>
        {todolists.map((tl) => {
          return (
            <Paper key={tl.id} elevation={3} className={s.paper}>
              <Todolist todolist={tl} />
            </Paper>
          )
        })}
      </div>
    </>
  )
}
