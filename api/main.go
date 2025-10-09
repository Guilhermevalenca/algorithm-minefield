package main

import (
	"fmt"

	"minefield/main/src/routes"
)

type Person struct {
	Name string;
}

func main() {
	fmt.Println("Hello, World! - IN MAIN")

	router := routes.Routes();
	fmt.Println("Started Server!");
	router.Run("localhost:8000");
}