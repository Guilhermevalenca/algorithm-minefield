import { MapEntity, PlayerEntity } from "@app/entities";
import { RenderElement } from "../render-element";
import "./index.css";

type Props = {
  map: MapEntity | null;
  player: PlayerEntity | null;
  nextMove: (row: number, col: number) => Promise<void>;
};
function EnergyBar({ player }) {
  const total_energy:number = player?.quantity_upgrades ?? 0;
  const max_energy:number = 5;
  const percent:number = (total_energy/max_energy)*100

  return (
    <div className="progress-bar-container">
      <img
      className="progress-bar-icon"
      src="/public/images/energy.png"
      width={35}
      height={35}
      style={{
        marginLeft: "auto"
      }}
      />
      <div style={{
      display: "flex",
      width: "150px",
      height: "16px",
      background: "#ddd",
      borderRadius: "8px",
      overflow: "hidden"
    }}>
      <div
        style={{
          width: `${percent}%`,
          height: "100%",
          background: "#fff200",
          transition: "width .3s"
        }}
      />
    </div>
    </div>
  )
}

export function RenderMap({ map, player, nextMove }: Props) {
  if (!map) return <div>Mapa nao encontrado</div>;

  console.log(player?.quantity_upgrades);

  return (
    <>
    <EnergyBar player = {player} />
      <table>
        <tbody className="grid">
          {map.matrix.map((row, i) => (
            <tr key={"row-" + i} className="row">
              {row.map((element, j) => (
                <RenderElement
                  key={"col-" + j}
                  element={element}
                  is_player={Boolean(
                    player && player.x === i && player.y === j
                  )}
                  player_quantity_upgrades={player?.quantity_upgrades || 0}
                  setElement={() => nextMove(i, j)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
