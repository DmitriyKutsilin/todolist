import { instance } from 'common/instance'
import { BaseResponse } from 'common/types'
import { LoginArgs, UserAuthResponse } from './authApi.types'
import { baseApi } from 'app/baseApi'
import { BaseQueryArg } from '@reduxjs/toolkit/query'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<BaseResponse<UserAuthResponse>, void>({
      query: () => 'auth/me',
    }),
    login: builder.mutation<BaseResponse<{ userId: number; token: string }>, LoginArgs>({
      query: (args) => ({
        method: 'POST',
        url: 'auth/login',
        body: args,
      }),
    }),
    logout: builder.mutation<BaseResponse, void>({
      query: () => ({
        method: 'DELETE',
        url: 'auth/login',
      }),
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi

export const _authApi = {
  login(payload: LoginArgs) {
    return instance.post<BaseResponse<{ userId: number; token: string }>>('auth/login', payload)
  },
  logout() {
    return instance.delete<BaseResponse>('auth/login')
  },
  me() {
    return instance.get<BaseResponse<UserAuthResponse>>('auth/me')
  },
}
