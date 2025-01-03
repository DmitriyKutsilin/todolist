import { AppInitialState, appReducer, setAppError, setAppStatus } from 'app/appSlice'

let startState: AppInitialState

beforeEach(() => {
  startState = {
    themeMode: 'light',
    error: null,
    status: 'idle',
    // isInitialized: false,
    isLoggedIn: false,
  }
})

test('correct error message should be set', () => {
  const endState = appReducer(startState, setAppError({ error: 'some error' }))
  expect(endState.error).toBe('some error')
})

test('correct status should be set', () => {
  const endState = appReducer(startState, setAppStatus({ status: 'loading' }))
  expect(endState.status).toBe('loading')
})
