export type CardType = "green" | "black" | "brown";

export type CardState = {
    type: "none" | "green" | "black";
} | {
    type: "brown";
    selectedBy: "you" | "other" | "both";
} ;

export type FullWord = {
  word: string;
  type: CardType;
  state: CardState;
}
