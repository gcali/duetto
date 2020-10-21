<template lang="pug">
input(v-model="generator")
button(@click="generate") Generate
label
  input(type="radio" value="A" v-model="player")
  | A
label
  input(type="radio" value="B" v-model="player")
  | B
.turn Turn: {{currentPlayer}}
.main(v-if="words")
  Word(
    :word="fullWord.word"
    :cardType="fullWord.type[player]"
    :readOnly="readOnly(fullWord)"
    :state="fullWord.state"
    v-for="fullWord in words"
    class="word"
    @selected="() => clickWord(fullWord)"
  )
</template>

<script lang="ts">
import { FullWord } from '@/model/cards';
import { defineComponent } from "vue";
import Word from "./Word.vue";
import {generateWords} from "@/services/word-generator";

export default defineComponent({
  components: { Word },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      generator: "apple"
    };
  },
  computed: {
    words(): FullWord[] {
      return this.$store.state.words || [];
    },
    player: {
      get(): "A" | "B" {
        return this.$store.state.player;
      },
      set(value: "A" | "B"): void {
        this.$store.commit("setPlayer", value);
      }
    },
    currentPlayer(): string {
      return this.$store.state.currentPlayer || "None";
    }
  },
  methods: {
    clickWord(word: {word: string; type: string}) {
      this.$store.dispatch("playWord", word.word);
    },
    generate() {
      const words = generateWords(this.generator);
      this.$store.commit("setAllWords", words);
      this.$store.commit("setTurnPlayer", this.player);
    },
    readOnly(word: FullWord): boolean {
      if (word.state.type === "green" || word.state.type === "black") {
        return true;
      }
      if (word.state.type !== "brown") {
        return false;
      }
      const isMyTurn = this.$store.state.currentPlayer === this.$store.state.player;
      if (isMyTurn && word.state.selectedBy !== "other") {
        return true;
      } else if (!isMyTurn && word.state.selectedBy != "you") {
        return true;
      }
      return false;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: repeat(auto-fit,10em);
  gap: 1em;
  padding: 1em;
  max-width: 58em;
  background-color: grey;
  justify-content: center;
}
</style>
