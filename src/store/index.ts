import { CardState, FullWord } from '@/model/cards'
import { CommitOptions, createStore, Store as VuexStore } from 'vuex'

const state = {
  words: null as (null | FullWord[])
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
      word.state = payload.state;
    }
  }
}

type Mutations = typeof mutations;

export const store = createStore({
  state,
  mutations,
  actions: { },
  modules: { }
});

export type Store = Omit<VuexStore<State>, 'commit'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
};