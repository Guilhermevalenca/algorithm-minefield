package main

import (
	"fmt"

	generatedMap "minefield/main/app/map"
)

type Person struct {
	Name string;
}

func main() {
	fmt.Println("Hello, World! - IN MAIN")
	generatedMap.Example();

	currentMap := generatedMap.GenerateMap(20, 40);
	currentMap.LogMatrix();
	
}