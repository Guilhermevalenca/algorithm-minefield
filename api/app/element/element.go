package element

import (
	"errors"
)

type Element struct {
	Type int `json:"type"`
	is_revealed bool
	is_flag bool
	Value int
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
		is_revealed: false,
		is_flag: false,
		Value: 0,
	}
	return response, nil;
}


func (e Element) IsRevealed() bool {
	return e.is_revealed;
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

func (e Element) IsFlagged() bool {
	return e.is_flag;
}

func (e Element) IsEmpty() bool	 {
	return e.Type == EMPTY;
}
func (e Element) IsNumber() bool {
	return e.Type == NUMBER;
}
