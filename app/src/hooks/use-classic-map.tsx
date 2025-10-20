import { useCallback, useEffect, useState } from "react";
import { classicMapService } from "@app/services";
import type { MapEntity } from "@app/entities";
import { MapStatus } from "@app/enums";

export function useClassicMap(): {
  map: MapEntity | null;
  refresh: () => Promise<void>;
  updateElement: (row: number, col: number) => Promise<void>;
} {
  const [map, setMap] = useState<MapEntity | null>(null);

  const fetch = useCallback(async () => {
    const map = await classicMapService.getClassicMap();
    setMap(map);
  }, []);

  const updateElement = async (row: number, col: number) => {
    if (!map || map.matrix[row][col] === undefined) {
      throw new Error("Elemento invalido, fora do escopo do mapa");
    }
    const { status } = await classicMapService.selectClassicCell(row, col);

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
