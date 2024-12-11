import { createTheme } from '@mui/material'
import { ThemeMode } from 'app/appSlice'

export const getTheme = (themeMode: ThemeMode) => {
  return createTheme({
    palette: {
      mode: themeMode,
      ...(themeMode === 'light'
        ? {
            primary: { main: '#1976d2' },
            error: { main: '#d32f2f' },
            text: { primary: '#333333' },
            action: { active: 'rgba(0,0,0, 0.54)' },
          }
        : {
            primary: { main: '#42a5f5' },
            error: { main: '#ef5350' },
            text: { primary: '#f2f1ef' },
            action: { active: 'rgba(201,201,201,0.8)' },
          }),
      // primary: {
      //   main: themeMode === 'light' ? '#1976d2' : '#42a5f5',
      // },
      // error: {
      //   main: themeMode === 'light' ? '#d32f2f' : '#c62828',
      // },
      // text: {
      //   primary: themeMode === 'light' ? '#333333' : '#f2f1ef',
      // },
      // action: {
      //   active: themeMode === 'dark' ? '#f2f1ef' : 'rgba(0,0,0, 0.54)',
      // },
    },
    typography: {
      fontFamily: ['Roboto'].join(','),
    },
  })
}
