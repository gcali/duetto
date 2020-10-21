import { FullWord } from '@/model/cards';
import { Player } from '@/model/player';

export const state = {
  words: null as (null | FullWord[]),
  player: "A" as Player,
  currentPlayer: "A" as Player,
  gameOver: false
}

export type State = typeof state;
