import { useNewMap } from "../../hooks";
import { CreateMap } from "./create-map";
import { RenderMap } from "./render-map";

export function NewMap() {
  const { map, player, refresh, nextMove } = useNewMap();
  return (
    <>
      <CreateMap getMap={() => refresh()} />
      {map && <RenderMap map={map} player={player} nextMove={nextMove} />}
    </>
  );
}
