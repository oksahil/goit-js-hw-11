import axios from 'axios';

const url = 'https://pixabay.com/api/?key=23804711-e5db832661be90b16b7b53877';

export async function fetchPtoto(searchQuery, page, per_page) {
    return await axios.get(
        `${url}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`)
        .then(resp => resp.data);
};