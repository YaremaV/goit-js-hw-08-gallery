const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const originalSrc = galleryItems.map((item) => item.original);

const onGallery = document.querySelector('.js-gallery');
const galleryCardsMarkup = createsGalleryCards(galleryItems);
const gallerylightbox = document.querySelector('.js-lightbox');
const lightboxImageEl = document.querySelector('.lightbox__image');
const btnCloseModal = document.querySelector('button[data-action="close-lightbox"]');
const onOverlay = document.querySelector('.lightbox__overlay');


onGallery.insertAdjacentHTML('beforeend', galleryCardsMarkup);

onGallery.addEventListener('click', onGalleryClick);
btnCloseModal.addEventListener('click', closeModal);
onOverlay.addEventListener('click', closeModal);




function createsGalleryCards(galleryItems) {
   return galleryItems.map(({preview,original,description}) => {
    return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`
   })
     .join('')

};

function onGalleryClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  };
  console.log(evt.target.dataset.source);
  openModal(evt);

};

function openModal(evt) {
  window.addEventListener('keydown', onEscKeyPress);
  gallerylightbox.classList.add('is-open');
  lightboxImageEl.src = evt.target.dataset.source;
  lightboxImageEl.alt = evt.target.alt;
};

function closeModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  gallerylightbox.classList.remove('is-open');
  lightboxImageEl.removeAttribute('src', '');
  lightboxImageEl.removeAttribute('alt', '');
}

function onEscKeyPress(evt) {

  if (evt.code === 'Escape') {
    closeModal();
  }
  if (evt.code === 'ArrowRight' || evt.code === 'ArrowLeft') {
    showNextImg(evt.code === 'ArrowRight');
  }
}



const imgArr = galleryItems.map(img => img.original);

function showNextImg(direction) {
  let index;
  let currentImg = imgArr.indexOf(lightboxImageEl.src);
  index = direction ? currentImg + 1 : currentImg - 1;
  if (index < 0) {
    index = galleryItems.length + index;
  }
  if (index === galleryItems.length) {
    index = 0;
  }
  lightboxImageEl.src = imgArr[index];
}

