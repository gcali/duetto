<template lang="pug">
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
import { Player } from '@/model/player';
import { defineComponent, PropType } from "vue";
import Word from "./Word.vue";

export default defineComponent({
  components: { Word },
  name: "GameGrid",
  props: {
    words: {
      type: Array as PropType<Array<FullWord>>,
      required: true
    },
    player: {
      type: String as PropType<Player>,
      required: true
    },
    forceReadOnly: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    currentPlayer(): string {
      return this.$store.state.currentPlayer || "None";
    }
  },
  methods: {
    clickWord(word: {word: string; type: string}) {
      this.$store.dispatch("playWord", word.word);
    },
    readOnly(word: FullWord): boolean {
      if (this.forceReadOnly) {
        return true;
      }
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
