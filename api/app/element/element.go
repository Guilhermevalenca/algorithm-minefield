package element

import (
	"errors"
)

type Element struct {
	Type int `json:"type"`
	IsRevealed bool `json:"is_revealed"`
	IsFlag bool `json:"is_flag"`
	Value int `json:"value"`
	IsForceField bool `json:"is_force_field"`
}

const (
	EMPTY = 0
	NUMBER = 1
	MINE = 2
)

func NewElement(t int) (Element, error) {
	if(isValid(t)) {
		return Element{}, errors.New("Invalid type");
	}
	response := Element{
		Type: t,
		IsRevealed: false,
		IsFlag: false,
		Value: 0,
		IsForceField: false,
	}
	return response, nil;
}

func isValid(t int) bool {
	switch t {
    case EMPTY, NUMBER, MINE:
        return true
    default:
        return false
    }
}

func (e Element) IsMine() bool {
	return e.Type == MINE;
}

func (e Element) IsEmpty() bool	 {
	return e.Type == EMPTY;
}
func (e Element) IsNumber() bool {
	return e.Type == NUMBER;
}
