// @flow
import * as React from 'react'
import { memo } from 'react'
import Button, { ButtonProps } from '@mui/material/Button/Button'

type ButtonWithMemoPropsType = ButtonProps & {}
export const ButtonWithMemo = memo(({ ...props }: ButtonWithMemoPropsType) => {
  return <Button {...props}>{props.children}</Button>
})
