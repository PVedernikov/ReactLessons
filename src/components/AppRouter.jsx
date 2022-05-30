import React, { Component, useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';
import PostIdPage from '../pages/PostIdPage';
import { publicRoutes, privateRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const { isAuth, isLoading } = useContext(AuthContext);
    console.log(isAuth);


    if (isLoading) {
        return <Loader />
    }

    return (
        isAuth
            ? <Routes>
                {/*<Route path="/about" element={<About />} />*/}
                {/*<Route path="/posts" element={<Posts />} />*/}
                {/*<Route path="/posts/:id" element={<PostIdPage />} />*/}
                {/*<Route path="/" element={<Navigate replace to="/posts" />} />*/}
                {/*<Route path="*" element={<Error />} />*/}
                {privateRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                        exact={route.exact}
                    />
                    //<Route
                    //    path={route.path}
                    //    element={<Component name={route.component} />}
                    //    exact={route.exact}
                    ///>
                )}
                <Route path="*" element={<Navigate replace to="/posts" />} />
                {/*<Route path="/" element={<Navigate replace to="/posts" />} />*/}
                {/*<Route path="*" element={<Error />} />*/}
            </Routes>
            : <Routes>
                {publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.component}
                        exact={route.exact}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/login" />} />
                {/*<Route path="/" element={<Navigate replace to="/login" />} />*/}
                {/*<Route path="*" element={<Error />} />*/}
            </Routes>
    );
};

export default AppRouter;