export type CardType = "green" | "black" | "brown";

export type CardState = {
    type: "none" | "black";
} | {
    type: "brown";
    selectedBy: Direction | "both";
} | {
    type: "green";
    selectedBy: Direction;
};

export type FullWord = {
  word: string;
  type: {
    A: CardType;
    B: CardType;
  };
  state: CardState;
}

type Direction = "you" | "other";

export const mapDirections = (direction: Direction | "both"): string[] => {
  const up = "↑";
  const down = "↓";
  if (direction === "both") {
    return [up,down];
  } else if (direction === "you")  {
    return [down];
  } else {
    return [up];
  }
}