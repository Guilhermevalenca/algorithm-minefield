import { ElementType } from "../enums";

export class ElementEntity {
  type: ElementType;
  is_revealed: boolean;
  is_flag: boolean;
  value: number;

  constructor(
    type: ElementType,
    is_revealed: boolean,
    is_flag: boolean,
    value: number
  ) {
    if (type < 0 || type > 2) {
      throw new Error("Tipo de elemento invalido");
    }
    if (value < 0 || value > 8) {
      throw new Error("Valor de elemento invalido");
    }
    this.type = type;
    this.is_revealed = is_revealed;
    this.is_flag = is_flag;
    this.value = value;
  }
}
