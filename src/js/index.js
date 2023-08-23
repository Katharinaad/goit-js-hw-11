import { searchImg } from './serviceImages';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix, { Notify } from 'notiflix';

let page;
let pagesAmount;

//elements
const form = document.querySelector('#search-form');
const input = form.elements[0];
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

//add event listener to the button and to the form
form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onBtnLoadMoreClick);

//SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 200,
});

//function while submitting the form
async function onFormSubmit(event) {
  event.preventDefault();
  hideBtn();

  page = 1;
  const searchQuery = form.elements.searchQuery.value;
  console.log(searchQuery);
  if (!searchQuery) {
    Notiflix.Notify.info('Please, enter a query to search');
    cleanGallery();
    return;
  }
  try {
    const data = await searchImg(page, searchQuery);
    const pictures = data.hits;
    pagesAmount = Math.ceil(data.totalHits / 40);
    if (pictures.length === 0) {
      nothingFound();
    }
    if (pagesAmount > 1) {
      makeBtnVisible();
    }
    const galleryMarkup = createMarkup(pictures);
    gallery.innerHTML = galleryMarkup;

    page += 1;
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Oops! Something went wrong!');
  }
}
//-----------------------------

async function onBtnLoadMoreClick() {
  try {
    let searchQuery = input.value.trim();
    if (!searchQuery || !page) {
      return;
    }
    if (page > pagesAmount) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
      hideBtn();
    } else {
      const data = await searchImg(page, searchQuery);
      const pictures = data.hits;
      page += 1;
      const galleryMarkup = createMarkup(pictures);
      gallery.insertAdjacentHTML('beforeend', galleryMarkup);
    }
  } catch (error) {
    console.log(error);
  }
}

function createMarkup(pictures) {
  return pictures
    .map(picture => {
      return `<div class="photo-card">
      <a class="photo-card__link" href=${picture.largeImageURL}>
      <img src=${picture.webformatURL} alt="${picture.tags}" loading="lazy" />
      </a><div class="info"><p class="info-item"><b>Likes</b> ${picture.likes}</p>
      <p class="info-item"><b>Views</b> ${picture.views}</p><p class="info-item">
      <b>Comments</b> ${picture.comments}</p><p class="info-item">
      <b>Downloads</b> ${picture.downloads}</p>
      </div></div>`;
    })
    .join('');
}

function cleanGallery() {
  gallery.innerHTML = '';
}

function nothingFound() {
  cleanGallery();
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
  page = 1;
  hideBtn();
}

// Functions for "Load More Btn"
function makeBtnVisible() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideBtn() {
  if (!loadMoreBtn.classList.contains('is-hidden')) {
    loadMoreBtn.classList.add('is-hidden');
  }
}
