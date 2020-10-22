import { CardState, FullWord } from '@/model/cards';
import { Player } from '@/model/player';
import { State, Suggestions } from "./state";

export const mutations = {
  setAllWords(state: State, words: FullWord[] | null) {
    state.words = words;
  },
  setWordState(state: State, payload: {word: string; state: CardState}) {
    if (state.words === null) {
      return;
    }
    const [word] = state.words.filter(e => e.word === payload.word);
    if (word) {
      const stateToSet = {...payload.state};
      if (word.state.type === "brown" && stateToSet.type === "brown" && word.state.selectedBy !== stateToSet.selectedBy) {
        stateToSet.selectedBy = "both";
      }
      word.state = stateToSet;
    }
  },
  setGameOver(state: State, value: boolean) {
    state.gameOver = value;
  },
  setPlayer(state: State, player: Player) {
    state.player = player;
  },
  setTurnPlayer(state: State, player: Player) {
    state.currentPlayer = player;
  },
  changeTurnPlayer(state: State) {
    if (!state.currentPlayer) {
      return;
    }
    state.currentPlayer = (state.currentPlayer === "A" ? "B" : "A");
  },
  setSuggestions(state: State, suggestions: Suggestions) {
    state.suggestions = {...suggestions, player: {...suggestions.player}};
  },
  increasePlayerSuggestions(state: State, player: Player) {
    state.suggestions.player[player]++;
  },
  decreaseRemainingsuggestions(state: State) {
    state.suggestions.remaining--;
  }
}

export type Mutations = typeof mutations;
