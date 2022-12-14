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

async function valueSearch(e) {
    e.preventDefault();
    searchQuery = e.currentTarget.elements.searchQuery.value;
    if (searchQuery.trim().length === 0) return Notiflix.Notify.failure('Sorry, input some data!');

    page = 1;
  refs.gallery.innerHTML = "";
  refs.infoImg.innerHTML = "";
  try {
    const data = await fetchPtoto(searchQuery, page, per_page);
  return render(data);  } catch (error) {
    return Notiflix.Notify.failure('Sorry we cant load pictures. Try again!');
  }
};


export function render(data) {
  if (data.hits.length === 0) {
    refs.loadmoreBtn.classList.add('is-hidden');
    refs.divMore.classList.add('is-hidden');
    return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
    if (data.totalHits <= per_page * page) {
      Notiflix.Notify.failure('Were sorry, but you ve reached the end of search results.');
      refs.divMore.classList.remove('is-hidden');
      refs.loadmoreBtn.classList.remove('is-hidden');
      refs.pEnd.classList.remove('is-hidden');
      refs.loadmoreBtn.classList.add('is-hidden');
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
  refs.pEnd.classList.add('is-hidden');
}

async function loadMore() {    
    page += 1;
  const data = await fetchPtoto(searchQuery, page, per_page);
  return render(data);
};
