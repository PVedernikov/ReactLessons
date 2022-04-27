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

// PS D:\Projects\reactproject1> npm install react-transition-group --save
// PS D:\Projects\reactproject1> npm i axios

function App() {
    const [posts, setPosts] = useState([]);

    //const [selectedSort, setSelectedSort] = useState('');
    //const [searchQuery, setSearchQuery] = useState('');

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSerachedPosts = usePosts(posts, filter.sort, filter.query);
    const [isPostsLoading, setIsPostsLoading] = useState(false);

    useEffect(() => {
        fetchPosts();

        //return () => {
        //    // this will work on unmount
        //};
    }, []); // if empty [] - will work once on mount

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    async function fetchPosts() {
        setIsPostsLoading(true);
        setTimeout(async () => {
            const posts = await PostService.getAll(); // axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(posts);
            setIsPostsLoading(false);
        }, 1000);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }
    //const sortPosts = (sort) => {
    //    setSelectedSort(sort);
    //    //setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    //}

    return (
        <div className="App">
            {/*<button onClick={fetchPosts}>GET POSTS</button>*/}
            <MyButton style={{ marginTop: 30}} onClick={() => setModal(true)}>
                Создать
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {isPostsLoading
                ? <h1>Загрузка...</h1>
                : <PostList remove={removePost} posts={sortedAndSerachedPosts} title="Посты про JS" />
            }
            

            <Card value='A' suit='H' />
            <Card value='K' suit='S' />
            <Card value='8' suit='C' />
            <Card value='10' suit='S' />
            <Card value='J' suit='D' />
            <Card value='Q' suit='H' />
            <Card value='L' suit='G ' />
            <DealerButton />
        </div>
    );
}

export default App;