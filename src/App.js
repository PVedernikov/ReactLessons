import React, { useState, useMemo } from 'react';
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

// PS D:\Projects\reactproject1> npm install react-transition-group --save

function App() {
    const [posts, setPosts] = useState([
        { id: 1, title: 'c Javascript 1 ааАААА', body: 'a Всем привет!!!' },
        { id: 2, title: 'a Javascript 222 ббб', body: 'b Всем привет!!!' },
        { id: 3, title: 'b Javascript 3 ВВВ', body: 'c Всем привет!!!' }
    ]);

    //const [selectedSort, setSelectedSort] = useState('');
    //const [searchQuery, setSearchQuery] = useState('');

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);

    //function getSortedPosts() {
    //    console.log('getSortedPosts DONE!');
    //    if (selectedSort) {
    //        return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]));
    //    }
    //    return posts;
    //}

    const sortedPosts = useMemo(() => {
        console.log('getSortedPosts DONE!');
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
        }
        return posts;
    }, [filter.sort, posts]); //getSortedPosts();

    const sortedAndSerachedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()));
    }, [filter.query, sortedPosts]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
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
            <PostList remove={removePost} posts={sortedAndSerachedPosts} title="Посты про JS" />

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