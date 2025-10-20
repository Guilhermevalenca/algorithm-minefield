// nome do pacote alterado de map para generatedMap porque map é uma palavra reservada em Go
package generatedMap

import (
	"fmt"
	"math"
	"math/rand"
	"os"
	"time"

	"minefield/main/app/element"
	"minefield/main/app/player"
)

type Cell struct {
	ROW int `json:"row"`
	COL int `json:"col"`
}

type Map struct {
	Matrix [][]element.Element `json:"matrix"`;
	Rows int `json:"rows"`;
	Cols int `json:"cols"`;
	Status string `json:"status"`

	startingLine Cell
	finishLine Cell

	total_mines int
}

const (
	VICTORY = "Vitoria"
	DEFEAT = "Derrota"
	IN_PROGRESS = "in_progress"
)

func (current *Map) GetStartingLine() Cell {
	return current.startingLine;
}

func (current *Map) GetFinishLine() Cell {
	return current.finishLine;
}

func GenerateMap(limit_row int, limit_col int) Map {
	matrix := make([][]element.Element, limit_row);

	for i := 0; i < limit_row; i++ {
		matrix[i] = make([]element.Element, limit_col);
		for j := 0; j < limit_col; j++ {
			elementChild, _ := element.NewElement(element.EMPTY);
			matrix[i][j] = elementChild;
		}
	}

	currentMap := Map {
		Matrix: matrix,
		Rows: limit_row,
		Cols: limit_col,
		Status: IN_PROGRESS,
		startingLine: Cell{},
		finishLine: Cell{},
		total_mines: 0,
	};

	currentMap.addRandomMines();
	currentMap.startingLineAndFinishLine();
	currentMap.addNumbers();
	currentMap.addEnergyElements();

	return currentMap;
}

func (currentMap *Map) addRandomMines() {
	rand.Seed(time.Now().UnixNano())
	max := currentMap.Rows * currentMap.Cols / 3;
	min := (currentMap.Rows * currentMap.Cols) / 6;

	quantity_mines := rand.Intn(max - min) + min;

	for i, row := range currentMap.Matrix {
		for j, elementChild := range row {
			if(elementChild.IsEmpty()) {
				if (rand.Intn(100) < 15 && quantity_mines > 0) {
					currentMap.Matrix[i][j].Type = element.MINE;
					quantity_mines--;
					currentMap.total_mines++;
				}
			}
		}
	}
}

func (currentMap *Map) addNumbers() {
	for i := 0; i < currentMap.Rows; i++ {
		for j := 0; j < currentMap.Cols; j++ {
			if(currentMap.Matrix[i][j].IsMine()) {
				currentMap.defineNumber(i, j);
			}
		}
	}
}


func (currentMap *Map) defineNumber(row int, col int) {
	for i := row - 1; i <= row + 1; i++ {
		for j := col - 1; j <= col + 1; j++ {
			if(i >= 0 && i < currentMap.Rows && j >= 0 && j < currentMap.Cols) {
				if(!currentMap.Matrix[i][j].IsMine()) {
					currentMap.Matrix[i][j].Type = element.NUMBER;
					currentMap.Matrix[i][j].Value = currentMap.Matrix[i][j].Value + 1;
				}
			}
		}
	}
}

func (current *Map) NextMove(player *player.Player, cell Cell) Cell {
	diferenceX := math.Abs(float64(player.X - cell.ROW));
	diferenceY := math.Abs(float64(player.Y - cell.COL));
	if(diferenceX > 2 || diferenceY > 2) {
		return Cell{ROW: -1, COL: -1};
	}
	current.Matrix[cell.ROW][cell.COL].IsRevealed = true;

	if(diferenceX == 2 || diferenceY == 2) {
		midX := (player.X + cell.ROW) / 2;
		midY := (player.Y + cell.COL) / 2;
		current.Matrix[midX][midY].IsFlag = true;
	}
	if(current.Matrix[cell.ROW][cell.COL].Type == element.MINE) {
		if(player.QuantityUpgrades == 0) {
			current.Status = DEFEAT;
			return Cell{ROW: -1, COL: -1};
		} else {
			player.QuantityUpgrades--;
		}
	}
	if(current.Matrix[cell.ROW][cell.COL].IsForceField) {
		player.QuantityUpgrades++;
	}
	player.X = cell.ROW;
	player.Y = cell.COL;
	current.Matrix[cell.ROW][cell.COL].IsFlag = false;
	return cell;
}

func (currentMap *Map) SelectClassicCell(row int, col int) {
	currentMap.Matrix[row][col].IsRevealed = true;

	switch currentMap.Matrix[row][col].Type {
		case element.MINE:
			currentMap.Status = DEFEAT;
		case element.EMPTY:
			currentMap.expandAllNearbyEmptyElements(row, col);
	}
}

