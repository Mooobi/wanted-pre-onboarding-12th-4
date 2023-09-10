import { URL } from '../constants/constants';

interface mockService {
  get(): Promise<Response | null>;
}

export class MockService implements mockService {
  #url;

  constructor() {
    this.#url = URL;
  }

  async get() {
    const response = await fetch(this.#url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${this.#url}`);
    }

    const data = await response.json();
    console.info(data);
    return data;
  }
}
