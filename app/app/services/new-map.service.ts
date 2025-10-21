import type { AxiosInstance } from "axios";
import { Service } from "./default.service";
import { MapEntity, PlayerEntity } from "../entities";

export class NewMapService extends Service {
  constructor(axios: AxiosInstance) {
    super(axios);
  }
  async generateMap(
    row: number,
    col: number
  ): Promise<{
    map: MapEntity;
    player: PlayerEntity;
  } | null> {
    try {
      const { data } = await this.axios.post("generate-map", {
        row,
        col,
      });
      if (data.map.rows <= 0 || data.map.cols <= 0) {
        return null;
      }
      const map = new MapEntity(
        data.map.matrix,
        data.map.rows,
        data.map.cols,
        data.map.status
      );
      const player = new PlayerEntity(
        data.player.x,
        data.player.y,
        data.player.quantity_upgrades
      );
      return { map, player };
    } catch (error) {
      console.log("[ERROR NewMapService]", error);
      return null;
    }
  }

  async nextMove(row: number, col: number) {
    const { data } = await this.axios.post("next-move", {
      row,
      col,
    });
    return {
      status: data.status,
    };
  }

  async getData() {
    try {
      const { data } = await this.axios.get("get-data");
      const map = new MapEntity(
        data.map.matrix,
        data.map.rows,
        data.map.cols,
        data.map.status
      );
      const player = new PlayerEntity(
        data.player.x,
        data.player.y,
        data.player.quantity_upgrades
      );
      return { map, player };
    } catch (error) {
      console.log("[ERROR NewMapService]", error);
      return null;
    }
  }

  async getStatistic() {
    const { data } = await this.axios.get("get-statistic");
    return {
      status: data.status,
      quantity_upgrades: data.quantity_upgrades,
      total_mines: data.total_mines,
      bombs_revealed: data.bombs_revealed,
      playning_time: data.playning_time,
      time_type: data.time_type,
      path_taken: data.path_taken ?? [],
    };
  }
}
