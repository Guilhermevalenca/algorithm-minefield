import { useEffect, useState } from "react";
import { mapService } from "../app/services";
import type { MapEntity } from "../app/entities";

export function useFetchMap(): {
  map: MapEntity | null;
  refresh: () => Promise<void>;
} {
  const [map, setMap] = useState<MapEntity | null>(null);

  async function fetch() {
    const map = await mapService.getMap();
    setMap(map);
  }

  useEffect(() => {
    fetch();
  }, []);

  return {
    map,
    refresh: fetch,
  };
}
