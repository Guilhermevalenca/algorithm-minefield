import { useCallback, useEffect, useState } from "react";
import type { MapEntity, PlayerEntity } from "@app/entities";
import { newMapService } from "@app/services";
import { MapStatus } from "@app/enums";
import { statisticGame } from "@app/utils";

export function useNewMap() {
  const [map, setMap] = useState<MapEntity | null>(null);
  const [player, setPlayer] = useState<PlayerEntity | null>(null);

  const fetch = useCallback(async () => {
    const data = await newMapService.getData();
    if (data !== null) {
      setMap(data.map);
      setPlayer(data.player);
    } else {
      setMap(null);
      setPlayer(null);
    }
  }, []);

  const nextMove = async (row: number, col: number) => {
    if (!map || map.matrix[row][col] === undefined) {
      throw new Error("Elemento invalido, fora do escopo do mapa");
    }
    const { status } = await newMapService.nextMove(row, col);
    console.log(status);
    if (status === MapStatus.DEFEAT || status === MapStatus.VITORY) {
      const data = await newMapService.getStatistic();
      statisticGame(
        data.status,
        data.path_taken.length,
        data.playning_time,
        data.bombs_revealed,
        data.total_mines,
        data.quantity_upgrades
      );
    }
    fetch();
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    map,
    player,
    refresh: fetch,
    nextMove,
  };
}
