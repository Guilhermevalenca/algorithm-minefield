import { MapEntity, PlayerEntity } from "@app/entities";
import { RenderElement } from "../render-element";
import "./index.css";

type Props = {
  map: MapEntity | null;
  player: PlayerEntity | null;
  nextMove: (row: number, col: number) => Promise<void>;
};

export function RenderMap({ map, player, nextMove }: Props) {
  if (!map) return <div>Mapa nao encontrado</div>;

  console.log(player?.quantity_upgrades);

  return (
    <>
    <div className="player-status"> Quantidade de energia: { player?.quantity_upgrades }</div>
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
