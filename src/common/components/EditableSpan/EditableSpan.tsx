// @flow
import TextField from '@mui/material/TextField/TextField'
import * as React from 'react'
import { ChangeEvent, FocusEvent, KeyboardEvent, memo, useEffect, useState } from 'react'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

type Props = {
  value: string
  onChange: (title: string) => void
  className?: string
  disabled?: boolean
  multiline?: boolean
  sx?: SxProps<Theme>
}
export const EditableSpan = memo(({ value, onChange, className, disabled, sx, multiline }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState(value)
  const [emptyTitleError, setEmptyTitleError] = useState(false)

  //для того, чтобы при изменении значения value при переходе режимов не проскакивало предыдущее состояние
  useEffect(() => {
    setEditMode(false)
  }, [value])

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmptyTitleError(false)
    if (e.currentTarget.value !== '\n') {
      setEmptyTitleError(false)
      //регулярка или трим, чтобы убрать переносы, которые могут случайно добавиться при нажатии на enter
      setTitle(e.currentTarget.value.replace(/\n/g, ''))
      // setTitle(e.currentTarget.value)
    } else {
      setEmptyTitleError(true)
    }
  }

  const activateEditMode = () => {
    setEditMode(true)
    setTitle(value)
  }

  const deactivateEditMode = () => {
    //удаление лишних пробелов внутри строки и по бокам
    const trimmedTitle = title.replace(/\s+/g, ' ').trim()
    if (trimmedTitle) {
      onChange(trimmedTitle)
      if (trimmedTitle === value) {
        setEditMode(false)
      }
    } else {
      onChange(trimmedTitle)
      setTitle('')
      setEmptyTitleError(true)
    }
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      deactivateEditMode()
    }
  }

  const onFocusHandler = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    //перенос курсора в конец строки
    e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
  }

  return (
    <>
      {editMode ? (
        <TextField
          sx={{
            '& .MuiInputBase-inputMultiline': {
              // чтобы размер поля не менялся относительно размера спана
              fieldSizing: 'content',
            },
            '& .MuiInputBase-root': {
              // паддинг должен быть как у спана, чтобы текст не сдвигался относительно спана
              padding: '4px 0',
              lineHeight: 1.5,
            },
            '& .Mui-error': {
              '& ::placeholder': {
                // color: 'red',
              },
            },
            ...sx,
          }}
          variant="standard"
          value={title}
          onFocus={onFocusHandler}
          onBlur={deactivateEditMode}
          onChange={changeTitleHandler}
          onKeyDown={onKeyDownHandler}
          error={emptyTitleError}
          placeholder={'Title is required'}
          autoFocus
          multiline={true}
          fullWidth={true}
        />
      ) : (
        <span className={className} style={disabled ? { opacity: 0.5 } : {}} onDoubleClick={activateEditMode}>
          {value}
        </span>
      )}
    </>
  )
})
