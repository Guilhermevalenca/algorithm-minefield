package player

type Player struct {
	X int `json:"x"`;
	Y int `json:"y"`;

	QuantityUpgrades int `json:"quantity_upgrades"`;
}


func NewPlayer(x int, y int) Player {
	return Player{
		X: x,
		Y: y,
		QuantityUpgrades: 0,
	}
}