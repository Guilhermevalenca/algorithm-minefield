import type { AxiosInstance } from "axios";
import { MapEntity } from "../entities";
import { Service } from ".";

export class ClassicMapService extends Service {
  constructor(axios: AxiosInstance) {
    super(axios);
  }
  async getClassicMap(): Promise<MapEntity | null> {
    try {
      const { data } = await this.axios.get<{ map: MapEntity }>("classic/map");

      if (data.map.rows <= 0 || data.map.cols <= 0) {
        return null;
      }

      return new MapEntity(
        data.map.matrix,
        data.map.rows,
        data.map.cols,
        data.map.status
      );
    } catch (error) {
      console.log("[ERROR ClassicMapService]", error);
      return null;
    }
  }

  async generateClassicMap(row: number, col: number): Promise<MapEntity> {
    try {
      if (row <= 0 || col <= 0) {
        throw new Error("Dimensões para o mapa invalidas!");
      }
      const { data } = await this.axios.post<{ map: MapEntity }>(
        "classic/map",
        {
          row,
          col,
        }
      );

      console.log(data);

      return new MapEntity(
        data.map.matrix,
        data.map.rows,
        data.map.cols,
        data.map.status
      );
    } catch (error) {
      console.log("[ERROR ClassicMapService]", error);
      throw error;
    }
  }

  async selectClassicCell(row: number, col: number) {
    if (row < 0 || col < 0) {
      throw new Error("Elemento invalido, fora do escopo do mapa");
    }
    const { data } = await this.axios.post("classic/map/select-cell", {
      row,
      col,
    });

    return {
      status: data.status,
    };
  }
}
