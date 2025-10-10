import type { AxiosInstance } from "axios";
import { MapEntity } from "../entities";
import { Service } from "./";

export class MapService extends Service {
  constructor(axios: AxiosInstance) {
    super(axios);
  }
  async getMap(): Promise<MapEntity> {
    const { data } = await this.axios.get<{ map: MapEntity }>("/map");

    return new MapEntity(
      data.map.matrix,
      data.map.rows,
      data.map.cols,
      data.map.status
    );
  }

  async generateMap(row: number, col: number): Promise<MapEntity> {
    if (row <= 0 || col <= 0) {
      throw new Error("Dimensões para o mapa invalidas!");
    }
    const { data } = await this.axios.post<{ map: MapEntity }>("/map", {
      row,
      col,
    });

    console.log(data);

    return new MapEntity(
      data.map.matrix,
      data.map.rows,
      data.map.cols,
      data.map.status
    );
  }

  async selectCell(map: MapEntity, row: number, col: number) {
    if (row < 0 || col < 0 || map.matrix[row][col] === undefined) {
      throw new Error("Elemento invalido, fora do escopo do mapa");
    }
    const { data } = await this.axios.post("/select-cell", {
      row,
      col,
    });

    if (data.status) {
      map.status = data.status;
    }
  }
}
