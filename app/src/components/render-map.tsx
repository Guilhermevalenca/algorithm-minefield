import { MapEntity } from "../app/entities";
import { MapStatus } from "../app/enums";
import { mapService } from "../app/services";
import { RenderElement } from "./";

type Props = {
  map: MapEntity | null;
  refresh: () => Promise<void>;
};

export function RenderMap({ map, refresh }: Props) {
  if (!map) return <div>Mapa nao encontrado</div>;
  async function updateElement(row: number, col: number) {
    if (map) {
      await mapService.selectCell(map, row, col);

      if (map.status === MapStatus.DEFEAT) {
        alert("Você perdeu");
      } else if (map.status === MapStatus.VITORY) {
        alert("você ganhou");
      } else {
        refresh();
      }
    }
  }
  return (
    <>
      <table border={1}>
        <tbody>
          {map.matrix.map((row, i) => (
            <tr key={"row-" + i}>
              {row.map((element, j) => (
                <RenderElement
                  key={"col-" + j}
                  element={element}
                  setElement={() => updateElement(i, j)}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
