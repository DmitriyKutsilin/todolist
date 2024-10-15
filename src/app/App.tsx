import React, {useEffect} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import Button from '@mui/material/Button/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container/Container';
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {useAppDispatch, useAppSelector} from "./store";
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Outlet} from "react-router-dom";
import {logoutTC, meTC} from "../features/Login/auth-reducer";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';


//TODO: позиционирование прогрессбара
function App() {
    const dispatch = useAppDispatch()
    const status = useAppSelector<string>(state => state.app.status)
    const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(meTC())
    }, []);

    const logout = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    {isLoggedIn && <Button color="inherit" onClick={logout}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Outlet/>
            </Container>

        </div>
    );
}

export default App;
