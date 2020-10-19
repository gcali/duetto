<template lang="pug">
.main
  Word(:word="fullWord.word", :cardType="fullWord.type" v-for="fullWord in fullWords", class="word")
</template>

<script lang="ts">
import { CardType } from '@/model/cards';
import { defineComponent } from "vue";
import Word from "./Word.vue";

function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export default defineComponent({
  components: { Word },
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      words: [
        "dog", "cat", "llama", "eagle", "tiger"
        ],
    };
  },
  computed: {
    fullWords() {
      const words = this.words;
      const needed = 25;
      const result: {word: string; type: CardType}[] = [];
      for (let i = 0; i < needed; i++) {
        const w = words[randomIntFromInterval(0, words.length-1)];
        result.push({
          word: w,
          type: i < 3 ? "black" : (i < 12 ? "green" : "brown")
        });
      }
      result.sort((a, b) => Math.random() - 0.5);
      return result;
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
