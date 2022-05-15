import React, { useState, useMemo, useEffect } from 'react';
import "./styles/App.css";
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/UI/Navbar/Navbar';
import AppRouter from './components/AppRouter';

// PS D:\Projects\reactproject1> npm install react-transition-group --save
// PS D:\Projects\reactproject1> npm i axios

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    );
}

export default App;