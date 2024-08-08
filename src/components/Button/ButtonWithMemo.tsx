// @flow
import * as React from 'react';
import Button, {ButtonProps} from '@mui/material/Button/Button';
import { memo } from 'react';

type ButtonWithMemoPropsType = ButtonProps & {}
export const ButtonWithMemo = memo(({...props}: ButtonWithMemoPropsType) => {
    return (
        <Button {...props}>{props.children}</Button>
    );
});