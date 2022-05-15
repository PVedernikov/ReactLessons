import React, { useState, useMemo, useEffect } from 'react';
import { useRef } from 'react';
import Counter from "./components/Counter"
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostFilter from './components/PostFilter';
import "./styles/App.css";
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';
import MyModal from './components/UI/MyModal/MyModal';
import Card from './components/Poker/Card/Card';
import DealerButton from './components/Poker/DealerButton/DealerButton';
import MyButton from './components/UI/button/MyButton';
import { usePosts } from './hooks/usePosts';
import axios from 'axios';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';
import { getPageCount, getPagesArray } from "./utils/pages";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Posts from './pages/Posts';

// PS D:\Projects\reactproject1> npm install react-transition-group --save
// PS D:\Projects\reactproject1> npm i axios

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/posts" element={<Posts />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;