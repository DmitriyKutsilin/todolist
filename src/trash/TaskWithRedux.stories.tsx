import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { TaskWithRedux } from './TaskWithRedux'
import { ReduxStoreProviderDecorator } from '../stories/ReduxStoreProviderDecorator'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../app/store'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses, TaskType } from '../api/todolist-api'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'TODOLIST/TaskWithRedux',
  component: TaskWithRedux,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
} satisfies Meta<typeof TaskWithRedux>

export default meta
type Story = StoryObj<typeof TaskWithRedux>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
const Task = () => {
  let task = useSelector<AppRootStateType, TaskType>((state) => state.tasks['todolistId1'][0])

  if (!task)
    task = {
      id: v1(),
      title: 'DEFAULT TASK',
      status: TaskStatuses.New,
      description: '',
      priority: TaskPriorities.Low,
      startDate: '',
      deadline: '',
      todoListId: 'todolistId1',
      order: 0,
      addedDate: '',
    }

  return <TaskWithRedux task={task} todolistId={'todolistId1'} />
}

export const TaskWithReduxStory: Story = {
  render: () => <Task />,
}
