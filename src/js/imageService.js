import axios from 'axios';
import { Notifications } from './notifications';

const notify = new Notifications();
const API_KEY = '36520606-060969aebd0c1b7cacd2194c3';
const URL = `https://pixabay.com/api/`;

export class ImageService {
  currentPage = 1;
  searchQuery = '';
  total = 0;

  constructor(perPage = 20) {
    this.perPage = perPage;
  }

  async fetchImages() {
    const params = {
      key: API_KEY,
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: false,
      per_page: this.perPage,
      page: this.currentPage,
    };
    try {
      const { data: { hits = [], totalHits = 0 } } = await axios.get(URL, { params });
      this.total = totalHits;
      this.incrementPage();
      return hits;
    } catch (error) {
      console.log('Error', error.message);
      notify.showFailureMessage(error.message);
    }
  }

  incrementPage() {
    this.currentPage += 1;
  }

  resetPage() {
    this.currentPage = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
