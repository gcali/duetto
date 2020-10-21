<template lang="pug">
.home
  .logo
    | Placeholder
  .game-choooser(v-if="hasToStartGame")
    GameChooser(@start="startGame")
  .main-content(v-else)
    button(@click="resetGame") New game
    .current Current player: {{currentPlayer}}
    .you You are: {{player}}
    .cheat
      label
        input(type="checkbox", v-model="cheat")
        | Cheat
    .game-over(v-if="gameOver") :(
    GameGrid(:words="words" :player="showForPlayer")
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameGrid from '@/components/GameGrid.vue'; // @ is an alias to /src
import GameChooser, { StartArgument } from '@/components/GameChooser.vue';
import { Gameplay } from '@/services/gameplay';
import { Player } from '@/model/player';

export default defineComponent({
  name: 'Home',
  components: {
    GameGrid,
    GameChooser
  },
  data() {
    return {
      hasToStartGame: true,
      cheat: false
    }
  },
  computed: {
    words() {
      return this.$store.state.words;
    },
    currentPlayer() {
      return this.$store.state.currentPlayer;
    },
    player() {
      return this.$store.state.player;
    },
    showForPlayer(): Player {
      return this.cheat ? new Gameplay().otherPlayer(this.player) : this.player;
    },
    gameOver() {
      return this.$store.state.gameOver;
    }
  },
  methods: {
    startGame(arg: StartArgument) {
      this.$store.dispatch("init", {seed: arg.password, player: arg.player});
      this.hasToStartGame = false;
    },
    resetGame() {
      this.hasToStartGame = true;
    }
  }
});
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 20em;
    height: 5em;
    background-color: pink;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .main-content {
    max-width: 100%;
  }
}
</style>
