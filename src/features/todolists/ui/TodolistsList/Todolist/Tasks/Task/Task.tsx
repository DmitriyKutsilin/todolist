import React, { ChangeEvent, memo } from 'react'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import IconButton from '@mui/material/IconButton/IconButton'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ListItem from '@mui/material/ListItem/ListItem'
import { deleteTaskTC, TaskDomainType, updateTaskTC } from 'features/todolists/model/tasksSlice'
import { TodolistDomain } from 'features/todolists/model/todolistsSlice'
import s from 'features/todolists/ui/TodolistsList/Todolist/Tasks/Task/Task.module.css'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/enums'
import { useAppDispatch } from 'common/hooks'

type TaskPropsType = {
  task: TaskDomainType
  todolist: TodolistDomain
}

export const Task = memo(({ task, todolist }: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(deleteTaskTC(todolist.id, task.id))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(updateTaskTC(todolist.id, task.id, { status }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC(todolist.id, task.id, { title }))
  }

  return (
    <ListItem
      sx={{
        p: 0,
        justifyContent: 'space-between',
        opacity: task.status === TaskStatuses.Completed ? 0.5 : 1,
      }}
    >
      <div className={s.checkboxTitleContainer}>
        <Checkbox
          size="medium"
          checked={task.status === TaskStatuses.Completed}
          onChange={changeTaskStatusHandler}
          disabled={task.entityStatus === 'loading'}
        />
        <EditableSpan
          value={task.title}
          onChange={changeTaskTitleHandler}
          disabled={task.entityStatus === 'loading'}
        ></EditableSpan>
      </div>
      <IconButton size="medium" color="default" onClick={removeTaskHandler} disabled={task.entityStatus === 'loading'}>
        <RemoveCircleOutlineIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
})
