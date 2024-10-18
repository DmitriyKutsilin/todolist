import React, { ChangeEvent, memo } from 'react'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton/IconButton'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ListItem from '@mui/material/ListItem/ListItem'
import { useAppDispatch } from 'app/store'
import { deleteTaskTC, updateTaskTC } from 'features/TodolistsList/tasks-reducer'
import { TaskStatuses, TaskType } from 'api/todolist-api'

type TaskPropsType = {
  task: TaskType
  todolistId: string
}

export const TaskWithRedux = memo(({ task, todolistId }: TaskPropsType) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(deleteTaskTC(todolistId, task.id))
  }

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isDone = e.currentTarget.checked
    dispatch(
      updateTaskTC(todolistId, task.id, isDone ? { status: TaskStatuses.Completed } : { status: TaskStatuses.New }),
    )
  }

  const updateTaskHandler = (title: string) => {
    dispatch(updateTaskTC(todolistId, task.id, { title }))
  }

  return (
    <ListItem
      sx={{
        p: 0,
        justifyContent: 'space-between',
        opacity: task.status === TaskStatuses.Completed ? 0.5 : 1,
      }}
    >
      <div className="taskCenter">
        <Checkbox size="medium" checked={task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler} />
        <EditableSpan value={task.title} onChange={updateTaskHandler}></EditableSpan>
      </div>
      <IconButton size="medium" color="default" onClick={removeTaskHandler}>
        <RemoveCircleOutlineIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
})
