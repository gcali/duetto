import { CardState, FullWord } from '@/model/cards'
import { ActionContext, CommitOptions, createStore, DispatchOptions, Store as VuexStore } from 'vuex'

const state = {
  words: null as (null | FullWord[]),
  player: "A" as "A" | "B",
  currentPlayer: null as "A" | "B" | null
}

type State = typeof state;

const mutations = {
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
  setPlayer(state: State, player: "A" | "B") {
    state.player = player;
  },
  setTurnPlayer(state: State, player: "A" | "B") {
    state.currentPlayer = player;
  },
  changeTurnPlayer(state: State) {
    if (!state.currentPlayer) {
      return;
    }
    state.currentPlayer = (state.currentPlayer === "A" ? "B" : "A");
  }
}

type Mutations = typeof mutations;

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>

const actions = {
  async playWord({commit, state}: AugmentedActionContext, payload: string): Promise<void> {
    if (!state.words || !state.currentPlayer) {
      return;
    }
    const [word] = state.words.filter(e => e.word === payload);
    if (!word) {
      return;
    }
    const type = word.type[state.currentPlayer === "A" ? "B" : "A"];
    const isMyTurn = state.currentPlayer === state.player;
    const selectedBy = isMyTurn ? "you" : "other";
    const stateToSet: CardState = type === "black" ? {type: "black"} : (type === "green" ? {type: "green", selectedBy} : {type: "brown", selectedBy});
    commit("setWordState", {word: payload, state: stateToSet});
    if (stateToSet.type !== "green") {
      commit("changeTurnPlayer",undefined);
    }
  }
}

type Actions = typeof actions;


export const store = createStore({
  state,
  mutations,
  actions,
});

export type Store = Omit<VuexStore<State>, 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
    dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};