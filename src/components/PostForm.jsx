import React, { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ title: '', body: '' });

    //const [title, setTitle] = useState('');
    //const [body, setBody] = useState('');

    /*const bodyInputRef = useRef('');*/

    const addNewPost = (e) => {
        e.preventDefault();

        const newPost = {...post, id: Date.now() };

        create(newPost);

        //setPosts([...posts, { ...post, id: Date.now() }]);
        setPost({ title: '', body: '' });
        /*console.log(title);*/
        /*console.log(bodyInputRef.current.value)*/

        //const newPost = {
        //    id: Date.now(),
        //    title,
        //    body
        //};

        //setTitle('');
        //setBody('');
    }

    return (
        <form>
            {/*Управляемый компонент*/}
            <MyInput
                value={post.title}
                onChange={e => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Название поста"
            />
            <MyInput
                value={post.body}
                onChange={e => setPost({ ...post, body: e.target.value })}
                type="text"
                placeholder="Описание поста" />
            <MyButton onClick={addNewPost}>Создать пост</MyButton>
            {/*Неуправляемый компонент*/}
            {/*<MyInput*/}
            {/*    ref={bodyInputRef}*/}
            {/*    type="text"*/}
            {/*    placeholder="Описание поста" />*/}
            {/*<MyButton onClick={ addNewPost }>Создать пост</MyButton>*/}
        </form>
    );
};

export default PostForm;