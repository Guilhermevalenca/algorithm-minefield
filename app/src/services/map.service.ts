import type { AxiosInstance } from "axios";
import { MapEntity } from "../entities";
import { Service } from "./default.service";

export class MapService extends Service {
  constructor(axios: AxiosInstance) {
    super(axios);
  }
  async getMap(): Promise<MapEntity> {
    return new MapEntity();
  }
}
