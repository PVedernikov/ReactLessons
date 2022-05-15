import React from 'react';
import MyButton from './UI/button/MyButton';
import { useNavigate } from 'react-router-dom'
/*
In react-router-dom v6 useHistory() is replaced by useNavigate().

You can use:

import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/home');

 */

const PostItem = (props) => {
    const navigate = useNavigate();

    return (
        <div className="post">
            <div className="post__content">
                {/* <strong>{props.post.id} {props.post.title}</strong>*/}
                <strong>{props.post.id} {props.number} {props.post.title}</strong>
                <div>{props.post.body}</div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>
                    Открыть
                </MyButton>
                <MyButton onClick={() => props.remove(props.post)}>
                    Удалить
                </MyButton>
            </div>
        </div>
    );
}

export default PostItem;