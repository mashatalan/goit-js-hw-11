import { Notifications } from './notifications';
import { refs } from './refs';
import { ImageService } from './imageService';
import { generateMarkup } from './markup';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const notify = new Notifications();
const perPage = 40;
const imageService = new ImageService(perPage);
const { searchForm, input, gallery } = refs;
const optionsObserver = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};
const lightbox = new SimpleLightbox('.gallery a', {});

const observer = new IntersectionObserver(callback, optionsObserver);

searchForm.addEventListener('submit', onFormSubmit);

function callback(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const lastElement = entry.target;
      if (lastElement === gallery.lastElementChild) {
        loadMore();
      }
    }
  });
}

async function onFormSubmit(event) {
  event.preventDefault();

  if (!input.value) {
    return notify.showFailureMessage('PLease type something to search'); // show error message
  }

  gallery.innerHTML = ''; // clean up old results
  imageService.resetPage();  // set current page to 1
  imageService.query = input.value; // set query value from the input
  await loadImagesList(); // load images & generate markup

  notify.showSuccessMessage(`Hooray! We found ${imageService.total} images.`); // Show the results count
  searchForm.reset(); // reset form
}

async function loadImagesList() {
  const images = await imageService.fetchImages(); // get images from server

  const markup = generateMarkup(images); // generate markup
  gallery.insertAdjacentHTML('beforeend', markup); // append html
  observer.observe(gallery.lastElementChild); // set observer target
  lightbox.refresh();

  scroll();
}

async function loadMore() {
  if (imageService.total <= imageService.perPage * imageService.currentPage) { // check if there is something to load
    notify.showWarningMessage('No more images');
    return null;
  }

  await loadImagesList(); // load images
}

function scroll() {

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
