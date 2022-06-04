import { getPageCount, getPagesArray } from "../utils/pages";
import React, { useEffect, useRef, useState } from 'react';
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
//import { getPageCount } from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Loader from "../components/UI/Loader/Loader";
//import Pagination from "../components/UI/pagination/Pagination";
//import { useObserver } from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";
import { useObserver } from "../hooks/useObserver";

// PS D:\Projects\reactproject1> npm install react-transition-group --save
// PS D:\Projects\reactproject1> npm i axios

function Posts() {
    const [posts, setPosts] = useState([]);

    //const [selectedSort, setSelectedSort] = useState('');
    //const [searchQuery, setSearchQuery] = useState('');

    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();
    //const observer = useRef();

    let pagesArray = getPagesArray(totalPages);

    //const pagesArray = useMemo(() => {
    //    return getPagesArray(totalPages);
    //}, [totalPages]);

    //const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page); // axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];

        setTotalPages(getPageCount(totalCount, limit));
    });

    //useEffect(() => {
    //    var options = {
    //        root: document.querySelector('#scrollArea'),
    //        rootMargin: '0px',
    //        threshold: 1.0
    //    }
    //    var callback = function (entries, observer) {
    //        /* Content excerpted, show below */
    //    };
    //    var observer = new IntersectionObserver(callback, options);
    //}, []);

    //// отслеживание видимости элемента в окне браузера
    //useEffect(() => {
    //    // номер страницы page замыкается внутри callback, чтобы этого не произошло передаем isPostsLoading ниже в массив зависимостей 1*
    //    // но тогда новые обзерверы будут создаваться каждый раз при изменении isPostsLoading и будет хаос
    //    // поэтому старые обзерверы отключаем

    //    if (isPostsLoading) return; // обзервер создается только когда загрузка закончилась
    //    if (observer.current) observer.current.disconnect(); // старые обзерверы отключаем
    //    var callback = function (entries, observer) {
    //        // callback отрабатывает и когда элемент становится видимым и когда пропадает из зоны видимости, поэтому нужна проверка
    //        if (entries[0].isIntersecting && page < totalPages) {
    //            console.log(page);
    //            setPage(page + 1);
    //        }
    //    };
    //    observer.current = new IntersectionObserver(callback);
    //    observer.current.observe(lastElement.current);
    //}, [isPostsLoading]); // <--- 1* сюда
    // ↑ переехало в хук useObserver

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts();

        //return () => {
        //    // this will work on unmount
        //};
    }, [page, limit]); // if empty [] - will work once on mount

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    }

    //async function fetchPosts() {
    //    setIsPostsLoading(true);
    //    setTimeout(async () => {
    //        const posts = await PostService.getAll(); // axios.get('https://jsonplaceholder.typicode.com/posts');
    //        setPosts(posts);
    //        setIsPostsLoading(false);
    //    }, 10000);
    //}

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }
    //const sortPosts = (sort) => {
    //    setSelectedSort(sort);
    //    //setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    //}

    const changePage = (page) => {
        setPage(page);
    }

    return (
        <div className="App">
            {/*<button onClick={fetchPosts}>GET POSTS</button>*/}
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
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
            <MySelect value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Количество элементов на странице"
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'все'},
                ]}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS" />
            <div ref={lastElement} style={{height: 20, background: 'red'}} />
            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
            }
            <div className="page__wrapper">
                {pagesArray.map(p =>
                    <span
                        onClick={() => changePage(p)}
                        key={p}
                        className={page === p ? 'page page__current' : 'page'}
                    >
                        {p}
                    </span>
                )}
            </div>
            {/*<Card value='A' suit='H' />*/}
            {/*<Card value='K' suit='S' />*/}
            {/*<Card value='8' suit='C' />*/}
            {/*<Card value='10' suit='S' />*/}
            {/*<Card value='J' suit='D' />*/}
            {/*<Card value='Q' suit='H' />*/}
            {/*<Card value='L' suit='G ' />*/}
            {/*<DealerButton />*/}
        </div>
    );
}

export default Posts;