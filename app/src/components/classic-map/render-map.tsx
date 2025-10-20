import { MapEntity } from "../../app/entities";
import { RenderElement } from "./render-element";

type Props = {
  map: MapEntity | null;
  updateElement: (row: number, col: number) => Promise<void>;
};

export function RenderMap({ map, updateElement }: Props) {
  if (!map) return <div>Mapa nao encontrado</div>;

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
