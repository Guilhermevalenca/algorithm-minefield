// nome do pacote alterado de map para generatedMap porque map é uma palavra reservada em Go
package generatedMap

import (
	"fmt"
	"math/rand"
	"time"

	"minefield/main/app/element"
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

	total_mines int
}

const (
	VITORY = "Vitoria"
	DEFEAT = "Derrota"
	IN_PROGRESS = "in_progress"
)

func Example() {
	fmt.Println("IN MAP")
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
		total_mines: 0,
	};

	currentMap.addRandomMines();
	currentMap.addNumbers();

	return currentMap;
}

func (currentMap *Map) addRandomMines() {
	rand.Seed(time.Now().UnixNano())
	max := currentMap.Rows * currentMap.Cols;
	min := (currentMap.Rows + currentMap.Cols) / 4;

	quantity_mines := rand.Intn(max + min);

	if(quantity_mines < 3) {
		quantity_mines = 3;
	}

	for i, row := range currentMap.Matrix {
		for j, elementChild := range row {
			if(elementChild.IsEmpty()) {
				if(rand.Float64() < 0.2 && quantity_mines > 0) {
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


func (currentMap *Map) LogMatrix() {
	for i, row := range currentMap.Matrix {
		message := "";
		for j, elementChild := range row {
			if (elementChild.IsMine()) {
				message = message + "X ";
			} else if(elementChild.IsNumber()) {
				message = message + fmt.Sprintf("%d ", elementChild.Value);
			} else {
				message = message + "_ ";
			}
			message += fmt.Sprintf("[row: %d, col: %d, revealed: %t]", i, j, elementChild.IsRevealed);
			message += " ";
		}
		fmt.Println(message);
	}
}

func (currentMap *Map) SelectCell(row int, col int) {
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
					currentMap.SelectCell(i, j);
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
		currentMap.Status = VITORY;
	} else if(elementsRevealed > currentMap.Rows * currentMap.Cols - currentMap.total_mines) {
		currentMap.Status = DEFEAT;
	}
}