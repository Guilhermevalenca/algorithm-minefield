import { useClassicMap } from "../../hooks";
import { CreateMap } from "./create-map";
import { RenderMap } from "./render-map";

export function ClassicMap() {
  const { map, refresh, updateElement } = useClassicMap();

  return (
    <>
      <CreateMap getMap={() => refresh()} />
      {map && <RenderMap map={map} updateElement={updateElement} />}
    </>
  );
}
