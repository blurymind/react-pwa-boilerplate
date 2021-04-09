import { FC, useCallback } from "react";
import { Card } from "./Card";
import update from "immutability-helper";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { CardType } from "./types";

const defaultStyle = {
  display: "flex",
  flex: 1,
  width: "100%",
  height: "100%",
};

export interface Props {
  isHorizontal?: boolean;
  cards?: Array<CardType>;
  setCards: (p: any) => void;
  style?: any;
}

export const Container: FC<Props> = ({
  cards = [],
  setCards,
  style = defaultStyle,
  isHorizontal,
}: Props) => {
  {
    const moveCard = useCallback(
      (dragIndex: number, hoverIndex: number) => {
        const dragCard = cards[dragIndex];
        setCards(
          update(cards, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragCard],
            ],
          })
        );
      },
      [cards]
    );

    const renderCard = (card: CardType, index: number) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          tooltip={card.tooltip}
          moveCard={moveCard}
          style={card.style}
        >
          {card.children}
        </Card>
      );
    };

    return (
      <>
        <div
          style={{ ...style, flexDirection: isHorizontal ? "row" : "column" }}
        >
          {cards.map((card, i) => renderCard(card, i))}
        </div>
      </>
    );
  }
};

export const DndArea = ({
  cards = [],
  setCards,
  style,
  isHorizontal,
}: Props) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Container
        cards={cards}
        setCards={setCards}
        style={style}
        isHorizontal={isHorizontal}
      />
    </DndProvider>
  );
};
export default DndArea;
