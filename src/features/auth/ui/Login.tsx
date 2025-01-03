import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
// import { loginTC, selectIsLoggedIn } from 'features/auth/model/authSlice'
import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'common/hooks'
import { selectIsLoggedIn, setIsLoggedIn } from 'app/appSlice'
import { useLoginMutation } from 'features/auth/api/authApi'
import { ResultCode } from 'common/enums'

type ErrorsType = {
  email?: string
  password?: string
}

const validate = (values: any) => {
  const errors: ErrorsType = {}
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.password) {
    errors.password = 'Required'
  } else if (values.password.length < 4) {
    errors.password = 'Password should be at least 6 characters'
  }

  return errors
}

export const Login = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [login, { data }] = useLoginMutation()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate,
    onSubmit: (values) => {
      //TODO: посмотреть нужно ли диспатчить appStatus и посмотреть, когда ресетать форму

      // dispatch(loginTC(values))
      login(values)
        .then((res) => {
          if (res.data?.resultCode === ResultCode.SUCCESS) {
            dispatch(setIsLoggedIn({ isLoggedIn: true }))
            localStorage.setItem('sn-token', res.data.data.token)
          }
        })
        .then(() => {
          // formik.resetForm()
        })
    },
  })

  if (isLoggedIn) {
    return <Navigate to="/" />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered&nbsp;
                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                error={!!formik.errors.email && formik.touched.email}
                helperText={formik.touched.email ? formik.errors.email : null}
                {...formik.getFieldProps('email')}
              />
              <TextField
                type="password"
                label="Password"
                margin="normal"
                error={!!formik.errors.password && formik.touched.password}
                helperText={formik.touched.password ? formik.errors.password : null}
                {...formik.getFieldProps('password')}
              />
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox name="rememberMe" onChange={formik.handleChange} checked={formik.values.rememberMe} />
                }
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
