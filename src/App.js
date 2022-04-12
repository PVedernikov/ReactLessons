import React, { useState, useMemo } from 'react';
import { useRef } from 'react';
import Counter from "./components/Counter"
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import "./styles/App.css";
import MySelect from './components/UI/select/MySelect';
import MyInput from './components/UI/input/MyInput';
import Card from './components/Poker/Card/Card';
import DealerButton from './components/Poker/DealerButton/DealerButton';

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'c Javascript 1 ааАААА', body: 'a Всем привет!!!' },
        { id: 2, title: 'a Javascript 222 ббб', body: 'b Всем привет!!!' },
        { id: 3, title: 'b Javascript 3 ВВВ', body: 'c Всем привет!!!' }
    ]);

    const [selectedSort, setSelectedSort] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    //function getSortedPosts() {
    //    console.log('getSortedPosts DONE!');
    //    if (selectedSort) {
    //        return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    //    }
    //    return posts;
    //}

    const sortedPosts = useMemo(() => {
        console.log('getSortedPosts DONE!');
        if (selectedSort) {
            return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
        }
        return posts;
    }, [selectedSort, posts]); //getSortedPosts();

    const sortedAndSerachedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [searchQuery, sortedPosts]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }
    const sortPosts = (sort) => {
        setSelectedSort(sort);
        //setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    return (
        <div className="App">
            <PostForm create={createPost} />
            <hr style={{ margin: '15px 0' }} />
            <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
            />
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue="Сортировка по"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                ]}
            />
            {sortedAndSerachedPosts.length > 0
                ? <PostList remove={removePost} posts={sortedAndSerachedPosts} title="Посты про JS" />
                : <h1 style={{ textAlign: 'center' }}>Посты не найдены!</h1>
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