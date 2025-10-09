package mapRoute

import (
	"fmt"
	"net/http"

	generatedMap "minefield/main/app/map"

	"github.com/gin-gonic/gin"
)

var currentMap generatedMap.Map

func Routes(router *gin.RouterGroup) {
	router.GET("/map", getMap)

	router.POST("/map", generateMap);

	router.POST("select-cell", selectCell);

	router.POST("toggle-flag", toggleFlag);
}

func generateMap(context *gin.Context) {
	var limits generatedMap.Cell;
	if err := context.BindJSON(&limits); err != nil {
        return
    }
	currentMap = generatedMap.GenerateMap(limits.ROW, limits.COL);
	context.JSON(http.StatusOK, gin.H{
		"map": currentMap,
	});
}

func getMap(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"map": currentMap,
	});

	currentMap.LogMatrix();
}

func selectCell(context *gin.Context) {
	var cell generatedMap.Cell;
	if err := context.BindJSON(&cell); err != nil {
		return
	}
	currentMap.SelectCell(cell.ROW, cell.COL);
	currentMap.VerifyStatus();

	context.JSON(http.StatusOK, gin.H{
		"map": currentMap,
	});

	currentMap.LogMatrix();
	fmt.Println(currentMap.Status);
}

func toggleFlag(context *gin.Context) {
	var cell generatedMap.Cell;

	if err := context.BindJSON(&cell); err != nil {
		return
	}

	currentMap.ToggleFlag(cell.ROW, cell.COL);
	context.JSON(http.StatusOK, gin.H{
		"map": currentMap,
	});
}
