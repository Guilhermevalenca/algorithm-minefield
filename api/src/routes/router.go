package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"

	mapRoute "minefield/main/src/routes/map"
)


func Routes() *gin.Engine {
	router := gin.Default();

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, World!",
		})
	});

	api := router.Group("/api");

	mapRoute.Routes(api);

	return router;
}