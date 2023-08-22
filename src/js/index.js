const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const input = formEl.elements[0];

let page;
let pagesAmount;

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit() {}

//function which makes the markup
const renderImages = data => {
  const markup = data.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a class="photo-link" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
        <p class="info-item">
        <b>Likes</b>${likes}
        </p>
        <p class="info-item">
         <b>Views</b>${views}
        </p>
        <p class="info-item">
        <b>Comments</b>${comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>${downloads}
        </p>
    </div>
    </a></div>`;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
};
