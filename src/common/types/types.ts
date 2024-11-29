export type FieldError = {
  error: string
  field: string
}
export type BaseResponse<T = {}> = {
  resultCode: number
  fieldsErrors: FieldError[]
  messages: string[]
  data: T
}
