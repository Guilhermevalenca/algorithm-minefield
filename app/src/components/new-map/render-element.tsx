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
  // let imagePath = "";
  let message = "";

  switch (element.type) {
    case ElementType.EMPTY:
      // imagePath = "";
      message = "_";
      break;
    case ElementType.NUMBER:
      // imagePath = "";
      message = element.value.toString();
      break;
    case ElementType.MINE:
      // imagePath = "";
      message = "*";
      break;
    default:
    // imagePath = "";
  }

  if (!element.is_revealed) {
    message = ":)";
  }

  if (is_player) {
    message = "👤";
    if (player_quantity_upgrades && player_quantity_upgrades > 0) {
      message = "👤!";
    }
  }

  return (
    <td onClick={setElement}>
      {/* <img
        src={imagePath}
        alt="Icone do elemento no campo minado"
        width="30"
        height="30"
      /> */}
      {element.is_flag && !element.is_revealed ? "🚩" : message}
    </td>
  );
}
