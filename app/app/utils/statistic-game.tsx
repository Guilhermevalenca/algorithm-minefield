import { MapStatus } from "../enums";
import { swal } from "../plugins/";

export async function statisticGame(
  status: MapStatus,
  path_taken: number,
  playning_time: number,
  time_type: "Segundos" | "Minutos",
  bombs_revealed: number,
  total_mines: number,
  quantity_upgrades: number
) {
  const html = (
    <div className="statistics-panel">
      <p>
        Tempo: {playning_time.toFixed(2)} {time_type}
      </p>
      <p>Blocos percorridos: {path_taken}</p>
      <p>Bombas reveladas: {bombs_revealed}</p>
      <p>Quantidade total de bombas: {total_mines}</p>
      <p>Quanto de energia ainda resta: {quantity_upgrades}</p>
    </div>
  );
  let title = "Que pena, você perdeu 😓";
  if (status === MapStatus.DEFEAT) {
    title = "Que pena, você perdeu 😓";
  } else {
    title = "Parabéns,você venceu 🎉";
  }
  return swal.fire({
    title,
    html,
    confirmButtonText: "Jogar de novo",
    allowEscapeKey: false,
    allowOutsideClick: false,
    animation: true,
  });
}
