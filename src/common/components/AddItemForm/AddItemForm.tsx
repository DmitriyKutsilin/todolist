// @flow
import * as React from 'react'
import { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import IconButton from '@mui/material/IconButton/IconButton'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import TextField from '@mui/material/TextField/TextField'

export type AddItemFormPropsType = {
  addItem: (title: string) => void
  label?: string
  disabled?: boolean
}
export const AddItemForm = memo(({ addItem, label, disabled }: AddItemFormPropsType) => {
  const [title, setTitle] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

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
    <div style={{ display: 'flex', alignItems: 'start', flexWrap: 'nowrap' }}>
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
        disabled={disabled}
        fullWidth
      />
      <IconButton size="medium" color="primary" onClick={addItemHandler} disabled={disabled}>
        <AddCircleRoundedIcon fontSize="medium" />
      </IconButton>
    </div>
  )
})
