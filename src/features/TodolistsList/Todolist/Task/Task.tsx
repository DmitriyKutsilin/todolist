import React, { ChangeEvent, memo } from 'react'
import Checkbox from '@mui/material/Checkbox/Checkbox'
import { EditableSpan } from 'components/EditableSpan/EditableSpan'
import IconButton from '@mui/material/IconButton/IconButton'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ListItem from '@mui/material/ListItem/ListItem'
import { TaskStatuses } from 'api/todolist-api'
import { TaskDomainType } from 'features/TodolistsList/tasksSlice'

type TaskPropsType = {
  task: TaskDomainType
  todolistId: string
  removeTask: (todolistId: string, taskId: string) => void
  changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
  updateTask: (todolistId: string, taskId: string, title: string) => void
}

export const Task = memo(({ task, todolistId, removeTask, changeTaskStatus, updateTask }: TaskPropsType) => {
  console.log('task')
  const removeTaskHandler = () => {
    removeTask(todolistId, task.id)
  }

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isDone = e.currentTarget.checked
    changeTaskStatus(todolistId, task.id, isDone ? TaskStatuses.Completed : TaskStatuses.New)
  }

  const updateTaskHandler = (title: string) => {
    updateTask(todolistId, task.id, title)
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
        <Checkbox
          size="medium"
          checked={task.status === TaskStatuses.Completed}
          onChange={onChangeStatusHandler}
          disabled={task.entityStatus === 'loading'}
        />
        <EditableSpan
          value={task.title}
          onChange={updateTaskHandler}
          disabled={task.entityStatus === 'loading'}
        ></EditableSpan>
      </div>
      <IconButton size="medium" color="default" onClick={removeTaskHandler} disabled={task.entityStatus === 'loading'}>
        <RemoveCircleOutlineIcon fontSize="inherit" />
      </IconButton>
    </ListItem>
  )
})
