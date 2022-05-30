import React, { useState, useMemo, useEffect } from 'react';
import "./styles/App.css";
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';

// PS D:\Projects\reactproject1> npm install react-transition-group --save
// PS D:\Projects\reactproject1> npm i axios

function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true);
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isLoading
        }}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;