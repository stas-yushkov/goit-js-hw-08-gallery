import galleryItems from './app.js';
// console.log('🚀 ~  galleryItems', galleryItems);

const galleryRef = document.querySelector('.js-gallery');
// console.log('🚀 ~  galleryRef', galleryRef);
const lightboxRef = document.querySelector('.js-lightbox');
// console.log('🚀 ~ lightboxRef', lightboxRef);
const lightbox__imageRef = document.querySelector('.lightbox__image');
// console.log('🚀 ~ lightbox__imageRef', lightbox__imageRef);
const closeLightboxBtn = document.querySelector(
  'button[data-action="close-lightbox"]',
);
// console.log('🚀 ~ closeLightboxBtn ', closeLightboxBtn );

// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
const galleryItemsMarkup = galleryItems
  .map(({ preview, original, description }, index) => {
    //
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
      data-index="${index}"
      alt="${description}"
    />
  </a>
</li>
`;
  })
  .join('');
// callbackfn: (value: { preview: string; original: string; description: string; }, index: number, array: { preview: string; original: string; description: string; }[]) => any, thisArg?: any): any[]
// console.log('🚀 ~  galleryItemsMarkup', galleryItemsMarkup);

galleryRef.insertAdjacentHTML('beforeend', galleryItemsMarkup);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
galleryRef.addEventListener('click', onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();
  // console.log(e.currentTarget);
  // console.log(e.target.dataset.index);
  const originalImgSrc = e.target.dataset.source;
  // console.log(originalImgSrc);

  // Открытие модального окна по клику на элементе галереи.
  lightboxRef.classList.add('is-open');

  // Подмена значения атрибута src элемента img.lightbox__image.
  lightbox__imageRef.src = originalImgSrc;

  // Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
  closeLightboxBtn.addEventListener('click', onCloseBtnClick);
}

function onCloseBtnClick() {
  lightboxRef.classList.remove('is-open');
  closeLightboxBtn.removeEventListener('click', onCloseBtnClick);

  // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  lightbox__imageRef.src = '';
}

// Закрытие модального окна по клику на div.lightbox__overlay.
// Закрытие модального окна по нажатию клавиши ESC.
// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
