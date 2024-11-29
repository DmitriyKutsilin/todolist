export type UserAuthResponse = {
  id: number
  email: string
  login: string
}

export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}
