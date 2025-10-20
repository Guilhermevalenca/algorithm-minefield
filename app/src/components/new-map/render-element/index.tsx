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

export function RenderElement({
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

  const Element = ({ children }: { children: React.ReactNode }) => (
    <td onClick={setElement} className="element" width="45" height="45">
      {children}
    </td>
  );

  if (element.is_flag && !element.is_revealed) {
    return <Element>🚩</Element>;
  } else if (is_player) {
    let message = "👤";
    if (player_quantity_upgrades && player_quantity_upgrades > 0) {
      message = "👤!";
    }
    return <Element>{message}</Element>;
  }

  return (
    <Element>
      <img src={imagePath} alt="Icone do elemento no campo minado" />
    </Element>
  );
}
