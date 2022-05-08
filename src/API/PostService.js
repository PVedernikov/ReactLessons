import axios from 'axios';

export default class PostService {
    //static async getAll() {
    //    const response = await axios.get('https://jsonplaceholder.typicode.com/111posts');
    //    return response.data;

    //    //try {
    //    //    const response = await axios.get('https://111jsonplaceholder.typicode.com/posts');
    //    //    return response.data;
    //    //} catch (e) { // не нужно, т.к. ошибка обрабатывается на уровне нашего хука useFetching
    //    //    console.log(e);
    //    //}
    //}
    static async getAll(limit = 10, page = 1) {
        //const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10&_page=2');
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        });
        return response;
    }
}