import { MapStatus } from "../enums";
import { swal } from "../plugins/";

export function statisticGame(
  status: MapStatus,
  path_taken: number,
  playning_time: number,
  bombs_revealed: number,
  total_mines: number,
  quantity_upgrades: number
) {
  const html = (
    <>
      <p>Tempo: {playning_time} segundos</p>
      <p>blocos percorrido: {path_taken}</p>
      <p>Bombas reveladas: {bombs_revealed}</p>
      <p>Quantidade total de bombas: {total_mines}</p>
      <p>Quanto de energia ainda resta: {quantity_upgrades}</p>
    </>
  );
  if (status === MapStatus.DEFEAT) {
    swal.fire({
      title: "Que pena, você perdeu 😓",
      html,
      confirmButtonText:'Tentar novamente',
      
    });
    return;
  }
  swal.fire({
    title: "Parabéns,você venceu 🎉",
    html,
    confirmButtonText:'Jogar de novo',
})
  });
}
