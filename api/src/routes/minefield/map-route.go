package minefield

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	generatedMap "minefield/main/app/map"
	"minefield/main/app/player"
)

var currentMap generatedMap.Map
var currentPlayer player.Player
var path_taken []generatedMap.Cell = make([]generatedMap.Cell, 0)
var playning_time time.Time

func Routes(router *gin.RouterGroup) {
	router.POST("generate-map", generateMap);
	router.POST("next-move", nextMove);
	router.GET("get-data", getData);
	router.GET("get-statistic", getStatistic);
}

func generateMap(context *gin.Context) {
	var limits generatedMap.Cell;
	if err := context.BindJSON(&limits); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		});
        return
    }
	currentMap = generatedMap.GenerateMap(limits.ROW, limits.COL);
	currentPlayer = player.NewPlayer(currentMap.GetStartingLine().ROW, currentMap.GetStartingLine().COL);
	path_taken = make([]generatedMap.Cell, 0);

	playning_time = time.Now();

	context.JSON(http.StatusOK, gin.H{
		"map": currentMap,
		"player": currentPlayer,
	});
}

func nextMove(context *gin.Context) {
	var limits generatedMap.Cell;

	if err := context.BindJSON(&limits); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid request body",
		});
        return;
    }

	cell := currentMap.NextMove(&currentPlayer, limits);

	if(cell.ROW != -1 && cell.COL != -1) {
		path_taken = append(path_taken, cell);
	}

	context.JSON(http.StatusOK, gin.H{
		"status": currentMap.Status,
	});
}

func getData(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"map": currentMap,
		"player": currentPlayer,
	});

	currentMap.LogMatrix();
}

func getStatistic(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{
		"status": currentMap.Status,
		"quantity_upgrades": currentPlayer.QuantityUpgrades,
		"total_mines": currentMap.TotalMines(),
		"bombs_revealed": currentMap.BombsRevealed(),
		"path_taken": path_taken,
		"playning_time": time.Since(playning_time).Seconds(),
	});

	if(currentMap.Status == generatedMap.DEFEAT || currentMap.Status == generatedMap.VICTORY) {
		currentMap.Rows = 0;
		currentMap.Cols = 0;
		currentMap.Matrix = nil;
		currentMap.Status = generatedMap.IN_PROGRESS;
	}
}