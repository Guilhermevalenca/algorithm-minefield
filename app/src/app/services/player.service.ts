import type { AxiosInstance } from "axios";
import { Service } from "./";

export class PlayerService extends Service {
  constructor(axios: AxiosInstance) {
    super(axios);
  }
}
