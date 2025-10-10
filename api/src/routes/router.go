package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"

	mapRoute "minefield/main/src/routes/map"
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

	mapRoute.Routes(api);

	return router;
}