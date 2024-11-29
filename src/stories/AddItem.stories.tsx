import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { AddItemForm, AddItemFormPropsType } from 'common/components/AddItemForm/AddItemForm'
import * as React from 'react'
import { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import TextField from '@mui/material/TextField/TextField'
import IconButton from '@mui/material/IconButton/IconButton'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    addItem: {
      description: 'Button clicked inside form',
      // action: 'clicked'
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    addItem: fn(),
  },
} satisfies Meta<typeof AddItemForm>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {
  args: {
    label: 'Add',
  },
}

const AddItemFormError = memo(({ addItem, label }: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>('Title is required')

  const changeItemTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const addItemHandler = () => {
    if (title.trim()) {
      addItem(title.trim())
    } else {
      setError('Title is required!')
    }
    setTitle('')
  }

  const addItemOnKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error) {
      setError(null)
    }
    if (e.key === 'Enter') {
      addItemHandler()
    }
  }

  return (
    <div>
      <TextField
        size="small"
        error={!!error}
        helperText={error}
        id="outlined"
        variant="outlined"
        label={label}
        value={title}
        onChange={changeItemTitleHandler}
        onKeyDown={addItemOnKeyDownHandler}
      />
      <IconButton size="medium" color="primary" onClick={addItemHandler}>
        <AddCircleOutline fontSize="medium" />
      </IconButton>
    </div>
  )
})

export const AddItemFormErrorStory: Story = {
  render: (args) => <AddItemFormError addItem={args.addItem} label={'Error'} />,
}
