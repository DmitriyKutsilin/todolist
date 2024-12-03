import { createTheme } from '@mui/material'
import { ThemeMode } from 'app/appSlice'

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#1976d2',
      },
    },
    typography: {
      fontFamily: ['Roboto'].join(','),
    },
  })
}
