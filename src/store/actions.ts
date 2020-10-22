import { Player } from '@/model/player';
import { Gameplay } from '@/services/gameplay';
import { generateWords } from '@/services/word-generator';
import { ActionContext } from 'vuex';
import { Mutations } from "./mutations";
import { State } from './state';

const gameplay = new Gameplay();

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>

export const actions = {
  async init({commit}: AugmentedActionContext, payload: { seed: string; player: Player; suggestions: number}) {
      const words = generateWords(payload.seed);
      commit("setGameOver", false);
      commit("setGameWon", false);
      commit("setAllWords", words);
      commit("setPlayer", payload.player);
      commit("setTurnPlayer", "A");
      commit("setSuggestions", {remaining: payload.suggestions, player: {A: 0, B: 0}})
      commit("setDisablePass", false);
  },
  pass({commit,state}: AugmentedActionContext) {
    if (state.suggestions.remaining) {
      commit("increasePlayerSuggestions", state.currentPlayer);
      commit("decreaseRemainingsuggestions", undefined);
    }
    commit("changeTurnPlayer", undefined);
  },
  async playWord({commit, state}: AugmentedActionContext, payload: string): Promise<void> {
    if (!state.words || !state.currentPlayer) {
      return;
    }
    const [word] = state.words.filter(e => e.word === payload);
    if (!word) {
      return;
    }

    const playResult = gameplay.playWord(
      word, 
      {player: state.player, currentPlayer: state.currentPlayer},
      {words: state.words, remainingSuggestions: state.suggestions.remaining}
    );
    commit("setWordState", {word: payload, state: playResult.state});
    if (playResult.isGameWon) {
      commit("setGameWon", true);
    } else if (playResult.nextPlayer === null) {
        commit("setGameOver", true);
    } else {
        if (playResult.disablePass) {
          commit("setDisablePass", true);
        }
        commit("setTurnPlayer", playResult.nextPlayer);
        if (playResult.loseSuggestion) {
          commit("decreaseRemainingsuggestions", undefined);
        }
    }
  }
}

export type Actions = typeof actions;