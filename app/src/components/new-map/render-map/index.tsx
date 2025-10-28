import { MapEntity, PlayerEntity } from "@app/entities";
import { RenderElement } from "../render-element";
import "./index.css";
import React from "react";

type Props = {
  map: MapEntity | null;
  player: PlayerEntity | null;
  nextMove: (row: number, col: number) => Promise<void>;
};

type EnergyBarProps = {
  quantity_upgrades?: number;
};

export function RenderMap({ map, player, nextMove }: Props) {
  if (!map) return <div>Mapa nao encontrado</div>;

  console.log(player?.quantity_upgrades);

  return (
    <div className="map-container">
      <EnergyBar quantity_upgrades={player?.quantity_upgrades} />
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
    </div>
  );
}

const EnergyBar = React.memo(function ({ quantity_upgrades }: EnergyBarProps) {
  const total_energy: number = quantity_upgrades ?? 0;
  const max_energy: number = 5;
  const percent: number = (total_energy / max_energy) * 100;

  return (
    <div className="progress-bar-container">
      <img
        className="progress-bar-icon"
        src="/public/images/energy.png"
        width={35}
        height={35}
        style={{
          margin: "0",
        }}
      />
      <div
        style={{
          display: "flex",
          width: "16px",
          height: "150px",
          padding: "4px",
          background: "#ffffff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: `${percent}%`,
            width: "100%",
            background: "#fff200",
            transition: "height .3s",
          }}
        />
      </div>
    </div>
  );
});