func (currentMap *Map) expandAllNearbyEmptyElements(row int, col int) {
	for i := row - 1; i <= row + 1; i++ {
		for j := col - 1; j <= col + 1; j++ {
			if(i >= 0 && i < currentMap.Rows && j >= 0 && j < currentMap.Cols) {
				if(currentMap.Matrix[i][j].Type == element.EMPTY && !currentMap.Matrix[i][j].IsRevealed) {
					currentMap.SelectClassicCell(i, j);
				}
			}
		}
	}
}

func (currentMap *Map) ToggleFlag(row int, col int) {
	currentMap.Matrix[row][col].IsFlag = !currentMap.Matrix[row][col].IsFlag;
}

func (currentMap *Map) VerifyStatus() {
	elementsRevealed := 0;
	if(currentMap.Status == IN_PROGRESS) {
		for _, row := range currentMap.Matrix {
			for _, elementChild := range row {
				if(elementChild.IsRevealed) {
					elementsRevealed++;
				}
			}
		}
	}

	if(elementsRevealed == currentMap.Rows * currentMap.Cols - currentMap.total_mines) {
		currentMap.Status = VICTORY;
	} else if(elementsRevealed > currentMap.Rows * currentMap.Cols - currentMap.total_mines) {
		currentMap.Status = DEFEAT;
	}
}

func (current *Map) addEnergyElements() {
	for i := 0; i < current.Rows; i++ {
		for j := 0; j < current.Cols; j++ {
			if(current.Matrix[i][j].Type == element.EMPTY || current.Matrix[i][j].Type == element.NUMBER) {
				if(rand.Intn(100) < 10) {
					current.Matrix[i][j].IsForceField = true;
				}
			}
		}
	}
}

func (current *Map) startingLineAndFinishLine() {
	current.generateStartingLine();
	current.generateFinishLine();
	current.createTheWay();
}

func (current *Map) generateStartingLine() {
	for i := 0; i < current.Rows; i++ {
		for j := 0; j < current.Cols; j++ {
			if(current.Matrix[i][j].Type == element.EMPTY) {
				current.startingLine = Cell{ROW: i, COL: j};
				return;
			}
		}
	}
}

func (current *Map) generateFinishLine() {
	for i := current.Rows - 1; i > 0; i-- {
		for j := current.Cols - 1; j > 0; j-- {
			if(current.Matrix[i][j].Type == element.EMPTY) {
				current.finishLine = Cell{ROW: i, COL: j};
				return;
			}
		}
	}
}

func (current *Map) createTheWay() {
	i := current.startingLine.ROW;
	j := current.startingLine.COL;
	endI := current.finishLine.ROW;
	endJ := current.finishLine.COL;

	for i != endI || j != endJ {
		moves := []Cell {};
		if(endI > i) {
			moves = append(moves, Cell{ROW: i + 1, COL: j});
		}
		if(endI < i) {
			moves = append(moves, Cell{ROW: i - 1, COL: j});
		}
		if(endJ > j) {
			moves = append(moves, Cell{ROW: i, COL: j + 1});
		}
		if(endJ < j) {
			moves = append(moves, Cell{ROW: i, COL: j - 1});
		}
		newEmptyCell := moves[rand.Intn(len(moves))];
		current.Matrix[newEmptyCell.ROW][newEmptyCell.COL].Type = element.EMPTY;
		i = newEmptyCell.ROW;
		j = newEmptyCell.COL;
	}
}

func (current *Map) TotalMines() int {
	return current.total_mines;
}

func (current *Map) BombsRevealed() int {
	bombs_revealed := 0;

	for i := 0; i < current.Rows; i++ {
		for j := 0; j < current.Cols; j++ {
			if(current.Matrix[i][j].Type == element.MINE && current.Matrix[i][j].IsRevealed) {
				bombs_revealed++;
			}
		}
	}
	return bombs_revealed;
}













func (currentMap Map) LogMatrix() {
	messageArchive := "";
	for i, row := range currentMap.Matrix {
		messageLog := "";
		for j, elementChild := range row {
			currentMessage := "";
			if (elementChild.IsMine()) {
				currentMessage += "X";
			} else if(elementChild.IsNumber()) {
				currentMessage += fmt.Sprintf("%d", elementChild.Value);
			} else {
				currentMessage += "_";
			}
			row := fmt.Sprintf("%d", i);
			col := fmt.Sprintf("%d", j);
			if(i < 10) {
				row = "0" + row;
			}
			if(j < 10) {
				col = "0" + col;
			}
			messageArchive += fmt.Sprintf("%s [r: %s, c: %s, revealed: %t] ",currentMessage,  row, col, elementChild.IsRevealed);
			messageLog += fmt.Sprintf("%s ", currentMessage);
		}
		fmt.Println(messageLog);
		messageArchive += "\n";
	}
	file, err := os.Create("saida.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	// Escreve a mensagem no arquivo
	fmt.Fprintln(file, messageArchive)
}