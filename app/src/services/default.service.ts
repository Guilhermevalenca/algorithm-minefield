import type { AxiosInstance } from "axios";

export abstract class Service {
  #axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.#axios = axios;
  }

  protected get axios(): AxiosInstance {
    return this.#axios;
  }
}
