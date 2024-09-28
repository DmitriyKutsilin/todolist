import React from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar/AppBar';
import Toolbar from '@mui/material/Toolbar/Toolbar';
import IconButton from '@mui/material/IconButton/IconButton';
import Button from '@mui/material/Button/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container/Container';
import {TodolistsList} from "../features/TodolistsList/TodolistsList";


function App() {

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    );
}

export default App;
