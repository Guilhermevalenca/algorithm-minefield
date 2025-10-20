package mapClassicRoute

import (
	"fmt"
	"net/http"

	generatedMap "minefield/main/app/map"

	"github.com/gin-gonic/gin"
)

var currentMap generatedMap.Map

func Routes(router *gin.RouterGroup) {
	router.GET("classic/map", getMap);

	router.POST("classic/map", generateMap);

	router.POST("classic/map/select-cell", selectCell);

	router.POST("classic/map/toggle-flag", toggleFlag);
}

func generateMap(context *gin.Context) {
	var limits generatedMap.Cell;
	fmt.Println(limits);
	if err := context.BindJSON(&limits); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		});
        return
    }
	currentMap = generatedMap.GenerateMap(limits.ROW, limits.COL);
	context.JSON(http.StatusOK, gin.H{
		"map": currentMap,
	});

	currentMap.LogMatrix();
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
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		});
		return
	}
	currentMap.SelectClassicCell(cell.ROW, cell.COL);

	context.JSON(http.StatusOK, gin.H{
		"status": currentMap.Status,
	});

	fmt.Println(currentMap.Status);

	if (currentMap.Status == generatedMap.DEFEAT || currentMap.Status == generatedMap.VICTORY) {
		currentMap.Rows = 0;
		currentMap.Cols = 0;
		currentMap.Matrix = nil;
		currentMap.Status = generatedMap.IN_PROGRESS;
	} else {
		currentMap.LogMatrix();
	}
}

func toggleFlag(context *gin.Context) {
	var cell generatedMap.Cell;

	if err := context.BindJSON(&cell); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		});
		return
	}

	currentMap.ToggleFlag(cell.ROW, cell.COL);
	context.JSON(http.StatusOK, gin.H{
		"map": nil,
	});
}
