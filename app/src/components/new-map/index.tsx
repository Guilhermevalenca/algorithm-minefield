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
function EnergyBar({ player }) {
  const total_energy:number = player?.quantity_upgrades ?? 0;
  const max_energy:number = 5;
  const percent:number = (total_energy/max_energy)*100

  return (
    <div style={{
      width: "200px",
      height: "16px",
      background: "#ddd",
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: "#1A2E46",
          transition: "width .3s"
        }}
      />
    </div>
  )
}
