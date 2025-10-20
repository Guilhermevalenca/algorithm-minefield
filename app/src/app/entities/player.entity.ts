export class PlayerEntity {
  x: number;
  y: number;
  quantity_upgrades: number;

  constructor(x: number, y: number, quantity_upgrades: number) {
    this.x = x;
    this.y = y;
    this.quantity_upgrades = quantity_upgrades;
  }
}
