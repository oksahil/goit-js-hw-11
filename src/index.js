import '/src/sass/index.scss';
import Notiflix from 'notiflix';
import { fetchPtoto } from '/src/fetchPhoto';
import { photoTemplate } from '/src/card';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
    input: document.querySelector('[name="searchQuery"]'),
    list: document.querySelector('.country-list'),
    divInfo: document.querySelector('.country-info'),
    searchBtn: document.querySelector('[name="searchBtn"]'),
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    cardList: document.querySelector('.card-list'),
    loadmoreBtn: document.querySelector('.load-more'),
    divMore: document.querySelector('.div-more'),
    pEnd: document.querySelector('.end_of_colection'),
}

refs.form.addEventListener('submit', valueSearch);
refs.loadmoreBtn.addEventListener('click', loadMore);

let searchQuery = '';
let page = 1;
let per_page = 40;

function valueSearch(e) {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value;
    if (searchQuery.trim().length === 0) return Notiflix.Notify.failure('Sorry, input some data!');

    page = 1;
    refs.gallery.innerHTML = "";
    fetchPtoto(searchQuery, page, per_page).then(render).catch(error);
};


export function render(data) {
  console.log('item', data);
 if (data.hits.length === 0) return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
     if (data.totalHits <= per_page * page) {
       refs.loadmoreBtn.classList.add('is-hidden');
       refs.divMore.classList.add('is-hidden');
        refs.pEnd.classList.remove('is-hidden');
        return;
    };      
        const photosTemplate = data.hits.map(card => photoTemplate(card));
           

  refs.gallery.insertAdjacentHTML('beforeend', photosTemplate.join(''));
  
  refs.loadmoreBtn.classList.remove('is-hidden');
  refs.divMore.classList.remove('is-hidden');
    const lightbox = new SimpleLightbox('.simplelightbox', {
        captionDelay: '250',
    });
  lightbox.refresh();

    console.log(data);
    console.log(data.totalHits);
    console.log(data.totalHits <= per_page * page);

        }


function loadMore(e) {    
    page += 1;
    fetchPtoto(searchQuery, page, per_page).then(render);
};
function error(e) {
    return Notiflix.Notify.failure('Sorry we cant load pictures. Try again!');
}