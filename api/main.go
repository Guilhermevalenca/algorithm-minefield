package main

import (
	"fmt"

	"minefield/main/src/routes"
)


func main() {
	fmt.Println("Hello, World! - IN MAIN")

	router := routes.Routes();
	fmt.Println("Started Server!");
	router.Run("0.0.0.0:8000");
}

