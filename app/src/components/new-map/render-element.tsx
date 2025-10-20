import type { ElementEntity } from "@app/entities";
import { ElementType } from "@app/enums";

type Props = {
  element: ElementEntity;
  is_player: boolean;
  setElement: () => void;
  player_quantity_upgrades?: number | undefined;
};

export function RenderElement({
  element,
  is_player,
  setElement,
  player_quantity_upgrades,
}: Props) {
  let imagePath = "";
  let message = "";

  switch (element.type) {
    case ElementType.EMPTY:
      imagePath = "/public/images/default-floor.png";
      break;
    case ElementType.NUMBER:
      for(let i=1; i<9; i++){
        if(element.value == i){
          imagePath = `/public/images/floor-${i}.png`
        }
      }
      break;
    case ElementType.MINE:
      imagePath = "/public/images/explode-floor.gif";
      break;
    default:
    imagePath = "/public/images/default-floor.png";
  }

  if (!element.is_revealed) {
    imagePath = "/public/images/default-floor.png"
  }

  if (is_player) {
    message = "👤";
    if (player_quantity_upgrades && player_quantity_upgrades > 0) {
      message = "👤!";
    }
  }

  return (
    <td onClick={setElement}>
      { <img
        src={imagePath}
        alt="Icone do elemento no campo minado"
        width="30"
        height="30"
      />}
      {element.is_flag && !element.is_revealed ? "🚩" : message}
    </td>
  );
}
