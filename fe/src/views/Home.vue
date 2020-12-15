<template lang="pug">
.home
  .logo(@dblclick="showCheat = !showCheat")
    | Duetto
  router-link(to="login") Login
  .game-choooser(v-if="hasToStartGame")
    GameChooser(@start="startGame")
  .main-content(v-else)
    .menu
      button(@click="resetGame") New game
      .note(v-if="player === currentPlayer && !hasToChooseFirstPlayer") It's your turn!
      .turn-section(v-if="!hasToChooseFirstPlayer")
        .player(:class="{current: currentPlayer === 'A'}") A 
        .turns
          .turn(v-for="i in turnPass.A") ✓
        .player(:class="{current: currentPlayer === 'B'}") B
        .turns
          .turn(v-for="i in turnPass.B") ✓
        .remaining-turns
          .turn(v-for="i in remainingSuggestions") 👤
      .cheat(v-if="showCheat")
        label
          input(type="checkbox", v-model="cheat")
          | Cheat
      button(v-if="!readOnly && !passDisabled",@click="pass") Pass
      .you(v-if="hasToChooseFirstPlayer") You are: {{player}}
      .choose-first-player(v-if="hasToChooseFirstPlayer")
        button(v-for="p in ['A','B']", @click="select(p)") {{p}}
      .game-status(v-if="gameOver") :(
      .game-status(v-if="gameWon") Yeeeeeee
    GameGrid(:words="words" :player="showForPlayer", :forceReadOnly="readOnly")
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
      cheat: false,
      showCheat: false,
      hasToChooseFirstPlayer: true
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
    },
    gameWon() {
      return this.$store.state.gameWon;
    },
    passDisabled() {
      return this.$store.state.disablePass;
    },
    readOnly(): boolean {
      return this.gameOver || this.hasToChooseFirstPlayer || this.gameWon;
    },
    turnPass() {
      const player = this.$store.state.suggestions.player;
      console.log(player);
      return player;
    },
    remainingSuggestions(): number {
      return this.$store.state.suggestions.remaining;
    }
  },
  methods: {
    startGame(arg: StartArgument) {
      this.$store.dispatch("init", {seed: arg.password, player: arg.player, suggestions: arg.suggestions, language: arg.language});
      this.hasToStartGame = false;
      this.hasToChooseFirstPlayer = true;
    },
    resetGame() {
      this.hasToStartGame = true;
    },
    pass() {
      this.$store.dispatch("pass", undefined);
    },
    select(player: Player) {
      this.$store.commit("setTurnPlayer", player);
      this.hasToChooseFirstPlayer = false;
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
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .main-content {
    max-width: 100%;
    .game-status {
      font-weight: bold;
    }
    .menu {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .note {
      font-weight: bold;
      display: inline-block;
    }
    .turn-section {
      margin: 0.2em 0;
      .player {
        position: relative;
        padding: 0.1em 0.2em;
        &.current {
          border: 1px solid black;
          &:before {
            position: absolute;
            left: -1em;
            top: -0.1em;
            content: '→'
          }
        }
      }
      display: grid;
      grid-template-columns: 0fr 1fr;
      gap: 0.1em;
      .turn {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background-color: green;
        color: white;
        padding: 0.1em 0.2em;
        &:not(:last-child) {
          margin-right: 0.2em;
        }
      }
      .remaining-turns {
        grid-column: span 2;
        .turn {
          background-color: burlywood;
          padding: 0.2em 0.2em;
        }
      }
    } 
  }
}
</style>
