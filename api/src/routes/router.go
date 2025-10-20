package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"

	minefieldRoute "minefield/main/src/routes/minefield"
	mapClassicRoute "minefield/main/src/routes/minefield-classic"
)


func Routes() *gin.Engine {
	router := gin.Default();

	config := cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
        ExposeHeaders:    []string{"Content-Length"},
        AllowCredentials: false,
	}

	router.Use(cors.New(config));

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, World!",
		})
	});

	api := router.Group("/api");

	mapClassicRoute.Routes(api);
	minefieldRoute.Routes(api);

	return router;
}