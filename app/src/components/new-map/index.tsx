import { useState } from "react";
import { useNewMap } from "../../hooks";
import { CreateMap } from "./create-map";
import { RenderMap } from "./render-map";

export function NewMap() {
  const { map, player, refresh, nextMove } = useNewMap();
  const [showForm, setShowForm] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  async function startGame() {
    refresh();
    setIsPlaying(true);
    setShowForm(false);
  }

  async function newGame() {
    setShowForm(true);
    setIsPlaying(false);
  }

  return (
    <>
      <button onClick={() => newGame()}>
        {!isPlaying ? "Iniciar Jogo" : "Reiniciar"}
      </button>
      {showForm && <CreateMap getMap={() => startGame()} />}
      {map && isPlaying && (
        <RenderMap map={map} player={player} nextMove={nextMove} />
      )}
    </>
  );
}
