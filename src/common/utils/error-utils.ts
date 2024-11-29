import { Dispatch } from 'redux'
import { setAppError, setAppStatus } from 'app/appSlice'
import { BaseResponse } from 'common/types'

export const handleServerNetworkError = (dispatch: Dispatch, error: { message: string }) => {
  dispatch(setAppError({ error: error.message }))
  dispatch(setAppStatus({ status: 'failed' }))
}

export const handleServerAppError = <T>(dispatch: Dispatch, data: BaseResponse<T>) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: 'Unknown error...' }))
  }
  dispatch(setAppStatus({ status: 'failed' }))
}
