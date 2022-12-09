import '/src/sass/index.scss';
import Notiflix from 'notiflix';
import { fetchPtoto } from '/src/fetchPhoto';
import { photoTemplate } from '/src/card';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    loadmoreBtn: document.querySelector('.load-more'),
    divMore: document.querySelector('.div-more'),
    pEnd: document.querySelector('.end_of_colection'),
    infoImg: document.querySelector('.info-img'),
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
  refs.infoImg.innerHTML = "";
    fetchPtoto(searchQuery, page, per_page).then(render).catch(error);
};


export function render(data) {
   if (data.hits.length === 0) return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
     if (data.totalHits <= per_page * page) {
       refs.loadmoreBtn.classList.add('is-hidden');
       refs.divMore.classList.add('is-hidden');
       refs.pEnd.classList.remove('is-hidden');
        return;
    };      
  const photosTemplate = data.hits.map(card => photoTemplate(card));
  
  refs.infoImg.insertAdjacentHTML('beforeend', `Total images:  ${data.totalHits}`);
  refs.infoImg.classList.remove('is-hidden');
  refs.gallery.insertAdjacentHTML('beforeend', photosTemplate.join(''));
  refs.loadmoreBtn.classList.remove('is-hidden');
  refs.divMore.classList.remove('is-hidden');

  const lightbox = new SimpleLightbox('.simplelightbox', {
        captionDelay: '250',
  });
  lightbox.refresh();
}


function loadMore() {    
    page += 1;
    fetchPtoto(searchQuery, page, per_page).then(render);
};
function error() {
    return Notiflix.Notify.failure('Sorry we cant load pictures. Try again!');
}
