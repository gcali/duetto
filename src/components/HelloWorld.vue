<template lang="pug">
input(v-model="readOnly", type="checkbox")
input(v-model="generator")
button(@click="generate") Generate
.main(v-if="words")
  Word(
    :word="fullWord.word"
    :cardType="fullWord.type"
    :readOnly="readOnly"
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
      readOnly: false,
      generator: "apple"
    };
  },
  computed: {
    words(): FullWord[] {
      return this.$store.state.words || [];
    }
  },
  methods: {
    clickWord(word: {word: string; type: string}) {
      console.log(word);
    },
    generate() {
      const words = generateWords(this.generator);
      this.$store.commit("setAllWords", words)
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
