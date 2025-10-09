// nome do pacote alterado de map para generatedMap porque map é uma palavra reservada em Go
package generatedMap

import (
	"fmt"
	"math/rand"
	"time"

	"minefield/main/app/element"
)

type Map struct {
	Matrix [][]element.Element `json:"matrix"`;
	Rows int `json:"rows"`;
	Cols int `json:"cols"`;
}

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
	};

	currentMap.addRandomMines();
	currentMap.addNumbers();

	return currentMap;
}

func (m *Map) addRandomMines() {
	rand.Seed(time.Now().UnixNano())
	max := rand.Intn(m.Rows * m.Cols);

	if(max <= 0) {
		max = 1;
	}
	quantity_mines := rand.Intn(max + 1);

	if(quantity_mines < 3) {
		quantity_mines = 3;
	}

	for i, row := range m.Matrix {
		for j, elementChild := range row {
			if(elementChild.IsEmpty()) {
				if(rand.Float64() < 0.2 && quantity_mines > 0) {
					m.Matrix[i][j].Type = element.MINE;
					quantity_mines--;
				}
			}
		}
	}
}

func (m *Map) addNumbers() {
	for i := 0; i < m.Rows; i++ {
		for j := 0; j < m.Cols; j++ {
			if(m.Matrix[i][j].IsMine()) {
				m.defineNumber(i, j);
			}
		}
	}
}


func (m *Map) defineNumber(row int, col int) {
	for i := row - 1; i <= row + 1; i++ {
		for j := col - 1; j <= col + 1; j++ {
			if(i >= 0 && i < m.Rows && j >= 0 && j < m.Cols) {
				if(!m.Matrix[i][j].IsMine()) {
					m.Matrix[i][j].Type = element.NUMBER;
					m.Matrix[i][j].Value = m.Matrix[i][j].Value + 1;
				}
			}
		}
	}
}


func (m *Map) LogMatrix() {
	for _, row := range m.Matrix {
		message := "";
		for _, elementChild := range row {
			if (elementChild.IsMine()) {
				message = message + "X ";
			} else if(elementChild.IsNumber()) {
				message = message + fmt.Sprintf("%d ", elementChild.Value);
			} else {
				message = message + "_ ";
			}
		}
		fmt.Println(message);
	}
}