export type CardType = "green" | "black" | "brown";

export type CardState = {
    type: "none" | "green" | "black"
} | {
    type: "brown",
    selectedBy: "you" | "other"
} ;