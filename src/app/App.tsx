import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import Button from '@mui/material/Button/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container/Container';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {useAppSelector} from "./store";
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';

//TODO: позиционирование прогрессбара
function App() {
    const status = useAppSelector<string>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    );
}

export default App;
