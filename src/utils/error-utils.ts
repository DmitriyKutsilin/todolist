import { Dispatch } from 'redux'
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from '../app/app-reducer'
import { ResponseType } from '../api/todolist-api'

type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: { message: string }) => {
  dispatch(setAppErrorAC(error.message))
  dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError = <T>(dispatch: ErrorUtilsDispatchType, data: ResponseType<T>) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]))
  } else {
    dispatch(setAppErrorAC('Unknown error...'))
  }
  dispatch(setAppStatusAC('failed'))
}
