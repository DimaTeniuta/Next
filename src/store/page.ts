import { makeAutoObservable } from 'mobx';

class Page {
  page = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setPage(value: number) {
    this.page = value;
  }

  increasePage() {
    this.page += 1;
  }

  decreasePage() {
    this.page -= 1;
  }
}

const pageStore = new Page();

export default pageStore;
