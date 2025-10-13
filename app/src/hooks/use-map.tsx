import { useCallback, useEffect, useState } from "react";
import { mapService } from "../app/services";
import type { MapEntity } from "../app/entities";
import { MapStatus } from "../app/enums";

export function useMap(): {
  map: MapEntity | null;
  refresh: () => Promise<void>;
  updateElement: (row: number, col: number) => Promise<void>;
} {
  const [map, setMap] = useState<MapEntity | null>(null);

  const fetch = useCallback(async () => {
    const map = await mapService.getMap();
    setMap(map);
  }, []);

  const updateElement = async (row: number, col: number) => {
    if (!map || map.matrix[row][col] === undefined) {
      throw new Error("Elemento invalido, fora do escopo do mapa");
    }
    const { status } = await mapService.selectCell(row, col);

    if (status === MapStatus.DEFEAT) {
      alert("Você perdeu");
    } else if (status === MapStatus.VITORY) {
      alert("você ganhou");
    }
    fetch();
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    map,
    refresh: fetch,
    updateElement,
  };
}
