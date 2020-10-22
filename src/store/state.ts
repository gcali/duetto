import { FullWord } from '@/model/cards';
import { Player } from '@/model/player';

export type Suggestions = {
    remaining: number;
    player: {
      A: number;
      B: number;
    };

}

export const state = {
  words: null as (null | FullWord[]),
  player: "A" as Player,
  currentPlayer: "A" as Player,
  gameOver: false,
  suggestions: {
    remaining: 9,
    player: {
      A: 0,
      B: 0
    }
  } as Suggestions
}


export type State = typeof state;
