import { MapStatus } from "../enums";
import { ElementEntity } from "./";

export class MapEntity {
  matrix: ElementEntity[][];
  rows: number;
  cols: number;
  status: MapStatus;

  constructor(
    matrix: ElementEntity[][],
    rows: number,
    cols: number,
    status: MapStatus
  ) {
    if (matrix && matrix.length === 0) {
      throw new Error("Mapa nao encontrado");
    }
    if (!(rows > 0 && cols > 0)) {
      throw new Error("Mapa invalido");
    }
    this.matrix = matrix.map((row) =>
      row.map(
        (element) =>
          new ElementEntity(
            element.type,
            element.is_revealed,
            element.is_flag,
            element.value,
            element.is_force_field
          )
      )
    );
    this.rows = rows;
    this.cols = cols;
    this.status = status;
  }
}
