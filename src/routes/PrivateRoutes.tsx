import * as React from 'react';
import {useAppSelector} from "../app/store";
import {Navigate, Outlet} from "react-router-dom";
import {PATH} from "./router";


export const PrivateRoutes = () => {
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    return isLoggedIn ? <Outlet/> : <Navigate to={PATH.LOGIN}/>
};