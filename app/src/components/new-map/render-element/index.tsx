import type { ElementEntity } from "@app/entities";
import { ElementType } from "@app/enums";
import "./index.css";
import React from "react";

type Props = {
  element: ElementEntity;
  is_player: boolean;
  setElement: () => void;
  player_quantity_upgrades?: number | undefined;
};

export const RenderElement = React.memo(function ({
  element,
  is_player,
  setElement,
  player_quantity_upgrades,
}: Props) {
  let imagePath = "";

  switch (element.type) {
    case ElementType.EMPTY:
      imagePath = "/public/images/default-floor.png";
      break;
    case ElementType.NUMBER:
      for (let i = 1; i < 9; i++) {
        if (element.value == i) {
          imagePath = `/public/images/floor-${i}.png`;
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
    imagePath = "/public/images/default-floor.png";
  }

  if (element.is_flag && !element.is_revealed) {
    imagePath = "/public/images/flag.png";
  } else if (is_player) {
    imagePath = "/public/images/cart-default.gif";
    if (player_quantity_upgrades && player_quantity_upgrades > 0) {
      imagePath = "/public/images/cart-charged.gif";
    }
  }

  return (
    <td onClick={setElement} className="element" width="45" height="45">
      <img src={imagePath} alt="Icone do elemento no campo minado" />
    </td>
  );
});
